
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { shortenUrl, ShortenedURL } from "@/services/urlService";
import { toast } from "sonner";
import { Link } from "lucide-react";

interface URLFormProps {
  onUrlShortened: (url: ShortenedURL) => void;
}

export const URLForm = ({ onUrlShortened }: URLFormProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);

    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    // Prepend https:// if no protocol is specified
    let processedUrl = url;
    if (!url.match(/^[a-zA-Z]+:\/\//)) {
      processedUrl = `https://${url}`;
    }

    if (!validateUrl(processedUrl)) {
      setIsError(true);
      toast.error("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    try {
      const shortened = shortenUrl(processedUrl);
      onUrlShortened(shortened);
      setUrl("");
      toast.success("URL shortened successfully!");
    } catch (error) {
      toast.error("Failed to shorten URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-3xl">
      <div className="relative flex items-center">
        <div className="absolute left-3 text-muted-foreground">
          <Link size={18} />
        </div>
        <Input
          type="text"
          placeholder="Enter your long URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={`pl-10 h-12 text-base ${
            isError ? "border-red-500 focus-visible:ring-red-500" : ""
          }`}
          disabled={isLoading}
        />
      </div>
      <Button type="submit" className="h-12 text-base font-medium" disabled={isLoading}>
        {isLoading ? "Shortening..." : "Shorten URL"}
      </Button>
    </form>
  );
};

export default URLForm;
