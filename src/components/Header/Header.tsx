import Logo from "./Logo";
import GitHub from "./GitHub";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-3 mb-8">
      <Logo />
      <GitHub />
    </header>
  );
}
