
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full py-4">
      <div className="container mx-auto max-w-6xl px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold gradient-text">ShrinkLink</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
