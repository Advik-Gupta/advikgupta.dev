const TOKEN =
  /("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(import|export|default|from|function|return|const|let|if|else|type|async|await|new|for|of|true|false|null|as|use client)\b|(<\/?[A-Za-z][\w.-]*)|(\b\d+(?:\.\d+)?(?:rem|em|px|vw|vh|s|%)?\b)/g;

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function line(src: string) {
  let out = "";
  let last = 0;
  for (const m of src.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    out += escape(src.slice(last, i));
    const cls = m[1] ? "s" : m[2] ? "k" : m[3] ? "t" : "n";
    out += `<span class="xr-${cls}">${escape(m[0])}</span>`;
    last = i + m[0].length;
  }
  return out + escape(src.slice(last));
}

export function highlight(code: string) {
  return code
    .replace(/\s+$/, "")
    .split("\n")
    .map((l, i) => `<span class="xr-ln">${i + 1}</span>${line(l)}`)
    .join("\n");
}

export function countLines(code: string) {
  return code.replace(/\s+$/, "").split("\n").length;
}
