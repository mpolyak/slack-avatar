export function weightedRandom(weights) {
    const total = weights.reduce((total, weight) => total + weight, 0);

    if (total === 0) {
        throw new Error("Zero weights");
    }
    
    let target = Math.random() * total;

    for (let i = 0, sum = 0; i < weights.length; i ++) {
        sum += weights[i];

        if (sum > target) {
            return i;
        }
    }

    throw new Error("Unreachable");
}
