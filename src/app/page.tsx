"use client";

import { useState } from "react";
import { VideoPlayer } from "~/components/VideoPlayer";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { IconBrandYoutube } from "@tabler/icons-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return url.includes("youtube.com") || url.includes("youtu.be");
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidUrl(url)) {
      setVideoUrl(url);
      setError("");
    } else {
      setError("Please enter a valid YouTube URL");
      setVideoUrl("");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 p-4 dark:from-neutral-950 dark:to-neutral-900">
      <div className="mx-auto max-w-3xl space-y-8 pt-8">
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <IconBrandYoutube className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold">YouTube Embedder</h1>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Paste a YouTube URL to embed the video
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="youtube-url">YouTube URL</Label>
            <div className="flex gap-2">
              <Input
                id="youtube-url"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Embed</Button>
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
          )}
        </form>

        {videoUrl && <VideoPlayer url={videoUrl} />}
      </div>
    </main>
  );
}
