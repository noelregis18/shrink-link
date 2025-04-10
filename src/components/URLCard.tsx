
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShortenedURL, deleteUrl } from "@/services/urlService";
import { toast } from "sonner";
import { Copy, ExternalLink, Trash2, BarChart } from "lucide-react";
import { format } from "date-fns";

interface URLCardProps {
  url: ShortenedURL;
  onDelete: () => void;
}

export const URLCard = ({ url, onDelete }: URLCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url.shortUrl);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy. Please try again.");
    }
  };

  const handleDelete = () => {
    if (deleteUrl(url.id)) {
      onDelete();
      toast.success("URL deleted successfully!");
    } else {
      toast.error("Failed to delete URL. Please try again.");
    }
  };

  const openUrl = () => {
    window.open(url.shortUrl, "_blank");
  };

  const truncateUrl = (url: string, maxLength = 40) => {
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url;
  };

  return (
    <Card className="w-full glass">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start gap-2">
            <div className="flex flex-col">
              <h3 className="font-medium text-sm sm:text-base break-all">
                {truncateUrl(url.originalUrl)}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-accent font-medium break-all">
                  {url.shortUrl}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={openUrl}
                title="Open link"
              >
                <ExternalLink size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={copyToClipboard}
                title="Copy to clipboard"
              >
                <Copy size={16} className={copied ? "text-green-500" : ""} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-destructive hover:text-destructive"
                onClick={handleDelete}
                title="Delete"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground mt-1">
            <div className="flex items-center gap-1.5">
              <BarChart size={14} />
              <span>{url.clicks} clicks</span>
            </div>
            <div>
              Created: {format(url.createdAt, "MMM d, yyyy 'at' h:mm a")}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default URLCard;
