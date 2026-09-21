# LangPal Express Proxy Gateway

This project provides an Express-based API gateway for proxying requests to LangPal backend microservices, handling CORS headers, and centralizing service access.

> **Part of the [LangPal Project](https://github.com/LangPal-App)**

## Features

- **Proxy Requests:** Forward API calls to underlying services using `http-proxy-middleware`.
- **Centralized CORS Management:** CORS headers are set based on environment configuration, supporting local development.
- **Environment Configurable:** All service URLs and secrets are configurable via `.env`.

## Getting Started

### Prerequisites

- Node.js (v24+ recommended)
- npm or yarn

### Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/LangPal-App/Gateway-Service.git
    cd Gateway-Service
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file at the project root. Example:
    ```
    PORT=5000
    AUTH_SERVICE_URL=http://localhost:8000/api
    PALS_SERVICE_URL=http://localhost:6000
    JWT_SECRET=your-secret-here
    CORS_CREDENTIALS=true
    CORS_ORIGIN=http://localhost:3000
    ```

### Running the Gateway

```bash
npm start
```

Or, for development with auto-reload:

```bash
npm run dev
```

The server will start on the port defined in your `.env` (`PORT`).

## Environment Variables Reference

| Variable            | Description                             | Default/Example                  |
|---------------------|-----------------------------------------|----------------------------------|
| PORT                | Port to run the gateway                 | 5000                             |
| AUTH_SERVICE_URL    | URL for the auth microservice           | http://localhost:8000/api        |
| PALS_SERVICE_URL    | URL for the pals microservice           | http://localhost:6000            |
| JWT_SECRET          | Secret for JWT verification             | your-secret-here                 |
| CORS_CREDENTIALS    | Whether to allow credentials in CORS    | true                             |
| CORS_ORIGIN         | Allowed CORS origin                     | http://localhost:3000            |

## How it Works

Requests to defined routes are proxied to configured backend services. The proxy layer also fixes request bodies and passes along response headers, including CORS.

See [`src/middleware/proxy.ts`](src/middleware/proxy.ts) for the proxy logic.

## License

MIT