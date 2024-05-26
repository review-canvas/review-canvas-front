import { useRef, useState } from 'react';

import Image from 'next/image';

type UploadImagesState = {
  imageFiles: File[];
  imageUrls: string[];
};

export function ImageUploader() {
  const [uploadImages, setUploadImages] = useState<UploadImagesState>({
    imageFiles: [],
    imageUrls: [],
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileRef.current?.click();
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = e.target.files;
    const fileArray = Array.from(files);

    const newImages = Array.from(files, (file) => URL.createObjectURL(file));
    setUploadImages({
      imageFiles: [...uploadImages.imageFiles, ...fileArray],
      imageUrls: [...uploadImages.imageUrls, ...newImages],
    });
  };

  const handleDeleteImage = (id: number) => {
    setUploadImages({
      imageFiles: uploadImages.imageFiles.filter((_: any, index: number) => index !== id),
      imageUrls: uploadImages.imageUrls.filter((_: any, index: number) => index !== id),
    });
  };

  return (
    <div>
      <div className="flex justify-center text-center text-lg font-medium pt-6">
        사진 첨부하기 {uploadImages.imageUrls.length}/10
      </div>
      <div className="flex flex-row flex-wrap m-4 px-10">
        {uploadImages.imageUrls.map((imageUrl: string, index: number) => (
          <div
            className="relative m-2"
            key={index}
          >
            <Image
              alt={`upload-img-${index}`}
              className="basis-1/4"
              height={110}
              src={imageUrl}
              width={110}
            />
            <button
              className="absolute right-0 bottom-0"
              onClick={() => {
                handleDeleteImage(index);
              }}
              type="button"
            >
              <svg
                className="bi bi-x-lg"
                fill="white"
                height="27"
                viewBox="0 0 16 16"
                width="27"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  className="p-3"
                  fill="rgba(0,0,0,0.6)"
                  height="100%"
                  width="100%"
                />
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </button>
          </div>
        ))}

        <input
          className="hidden"
          multiple
          onChange={handleImageUpload}
          ref={fileRef}
          type="file"
        />
        {uploadImages.imageFiles.length < 10 && (
          <button
            className="relative m-2"
            onClick={handleClick}
            type="button"
          >
            <svg
              className="bi bi-camera"
              fill="rgba(0,0,0,0.4)"
              height="110"
              viewBox="0 0 20 20"
              width="110"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                fill="none"
                height="100%"
                stroke="rgba(0,0,0,0.3)"
                width="100%"
              />
              <g transform="scale(0.5) translate(12.5, 11.5)">
                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1" />
              </g>
            </svg>
          </button>
        )}
      </div>
      <div className="flex justify-center text-center text-xs text-gray-500 pt-1 pb-4">
        사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다
      </div>
    </div>
  );
}
