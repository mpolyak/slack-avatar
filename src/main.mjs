import * as fs from "fs";
import * as https from "https";
import process from "process";

import {envOrExit} from "./env.mjs";
import {State} from "./model.mjs";
import {FormData} from "./multipart.mjs";

function main() {
    const slackToken = envOrExit("SLACK_TOKEN");
    const stateFile = envOrExit("STATE_FILE")

    const state = new State(fs, stateFile);

    state.next();

    const formData = new FormData()
        .addString("token", slackToken)
        .addFile("image", state.getName(), fs.readFileSync(state.getImage()));

    const options = {
        host: "slack.com",
        port: 443,
        path: "/api/users.setPhoto",
        method: "POST",
        headers: {
            ...formData.getHeaders(),
        }
    };

    const req = https.request(options, res => {
        res.setEncoding("utf8");

        let data = "";

        res.on("data", chunk => {
            data += chunk;
        });

        res.on("end", () => {
            if (res.statusCode == 200) {
                console.log("200:", data);

                try {
                    const result = JSON.parse(data);

                    if (!result.ok) {
                        process.exitCode = 1;
                    }
                } catch (error) {
                    console.error(error);

                    process.exitCode = 1;
                }
            } else {
                console.error(`${res.statusCode}:`, data);

                process.exitCode = 1;
            }
        });
    });

    req.on("error", error => {
        console.error(error);

        process.exitCode = 1;
    });

    req.write(formData.getData());

    req.end();
}

main();
