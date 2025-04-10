
import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import URLForm from "@/components/URLForm";
import URLCard from "@/components/URLCard";
import { getAllUrls, ShortenedURL } from "@/services/urlService";
import { useEffect } from "react";

const Index = () => {
  const [urls, setUrls] = useState<ShortenedURL[]>([]);

  // Load URLs on component mount
  useEffect(() => {
    setUrls(getAllUrls());
  }, []);

  const handleUrlShortened = (newUrl: ShortenedURL) => {
    setUrls([newUrl, ...urls]);
  };

  const handleDelete = () => {
    setUrls(getAllUrls());
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 px-4">
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"
            aria-hidden="true"
          />
          <div className="container mx-auto max-w-6xl flex flex-col items-center text-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto">
                Transform Long URLs into{" "}
                <span className="gradient-text">Short Links</span>
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">
                Simplify your links with our powerful URL shortener. Create concise,
                shareable links in seconds.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full flex justify-center"
            >
              <URLForm onUrlShortened={handleUrlShortened} />
            </motion.div>
          </div>
        </section>
        
        {/* URLs List Section */}
        {urls.length > 0 && (
          <section className="py-8 px-4">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl font-bold mb-6">Your Shortened URLs</h2>
              <div className="flex flex-col gap-4">
                {urls.map((url) => (
                  <URLCard key={url.id} url={url} onDelete={handleDelete} />
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Features Section */}
        <section className="py-16 px-4 bg-secondary/50 dark:bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose ShrinkLink?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Simple & Fast",
                  description: "Shorten URLs in seconds with our user-friendly interface.",
                },
                {
                  title: "Track Clicks",
                  description: "Monitor how many people click on your shortened links.",
                },
                {
                  title: "Secure & Reliable",
                  description: "Your data is safe with us. We prioritize security and reliability.",
                },
              ].map((feature, index) => (
                <div key={index} className="glass rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
