let parser = require("./grammar");

let input = "";

process.stdin.setEncoding("utf8");
process.stdin.on("readable", () => {
    let chunk = process.stdin.read();
    if (chunk !== null) {
        input += chunk;
    }
});
process.stdin.on("end", () => {
    let output = parser.parse(input);
    console.log(output);
});
