import { useImages } from "./hooks/useImages";
import { useEffect } from "react";
import { Keys } from "./models/keys.enum";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { IconButton } from "./components/IconButton";
import { handleKeyPress } from "./services/electronConnection";
import { getImagePath } from "./models/image";
import { ImageItem } from "./components/ImageItem";

function App() {
  const imagesFolderPath = "C:\\Users\\migue\\Downloads\\test\\images";
  const {
    images,
    selectedImage,
    error,
    handleImageSelect,
    nextImage,
    previousImage,
    likeImage,
    dislikeImage,
  } = useImages(imagesFolderPath);

  useEffect(() => {
    const unsubscribe = handleKeyPress((key: string) => {
      if (key === Keys.ArrowDown) {
        nextImage();
      } else if (key === Keys.ArrowUp) {
        previousImage();
      }
    });

    return unsubscribe;
  }, [nextImage, previousImage]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Panel */}
      <div className="w-64 bg-white shadow-lg overflow-y-auto flex flex-col">
        <div className="p-2 flex-1">
          {error ? (
            <div className="p-2 text-red-500">{error}</div>
          ) : images.length === 0 ? (
            <div className="p-2 text-gray-500">No images found</div>
          ) : (
            images.map((image, index) => (
              <ImageItem
                key={index}
                image={image}
                isSelected={selectedImage === image}
                onClick={() => handleImageSelect(index)}
              />
            ))
          )}
        </div>
        <div className="p-4 flex flex-row gap-2 justify-center">
          <IconButton
            onClick={previousImage}
            icon={<ChevronLeftIcon className="h-6 w-6" />}
            title="Previous"
          />
          <IconButton
            onClick={nextImage}
            icon={<ChevronRightIcon className="h-6 w-6" />}
            title="Next"
          />
          <IconButton
            onClick={() => {
              likeImage(selectedImage?.name);
            }}
            icon={<HeartIcon className="h-6 w-6" />}
            title="Like"
            variant="like"
          />
          <IconButton
            onClick={() => {
              dislikeImage(selectedImage?.name);
            }}
            icon={<XCircleIcon className="h-6 w-6" />}
            title="Dislike"
            variant="dislike"
          />
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 p-4">
        {selectedImage ? (
          <div className="h-full flex items-center justify-center">
            <img
              src={getImagePath(imagesFolderPath, selectedImage.name)}
              alt="Selected"
              className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
            />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500 text-lg">Select an image to view</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
