# MFE Webpack Demo – Remote1

## Overview

This is **Remote1**, a micro frontend exposed via Webpack Module Federation. It provides the `UserButton` component to the host app.

## Author

- **Ravindra Solanke** ([GitHub](https://github.com/ravisolanke1407))

## Live Demo

- Remote1: [https://mfe-remote1.vercel.app](https://mfe-remote1.vercel.app)

## Features

- Exposes React components for host consumption
- Shares React as singleton
- Manifest-driven remote loading

## Setup & Development

```sh
npm install
npm run start:local
```

App runs at [http://localhost:3001](http://localhost:3001)

## Deployment

- Push code to GitHub
- Import repo to Vercel and deploy (output dir: `dist`)

## Module Federation

- Exposes `./UserButton` in `remoteEntry.js`
- Shares React and ReactDOM as singleton

## License

MIT
