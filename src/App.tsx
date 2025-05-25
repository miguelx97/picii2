import { useImages } from "./hooks/useImages";
import { useEffect, useRef } from "react";
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
  const selectedItemRef = useRef<HTMLDivElement>(null);
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

  // Store the latest functions in refs
  const functionsRef = useRef({
    nextImage,
    previousImage,
    likeImage,
    dislikeImage,
  });

  // Update refs when functions change
  useEffect(() => {
    console.log("Updating functions");
    functionsRef.current = {
      nextImage,
      previousImage,
      likeImage,
      dislikeImage,
    };
  }, [nextImage, previousImage, likeImage, dislikeImage]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedImage]);

  useEffect(() => {
    const unsubscribe = handleKeyPress((key: string) => {
      const { nextImage, previousImage, likeImage, dislikeImage } =
        functionsRef.current;

      if (key === Keys.ArrowDown) {
        nextImage();
      } else if (key === Keys.ArrowUp) {
        previousImage();
      } else if (key === Keys.ArrowRight) {
        likeImage();
      } else if (key === Keys.ArrowLeft) {
        dislikeImage();
      }
    });

    return unsubscribe;
  }, []); // Empty dependency array since we're using refs

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Panel */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {error ? (
              <div className="p-2 text-red-500">{error}</div>
            ) : images.length === 0 ? (
              <div className="p-2 text-gray-500">No images found</div>
            ) : (
              images.map((image, index) => (
                <div
                  key={index}
                  ref={selectedImage === image ? selectedItemRef : null}
                >
                  <ImageItem
                    image={image}
                    isSelected={selectedImage === image}
                    onClick={() => handleImageSelect(index)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className="p-4 flex flex-row gap-2 justify-center border-t border-gray-200 bg-white">
          <IconButton
            onClick={previousImage}
            icon={<ChevronLeftIcon className="h-6 w-6" />}
            title="Previous (Arrow Up)"
          />
          <IconButton
            onClick={nextImage}
            icon={<ChevronRightIcon className="h-6 w-6" />}
            title="Next (Arrow Down)"
          />
          <IconButton
            onClick={likeImage}
            icon={<HeartIcon className="h-6 w-6" />}
            title="Like (Arrow Right)"
            variant="like"
          />
          <IconButton
            onClick={dislikeImage}
            icon={<XCircleIcon className="h-6 w-6" />}
            title="Dislike (Arrow Left)"
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
