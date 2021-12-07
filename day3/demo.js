const fs = require('fs');

const bits = fs.readFileSync('input.txt', 'utf-8').split('\n');

function computeGamma() {
    const gamma = [];
    const bitlength = bits[0].length;
    for(let i = 0; i < bitlength; i++) {
        let countOne = 0;
        for(let j = 0; j < bits.length; j++) {
            if(parseInt(bits[j][i],10)) countOne ++;
        }
        if(countOne >= bits.length / 2) gamma.push(1)
        else gamma.push(0);
    }
    const epsilon = gamma.map((b) => b ? 0 : 1);
    console.log(`Gamma ${gamma.join('')}, Epsilon ${epsilon.join('')}: Solution: ${parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2)}}`);
}

function computeOxygen(co2 = false) {
    let foundSequence = false;
    let bitPosition = 0;
    let validSequence = [...bits];
    while(!foundSequence && bitPosition < 12) {
        let bit = getMostUsedBits(bitPosition, validSequence, co2);
        validSequence = validSequence.filter((vs) => co2 ? vs[bitPosition] != bit :  parseInt(vs[bitPosition], 2) === bit);
        bitPosition ++;
        if(validSequence.length === 1) foundSequence = true;
    }
    return validSequence
}

function getMostUsedBits(position, sequences, co2) {
    let countOne = 0;
    for(let i = 0; i < sequences.length; i++) {
        if(parseInt(sequences[i][position],10)) countOne ++;
    }
    return countOne >= sequences.length / 2 ? 1 : 0;
}

function computeLifeSupport() {
    const oxygen = computeOxygen(false).join('');
    const co2 = computeOxygen(true).join('');
    console.log(`Oxygen: ${parseInt(oxygen, 2)} Co2: ${parseInt(co2, 2)} Solution: ${parseInt(oxygen, 2) * parseInt(co2 ,2)}`);
}

// Part 1
// computeGamma();

// Part 2
computeLifeSupport();