import assert from "assert";

import {weightedRandom} from "../src/random.mjs";
import {test} from "../src/test.mjs";

function compute(weights, iters = 100000) {
    let total = 0;

    const probabilities = weights.map((w) => {
        total += w;

        return 0;
    });

    for (let i = 0; i < iters; i ++) {
        probabilities[weightedRandom(weights)] ++;
    }

    return probabilities.map((p) => total * p / iters);
}

test("weightedRandom should produce expected probabilities", () => {
    const weights = [0.5, 0, 0.2, 0, 0.3];

    const probabilities = compute(weights);

    for (let i = 0; i < weights.length; i ++) {
        assert.ok(Math.abs(probabilities[i] - weights[i]) < 0.01, `${probabilities[i]} not close to ${weights[i]}`);
    }
});

test("weightedRandom should handle unnormalized weights", () => {
    const weights = [5, 0, 2, 0, 3];

    const probabilities = compute(weights);

    for (let i = 0; i < weights.length; i ++) {
        assert.ok(Math.abs(probabilities[i] - weights[i]) < 0.1, `${probabilities[i]} not close to ${weights[i]}`);
    }
});

test("weightedRandom should throw for all zero weights", () => {
    assert.throws(() => weightedRandom([0, 0, 0]), {message: "Zero weights"});  
});

test("weightedRandom should throw for no weights", () => {
    assert.throws(() => weightedRandom([]), {message: "Zero weights"});  
});
