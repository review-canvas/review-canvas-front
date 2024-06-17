import { useState } from 'react';

import Image from 'next/image';

interface ImageUrlsProps {
  reviewResizeImageUrls: string[];
}

export default function ImageSlide(props: ImageUrlsProps) {
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
    <div className="flex justify-center p-2 items-center h-screen">
      <button
        className="absolute left-3 top-1/2 transform -translate-y-1/2"
        hidden={length === 1}
        onClick={handlePrev}
        type="button"
      >
        <svg
          fill="#616161"
          viewBox="0 0 24 24"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" />
        </svg>
      </button>
      <Image
        alt={`upload-img-${currentIndex}`}
        className="max-w-[80%] max-h-[80%] object-contain"
        height={0}
        src={reviewResizeImageUrls[currentIndex]}
        width={500}
      />
      <button
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-12 h-12"
        hidden={length === 1}
        onClick={handleNext}
        type="button"
      >
        <svg
          fill="#616161"
          viewBox="0 0 24 24"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" />
        </svg>
      </button>
    </div>
  ) : null;
}
