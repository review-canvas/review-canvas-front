import type { Dispatch, SetStateAction } from 'react';
import { useRef } from 'react';

import Image from 'next/image';

import CameraIcon from '@/assests/icon/icon-camera.svg';
import DeleteImageIcon from '@/assests/icon/icon-deleting-image.svg';
import type { ImageVideoUrl } from '@/models/api-type';

export interface ImageUploaderProps {
  uploadImages: ImageVideoUrl;
  setUploadImages: Dispatch<SetStateAction<ImageVideoUrl>>;
}
export function ImageUploader({ uploadImages, setUploadImages }: ImageUploaderProps) {
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
      reviewFileUrls: [...uploadImages.reviewFileUrls, ...fileArray],
      reviewResizeImageUrls: [...uploadImages.reviewResizeImageUrls, ...newImages],
    });
  };

  const handleDeleteImage = (id: number) => {
    setUploadImages({
      reviewFileUrls: uploadImages.reviewFileUrls.filter((_: any, index: number) => index !== id),
      reviewResizeImageUrls: uploadImages.reviewResizeImageUrls.filter((_: any, index: number) => index !== id),
    });
  };

  return (
    <div>
      <div className="flex justify-center text-center text-lg font-medium pt-6">
        사진 첨부하기 {uploadImages.reviewResizeImageUrls.length}/10
      </div>
      <div className="flex flex-row flex-wrap m-4 px-10">
        {uploadImages.reviewResizeImageUrls.map((imageUrl: string, index: number) => (
          <div
            className="relative m-2"
            key={index}
          >
            <Image
              alt={`upload-img-${index}`}
              height={0}
              src={imageUrl}
              width={110}
            />
            <button
              className="absolute right-0 top-0"
              onClick={() => {
                handleDeleteImage(index);
              }}
              type="button"
            >
              <DeleteImageIcon />
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
        {uploadImages.reviewFileUrls.length < 10 && (
          <button
            className="relative m-2"
            onClick={handleClick}
            type="button"
          >
            <CameraIcon />
          </button>
        )}
      </div>
      <div className="flex justify-center text-center text-xs text-gray-500 pt-1 pb-4">
        사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다
      </div>
    </div>
  );
}
