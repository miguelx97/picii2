import { Image, ImageStatus } from "../models/image";

interface ImageItemProps {
  image: Image;
  isSelected: boolean;
  onClick: () => void;
}

const getItemColor = (image: Image, isSelected: boolean) => {
  if (isSelected) {
    return "bg-gray-100";
  }
  if (image.like === ImageStatus.LIKE) {
    return "bg-green-500";
  } else if (image.like === ImageStatus.DISLIKE) {
    return "bg-red-500";
  }
};

export function ImageItem({ image, isSelected, onClick }: ImageItemProps) {
  return (
    <div
      className={`p-2 cursor-pointer hover:bg-gray-200 rounded-lg ${getItemColor(
        image,
        isSelected
      )}`}
      onClick={onClick}
    >
      <span>{image.name}</span>
    </div>
  );
}
