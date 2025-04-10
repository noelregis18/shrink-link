
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUrlById, trackClick } from "@/services/urlService";
import { Loader2 } from "lucide-react";

const Redirect = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const url = getUrlById(id);
    
    if (!url) {
      setError("The link you're trying to access doesn't exist or has expired.");
      return;
    }
    
    trackClick(id);
    
    // Small delay for UX purposes
    const timer = setTimeout(() => {
      window.location.href = url.originalUrl;
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Link Not Found</h1>
          <p className="text-muted-foreground mb-8">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="text-primary hover:underline"
          >
            Return to home page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
        <h1 className="text-3xl font-bold mt-6 mb-2">Redirecting...</h1>
        <p className="text-muted-foreground">
          You're being redirected to your destination.
        </p>
      </div>
    </div>
  );
};

export default Redirect;
