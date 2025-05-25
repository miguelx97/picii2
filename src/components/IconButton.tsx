import { ReactNode } from "react";

interface IconButtonProps {
  onClick: () => void;
  icon: ReactNode;
  title: string;
  variant?: "default" | "like" | "dislike";
}

export const IconButton = ({
  onClick,
  icon,
  title,
  variant = "default",
}: IconButtonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "like":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "dislike":
        return "bg-red-500 hover:bg-red-600 text-white";
      default:
        return "bg-gray-200 hover:bg-gray-300";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors ${getVariantClasses()}`}
      title={title}
    >
      {icon}
    </button>
  );
};
