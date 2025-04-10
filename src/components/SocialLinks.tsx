
import { Linkedin, Github, Twitter, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
}

const SocialLink = ({ href, icon, label, className }: SocialLinkProps) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className={cn(
      "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 link-gradient",
      className
    )}
    aria-label={label}
  >
    {icon}
    <span>{label}</span>
  </a>
);

export const SocialLinks = () => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
      <SocialLink 
        href="https://www.linkedin.com/in/noel-regis-aa07081b1/" 
        icon={<Linkedin size={18} />} 
        label="LinkedIn" 
      />
      <SocialLink 
        href="https://github.com/noelregis18" 
        icon={<Github size={18} />} 
        label="GitHub" 
      />
      <SocialLink 
        href="https://x.com/NoelRegis8" 
        icon={<Twitter size={18} />} 
        label="Twitter" 
      />
      <SocialLink 
        href="mailto:noel.regis04@gmail.com" 
        icon={<Mail size={18} />} 
        label="Email" 
      />
      <SocialLink 
        href="tel:+917319546900" 
        icon={<Phone size={18} />} 
        label="Phone" 
      />
      <SocialLink 
        href="http://topmate.io/noel_regis" 
        icon={<ExternalLink size={18} />} 
        label="Topmate" 
      />
      <SocialLink 
        href="https://www.google.com/maps/place/Asansol,+West+Bengal,+India" 
        icon={<MapPin size={18} />} 
        label="Asansol, West Bengal, India" 
      />
    </div>
  );
};

export default SocialLinks;
