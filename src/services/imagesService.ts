import { IpcRendererEvent } from "electron";
import { electronPromise, electronReceive } from "./electronConnection";
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

