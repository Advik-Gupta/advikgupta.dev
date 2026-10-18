import Link from "next/link";
import "./ComingSoon.css";

type Props = {
  title: string;
  line: string;
};

export default function ComingSoon({ title, line }: Props) {
  return (
    <main id="main" className="soon">
      <Link href="/" className="soon__back link-line" data-cursor="grow">
        ← Back home
      </Link>
      <div className="soon__body">
        <span className="soon__badge">Under construction</span>
        <h1 className="soon__title display">{title}</h1>
        <p className="soon__line">{line}</p>
        <div className="soon__actions">
          <Link href="/projects" className="soon__cta" data-cursor="grow">
            See my projects
          </Link>
          <Link href="/" className="soon__ghost link-line" data-cursor="grow">
            Back to the main site
          </Link>
        </div>
      </div>
      <div className="soon__tape" aria-hidden="true">
        <span>
          {Array.from({ length: 8 }, () => "Coming soon  ✦  ").join("")}
        </span>
      </div>
    </main>
  );
}
