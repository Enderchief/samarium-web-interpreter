import { getTheme, loadTheme } from "./highlight.js";
import { CodeJar } from "https://medv.io/codejar/codejar.js";

const output = document.querySelector("#output");
const codeBlock = document.querySelector(".editor");
const themeSelect = document.querySelector("select#theme");

let theme = "github-dark";

await Promise.all(shiki.BUNDLED_THEMES.map((t) => loadTheme(t)));

themeSelect.addEventListener("change", () => {
  theme = themeSelect.options[themeSelect.selectedIndex].value;
  jar.updateCode(jar.toString());
});

const worker = new Worker("./worker.js");
const ansi = new AnsiUp();

let ready = false;

worker.addEventListener("message", ({ data }) => {
  switch (data.type) {
    case "READY":
      ready = true;
      output.innerText = "";
      break;
    case "STDOUT":
    case "STDERR":
      output.innerHTML += `\n${ansi.ansi_to_html(data.value)}`;
      break;
    default:
      break;
  }
});

worker.postMessage({ type: "HANDSHAKE" });

const jar = CodeJar(codeBlock, (c) => {
  c.innerHTML = getTheme(theme).codeToHtml(c.textContent || " ", {
    lang: "samarium",
  });
});

document.querySelector(".run").addEventListener("click", () => {
  if (!ready) {
    output.innerHTML =
      "<span class='error'>[WebError] Samarium is not ready yet. Please Wait.</span>";
    return;
  }
  output.innerText = "";
  worker.postMessage({ type: "EXECUTE", value: jar.toString() });
});
