import { BrowserWindow } from 'electron'

export function setupKeyboardLogging(window: BrowserWindow, onKeyPressed: (key: string) => void) {
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    window.webContents.on('before-input-event', (event, input) => {
        // Only log on keydown to prevent double logging
        if (input.type === 'keyDown' && keys.includes(input.key)) {
            onKeyPressed(input.key)
        }
    })
}
