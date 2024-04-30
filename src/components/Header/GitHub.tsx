import github from "../../assets/github.svg";
import { REPO_LINK } from "../../conf";

export default function GitHub() {
  return (
    <a href={REPO_LINK}>
      <img className="w-10 h-auto invert" src={github} alt="Github repo link" />
    </a>
  );
}
