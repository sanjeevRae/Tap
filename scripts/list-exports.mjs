import * as m from "@mdxeditor/editor";
const ks = Object.keys(m).sort();
console.log(ks.filter(k => /undo|bold/i.test(k)).join("\n"));
process.exit(0);
