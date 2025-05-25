# Picii Image Viewer

A modern, lightweight image viewer built with Electron and Vite, featuring a sleek user interface powered by Tailwind CSS.

## Features

- Fast and responsive image viewing experience
- Modern UI with Tailwind CSS styling
- Cross-platform support (Windows, macOS, Linux)
- Built with Electron for native performance
- Hot-reload development with Vite

## Prerequisites

- Node.js v22.15.0
- npm v10.9.2

## Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd picii
```

2. Install dependencies:

```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

This will launch the application in development mode with hot-reload enabled.

## Building

To build the application for production:

```bash
npm run build
```

The built application will be available in the `dist` directory.

## Project Structure

```
picii/
├── src/              # Source files
├── public/           # Static assets
├── electron/         # Electron main process files
└── package.json      # Project configuration
```

## Technologies Used

- [Electron](https://www.electronjs.org/) - Cross-platform desktop application framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Proyect creation

To create a proyect like this follow this steps:

```
npm create electron-vite@latest
npm install
npm run dev
```

[Documentation](https://tailwindcss.com/docs/installation/using-vite) to add Tailwind to vite project
