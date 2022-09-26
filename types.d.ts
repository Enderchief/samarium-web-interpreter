import { PyProxy, PyProxyDict } from "./pyodide/pyodide.d.ts";

declare type Registry<Vars> = {
  output: string;
  vars: Vars;
};

declare interface Samarium extends PyProxy {
  run: (code: string, debug?: boolean) => Registry<PyProxyDict>;
  Registry: (vars: PyProxyDict) => Registry<typeof vars>;
  __version__: string;
}
