export const sm = await fetch(
  "https://raw.githubusercontent.com/samarium-lang/vscode-samarium/master/syntaxes/samarium.tmLanguage.json"
)
  .then((data) => data.json())
  .then((grammar) => ({
    id: "samarium",
    scopeName: "source.samarium",
    grammar,
  }));

const cache = {};

export function getTheme(theme) {
  return cache[theme];
}
export async function loadTheme(theme) {
  cache[theme] = await shiki.getHighlighter({ theme, langs: [sm] });
}
