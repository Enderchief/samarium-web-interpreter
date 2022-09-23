import { loadPyodide } from "./pyodide/pyodide.mjs";
import { h } from "./highlight.js";
import { CodeJar } from "https://medv.io/codejar/codejar.js";

const output = document.querySelector("#output");
const codeBlock = document.querySelector(".editor");

const jar = CodeJar(codeBlock, (c) => {
  c.innerHTML = h.codeToHtml(c.textContent || " ", { lang: "samarium" });
});

/** @type {import("./pyodide/pyodide.d.ts").PyodideInterface} */
const pyodide = await loadPyodide({
  stdout: (msg) => {
    output.innerText += `\n${msg}`;
  },
  stderr: (msg) => {
    msg = msg.replaceAll(/\[[0-9;]*m/g, "");
    output.innerHTML += `\n<span class="error">${msg}</span>`;
  },
});
window.pyodide = pyodide;

await pyodide.loadPackage("micropip");

await pyodide.runPythonAsync(`
import micropip
await micropip.install('./termcolor-1.1.0-py3-none-any.whl')
await micropip.install('samarium')`);

await pyodide.runPythonAsync(
  "import sys\nsys.exit = lambda *a, **b: None\n__name__='samarium'"
);

export const samarium = pyodide.pyimport("samarium");
export const ch = samarium.Registry(pyodide.globals);

document.querySelector(".run").addEventListener("click", () => {
  output.innerText = "";
  samarium.run(jar.toString(), ch);
});
