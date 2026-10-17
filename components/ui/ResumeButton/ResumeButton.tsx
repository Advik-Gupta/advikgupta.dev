import { RESUME_URL } from "@/lib/site";
import ArrowIcon from "@/components/ui/ArrowIcon";
import "./ResumeButton.css";

type Props = {
  label?: string;
  tone?: "light" | "dark";
  className?: string;
};

export default function ResumeButton({
  label = "See resume",
  tone = "light",
  className = "",
}: Props) {
  if (!RESUME_URL) return null;

  return (
    <a
      href={RESUME_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`resume-btn ${tone === "dark" ? "resume-btn--dark" : ""} ${className}`}
      data-cursor="grow"
    >
      <span>{label}</span>
      <span className="resume-btn__icon">
        <ArrowIcon />
      </span>
    </a>
  );
}
