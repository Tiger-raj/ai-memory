import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
  const [content, setContent] = useState([]);
  async function fetchContent() {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  }
  useEffect(() => {
    fetchContent();
    const intervalId = setInterval(() => {
      fetchContent();
    }, 5000); // Fetch content every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  return { content, fetchContent };
}
