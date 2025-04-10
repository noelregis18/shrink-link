
import { SocialLinks } from "./SocialLinks";
import { DateTime } from "./DateTime";

export const Footer = () => {
  return (
    <footer className="w-full py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col gap-6">
          <DateTime />
          
          <div className="py-4">
            <SocialLinks />
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ShrinkLink. All rights reserved.
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            Designed and developed by Noel Regis
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
