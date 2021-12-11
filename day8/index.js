

let one2 = 0;
let four4 = 0;
let seven3 = 0;
let eight7 = 0;

for (x in lines) {
  let OPvalues = lines[x].split("|")[1];
  let Nos = OPvalues.split(" ");
  Nos.shift();
    for (x in Nos) {
        // console.log(Nos[x].length);
        let len = Nos[x].length
        if (len === 2) one2++;
        if (len === 4) four4++;
        if (len === 3) seven3++;
        if (len === 7) eight7++;
 
    }
}

console.log(`Total len : ${one2+four4+seven3+eight7}`)
