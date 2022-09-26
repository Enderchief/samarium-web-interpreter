importScripts("https://cdn.jsdelivr.net/pyodide/v0.21.3/full/pyodide.js");

/** @type {import("./pyodide/pyodide.d.ts").PyodideInterface} */
let pyodide;

/** @type {import("./types.d.ts").Samarium} */
let samarium;

async function initPyodide() {
  pyodide = await loadPyodide({
    stdout: (msg) => {
      postMessage({ type: "STDOUT", value: msg });
    },
    stderr: (msg) => {
      postMessage({ type: "STDERR", value: msg });
    },
    indexURL: "./pyodide",
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
  return samarium;
}

/** @param code {string} */
function run(code) {
  console.log("RUNNING", code);
  try {
    samarium.run(code, samarium.Registry(pyodide.globals.copy()));
  } catch (err) {
    console.error(err);
    postMessage({ type: "STDERR", value: err });
  }
}

onmessage = async ({ data }) => {
  console.log(data, { samarium });
  switch (data.type) {
    case "HANDSHAKE":
      await initPyodide();
      return postMessage({ type: "READY", value: "Set Pyodide" });
    case "EXECUTE":
      postMessage({ type: "RESET" });
      if (samarium) {
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
