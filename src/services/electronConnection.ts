export type Unsubscribe = () => void;

// SEND
export const electronSend = (channel: string, ...args: any[]) => {
    window.ipcRenderer.send(channel, ...args);
};

// RECEIVE
export const electronReceive = (channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void): Unsubscribe => {
    window.ipcRenderer.on(channel, listener);
    return () => {
        window.ipcRenderer.off(channel, listener);
    };
};

// PROMISE
export const electronPromise = async (channel: string, ...args: any[]): Promise<any> => {
    return await window.ipcRenderer.invoke(channel, ...args);
};
