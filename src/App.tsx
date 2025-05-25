import { useImages } from "./hooks/useImages";

function App() {
  const imagesFolderPath = "C:\\Users\\migue\\Downloads\\test\\images";
  const { images, selectedImage, error, handleImageSelect } =
    useImages(imagesFolderPath);

  const getImagePath = (path: string, image: string) => {
    return `file:///${path.replace(/\\/g, "/")}/${image}`;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Panel */}
      <div className="w-64 bg-white shadow-lg overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Pickii</h2>
        </div>
        <div className="p-2">
          {error ? (
            <div className="p-2 text-red-500">{error}</div>
          ) : images.length === 0 ? (
            <div className="p-2 text-gray-500">No images found</div>
          ) : (
            images.map((image, index) => (
              <div
                key={index}
                className={`p-2 cursor-pointer hover:bg-gray-200 rounded-lg ${
                  selectedImage === image ? "bg-gray-100" : ""
                }`}
                onClick={() => handleImageSelect(image)}
              >
                <span>{image}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 p-4">
        {selectedImage ? (
          <div className="h-full flex items-center justify-center">
            <img
              src={getImagePath(imagesFolderPath, selectedImage)}
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
