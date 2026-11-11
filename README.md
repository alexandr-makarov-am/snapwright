# snapwright

A lightweight Express API that generates full-page PNG screenshots of any URL using Playwright.

## Tech Stack

- **Runtime**: Node.js (ESM)
- **Framework**: Express 5
- **Browser automation**: Playwright (Chromium headless)
- **Language**: TypeScript
- **Dev tooling**: tsx (dev runner), tsc (build)

### Prerequisites

- Node.js ≥ 20
- npm

### Installation

```console
npm install
```

### Usage

```console
npm start:dev
npm start:prod
```


## API

### `GET /screenshot`

Returns a PNG screenshot of the given URL.

| Query param | Required | Default | Description                              |
|-------------|----------|---------|------------------------------------------|
| `url`       | ✅       | –       | Target URL to screenshot                 |
| `width`     | ❌       | `1024`  | Viewport width (px)                      |
| `height`    | ❌       | `1024`  | Viewport height (px)                     |

**Example request**

```console
curl -X GET 'http://localhost:4182/screenshot?url=https://example.com&width=1920&height=1080'
```