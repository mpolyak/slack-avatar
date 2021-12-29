import {weightedRandom} from "./random.mjs";

const states = {
        up:         0,
        down:       1,
        sweet:      2,
        playful:    3,
        sad:        4,
        worried:    5,
        surprised:  6,
        angry:      7,
};

const probabilities = [
//   up    down  sweet  playful  sad   worried  surprised  angry
    [0.25, 0.35, 0.10,  0.10,    0.05, 0.05,    0.05,      0.05], // up
    [0.35, 0.25, 0.10,  0.10,    0.05, 0.05,    0.05,      0.05], // down
    [0.15, 0.15, 0.25,  0.10,    0.15, 0.10,    0.05,      0.05], // sweet
    [0.10, 0.10, 0.15,  0.20,    0.15, 0.10,    0.10,      0.10], // playful
    [0.10, 0.10, 0.10,  0.05,    0.25, 0.15,    0.15,      0.10], // sad
    [0.05, 0.05, 0.15,  0.10,    0.15, 0.25,    0.15,      0.10], // worried
    [0.10, 0.10, 0.15,  0.10,    0.10, 0.10,    0.25,      0.10], // surprised
    [0.05, 0.05, 0.05,  0.15,    0.20, 0.15,    0.15,      0.20], // angry
];

const {
    names,
    images,
} = Object.entries(states).reduce((obj, [state, id]) => ({
    names: {
        ...obj.names,
        [id]: state,
    },
    images: {
        ...obj.images,
        [id]: `images/${state}.png`,
    },
}), {names: {}, images: {}});

export class State {
    constructor(fs, file) {
        this.fs = fs;
        this.file = file;

        if (file ?? fs?.existsSync(file)) {
            console.log("Loading state from:", file);

            this.state = parseInt(fs?.readFileSync(file));

            if (isNaN(this.state)) {
                console.error("Bad loaded state:", this.state);

                this.state = 0;
            }
        } else {
            this.state = 0;
        }

        console.log("Starting state:", this.state);
    }

    next() {
        this.state = weightedRandom(probabilities[this.state]);

        console.log("Next state:", this.state);

        if (this.file) {
            this.fs?.writeFileSync(this.file, this.state.toString());
        }
    }

    getName() {
        return names[this.state];
    }

    getImage() {
        return images[this.state];
    }
}
