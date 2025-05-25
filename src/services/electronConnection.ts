import { IpcRendererEvent } from "electron";
import { electronPromise, electronReceive } from "./electronUtils";
import { Image, ImageStatus } from "../models/image";

export type Unsubscribe = () => void;

export const handleKeyPress = (onKeyPress: (key: string) => void): Unsubscribe => {
    const handler = (_: IpcRendererEvent, key: string) => {
        onKeyPress(key);
    };
    return electronReceive("key-pressed", handler);
};

export const getImagesFromDisk = async (dirPath: string): Promise<string[]> => {
    return electronPromise("get-images-from-disk", dirPath);
}

export const getImagesFromDb = async (): Promise<Image[]> => {
    return electronPromise("get-images-from-db");
}

export const updateImageStatus = async (name: string, status: ImageStatus): Promise<void> => {
    return electronPromise("update-image-status", name, status);
}

