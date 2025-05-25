import { useState, useEffect } from 'react';

export const useImages = (imagesPath: string) => {
    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleImageSelect = (image: string) => {
        setSelectedImage(image);
    };

    useEffect(() => {
        const loadImages = async () => {
            try {
                const imageFiles = await window.ipcRenderer.invoke(
                    "get-images",
                    imagesPath
                );
                setImages(imageFiles);
                if (imageFiles.length > 0) {
                    setSelectedImage(imageFiles[0]);
                }
                setError(null);
            } catch (err) {
                setError("Failed to load images. Please check the directory path.");
                console.error("Error loading images:", err);
            }
        };

        loadImages();
    }, [imagesPath]);

    return {
        images,
        selectedImage,
        error,
        handleImageSelect
    };
};
