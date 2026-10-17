"use client";

import { ReactNode, useState } from "react";
import "./Showcase.css";

export type ShowcaseFile = {
  name: string;
  code: string;
  html: string;
};

type Props = {
  index: number;
  slug: string;
  name: string;
  blurb: string;
  deps: string[];
  credit?: string;
  files: ShowcaseFile[];
  children: ReactNode;
};

function readme(name: string, deps: string[], files: ShowcaseFile[]) {
  const install = deps.length
    ? `npm i ${deps.join(" ")}`
    : "No extra packages needed.";
  return [
    `# ${name}`,
    "",
    "From advikgupta.dev/freebies. Free to use in your own projects.",
    "",
    "## Install",
    "",
    "```bash",
    install,
    "```",
    "",
    "## Files",
    "",
    ...files.map((f) => `- ${f.name}`),
    "",
    "Drop the folder into your components directory and see Example.tsx for usage.",
    "",
  ].join("\n");
}

export default function Showcase({
  index,
  slug,
  name,
  blurb,
  deps,
  credit,
  files,
  children,
}: Props) {
  const [tab, setTab] = useState(0);
  const [view, setView] = useState<"preview" | "code">("preview");
  const [replay, setReplay] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const install = deps.length ? `npm i ${deps.join(" ")}` : null;
  const folder = name.replace(/\s+/g, "");

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {}
  };

  const download = async () => {
    const { zipSync, strToU8 } = await import("fflate");
    const entries: Record<string, Uint8Array> = {
      [`${folder}/README.md`]: strToU8(readme(name, deps, files)),
    };
    files.forEach((f) => {
      entries[`${folder}/${f.name}`] = strToU8(f.code);
    });
    const zipped = zipSync(entries);
    const url = URL.createObjectURL(
      new Blob([zipped.buffer as ArrayBuffer], { type: "application/zip" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}.zip`;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const file = files[tab];

  return (
    <article className="show" id={slug}>
      <header className="show__head">
        <span className="show__index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="show__intro">
          <h2 className="show__name display">{name}</h2>
          <p className="show__blurb">{blurb}</p>
          {credit && <p className="show__credit">{credit}</p>}
        </div>
        <div className="show__actions">
          {install ? (
            <button
              type="button"
              className="show__install"
              onClick={() => copy(install, "install")}
              data-cursor="grow"
            >
              <span className="show__dollar">$</span>
              {install}
              <span className="show__copy-hint">
                {copied === "install" ? "Copied" : "Copy"}
              </span>
            </button>
          ) : (
            <span className="show__nodeps">Zero dependencies</span>
          )}
          <button
            type="button"
            className="show__download"
            onClick={download}
            data-cursor="grow"
          >
            Download .zip
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4v12M6 11l6 6 6-6M5 20h14" />
            </svg>
          </button>
        </div>
      </header>

      <div className="show__switch" role="tablist">
        {(["preview", "code"] as const).map((v) => (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={view === v}
            className={view === v ? "is-active" : ""}
            onClick={() => setView(v)}
          >
            {v}
          </button>
        ))}
      </div>

      <div className={`show__body show__body--${view}`}>
        <div className="show__window">
          <div className="show__chrome">
            <span className="show__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="show__url">{folder}.tsx</span>
            <button
              type="button"
              className="show__replay"
              onClick={() => setReplay((r) => r + 1)}
              data-cursor="grow"
            >
              ↻ Replay
            </button>
          </div>
          <div className="show__stage" key={replay}>
            {children}
          </div>
        </div>

        <div className="show__code">
          <div className="show__tabs" data-lenis-prevent>
            {files.map((f, i) => (
              <button
                key={f.name}
                type="button"
                className={i === tab ? "is-active" : ""}
                onClick={() => setTab(i)}
              >
                {f.name}
              </button>
            ))}
          </div>
          <div className="show__pre-wrap">
            <button
              type="button"
              className="show__copy"
              onClick={() => copy(file.code, file.name)}
              data-cursor="grow"
            >
              {copied === file.name ? "Copied ✓" : "Copy"}
            </button>
            <pre
              className="show__pre"
              data-lenis-prevent
              dangerouslySetInnerHTML={{ __html: file.html }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
