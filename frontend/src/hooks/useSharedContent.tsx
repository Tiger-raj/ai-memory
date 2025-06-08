import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

interface SharedContent {
  _id: string;
  title: string;
  link: string;
  type: string;
}

interface SharedData {
  username: string;
  content: SharedContent[];
}

export function useSharedContent(hash: string | undefined) {
  const [sharedData, setSharedData] = useState<SharedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSharedContent() {
      if (!hash) {
        setError("Invalid share link");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BACKEND_URL}/api/v1/brain/${hash}`);

        if (!response.ok) {
          throw new Error("Failed to fetch shared content");
        }

        const data = await response.json();
        setSharedData(data);
      } catch (err) {
        console.error("Error fetching shared content:", err);
        setError("Failed to load shared memory");
      } finally {
        setLoading(false);
      }
    }

    fetchSharedContent();
  }, [hash]);

  return { sharedData, loading, error };
}
