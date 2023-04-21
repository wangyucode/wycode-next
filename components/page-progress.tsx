import { useEffect, useState } from "react";

export default function PageProgress({ initialProgress = 1, onProgress }) {
  const [progress, setProgress] = useState(initialProgress);

  const updateProgress = (progress: number) => {
    setProgress(progress);
    onProgress && onProgress(progress);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (progress < 100) {
        updateProgress(progress + 0.1);
      }
    }, 10);

    return () => clearTimeout(timeout);
  }, [progress]);

  useEffect(() => {
    updateProgress(initialProgress);
  }, [initialProgress]);

  return (
    <div className={`fixed left-0 w-full h-0.5 bg-gray-300 ${progress < 100 ? '': 'hidden'}`}>
      <div
        className="h-full bg-blue-500"
        style={{ width: `${progress}%` }}
      >
      </div>
    </div>
  );
}
