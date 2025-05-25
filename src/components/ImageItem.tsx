import { HeartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Image, ImageStatus } from "../models/image";

interface ImageItemProps {
  image: Image;
  isSelected: boolean;
  onClick: () => void;
}

export function ImageItem({ image, isSelected, onClick }: ImageItemProps) {
  return (
    <div
      className={`p-2 cursor-pointer hover:bg-gray-200 rounded-lg flex flex-row items-center gap-1 ${
        isSelected ? "bg-gray-100" : ""
      }`}
      onClick={onClick}
    >
      {image.like === ImageStatus.LIKE && (
        <HeartIcon className="h-4 w-4 text-green-500" />
      )}
      {image.like === ImageStatus.DISLIKE && (
        <XMarkIcon className="h-4 w-4 text-red-500" />
      )}
      <span>{image.name}</span>
    </div>
  );
}
