importScripts("https://cdn.jsdelivr.net/pyodide/v0.21.3/full/pyodide.js");

/** @type {import("./pyodide/pyodide.d.ts").PyodideInterface} */
let pyodide;

/** @type {import("./types.d.ts").Samarium} */
let samarium;
/** @type {import("./types.d.ts").Samarium["Registry"]} */
let reg;

async function initPyodide() {
  pyodide = await loadPyodide({
    stdout: (msg) => {
      postMessage({ type: "STDOUT", value: msg });
    },
    stderr: (msg) => {
      postMessage({ type: "STDERR", value: msg });
    },
    indexURL: location.origin + "/pyodide",
  });

  postMessage(pyodide.version);

  await pyodide.loadPackage("micropip");

  await pyodide.runPythonAsync(`
    import micropip
    await micropip.install('samarium')`);

  await pyodide.runPythonAsync(
    "import sys\nsys.exit = lambda *a, **b: None\n__name__='samarium'"
  );
  samarium = pyodide.pyimport("samarium");
  reg = samarium.Registry(pyodide.globals);

  return samarium, reg;
}

/** @param code {string} */
function run(code) {
  try {
    samarium.run(code, reg);
  } catch (err) {
    console.error(err);
    postMessage({ type: "STDERR", value: err });
  }
}

onmessage = async ({ data }) => {
  console.log(data, { samarium, reg });
  switch (data.type) {
    case "HANDSHAKE":
      await initPyodide();
      return postMessage({ type: "READY", value: "Set Pyodide" });
    case "EXECUTE":
      if (samarium && reg) {
        run(data.value);
      } else {
        initPyodide().then(() => {
          run(data.value);
        });
      }
      break;
    default:
      break;
  }
};
