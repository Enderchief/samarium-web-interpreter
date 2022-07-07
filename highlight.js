
export const h = await fetch(
    "https://raw.githubusercontent.com/samarium-lang/vscode-samarium/master/syntaxes/samarium.tmLanguage.json"
)
    .then((data) => data.json())
    .then((grammar) => ({
        id: "samarium",
        scopeName: "source.samarium",
        grammar,
    }))
    .then((sm) => shiki.getHighlighter({ theme: "github-dark", langs: [sm] }));
