import { useState } from 'react';

import Image from 'next/image';

interface ImageUrlsProps {
  reviewResizeImageUrls: string[];
}

export default function ImagePresentation(props: ImageUrlsProps) {
  const { reviewResizeImageUrls } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviewResizeImageUrls.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === reviewResizeImageUrls.length - 1 ? 0 : prevIndex + 1));
  };

  const length = reviewResizeImageUrls.length;

  return length > 0 ? (
    <div className="flex justify-center p-4">
      <button
        className="absolute left-8 top-1/2 transform -translate-y-1/2"
        hidden={length === 1}
        onClick={handlePrev}
        type="button"
      >
        <svg
          className="bi bi-caret-left-fill"
          fill="currentColor"
          height="32"
          viewBox="0 0 16 16"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
        </svg>
      </button>

      <Image
        alt={`upload-img-${currentIndex}`}
        height={0}
        src={reviewResizeImageUrls[currentIndex]}
        width={500}
      />
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12"
        hidden={length === 1}
        onClick={handleNext}
        type="button"
      >
        <svg
          className="bi bi-caret-right-fill"
          fill="currentColor"
          height="32"
          viewBox="0 0 16 16"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
        </svg>
      </button>
    </div>
  ) : null;
}
