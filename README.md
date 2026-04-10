# LagerNode Core

A learning project: a simple **Node.js + Express API** for working with products. Data is read from the JSON file `data/dataBase.json`.

## Requirements

 - Node.js (LTS recommended)
- npm

## Installation

```bash
npm install
```

## Run

There is no `npm start` script yet, so run it directly:

```bash
node app.js
```

By default, the server starts at `http://localhost:3000`.

## Endpoints

### Health check

- `GET /` — text: `LagerNode Core is online.`

### Products

Base prefix: `/products`

- `GET /products` — all products
- `GET /products/id/:id` — product by id (id must be an integer > 0)
- `GET /products/category/:category` — products by category
- `GET /products/low-stock/:amount` — products where `stock <= amount`
- `GET /products/search/:name` — substring search by name (case-insensitive)
- `GET /products/price-range/:min/:max` — products by price range
- `GET /products/price-range/:min/:max/:category` — price range + category filter

## Request examples (curl)

```bash
curl http://localhost:3000/products
```

```bash
curl http://localhost:3000/products/id/1
```

```bash
curl http://localhost:3000/products/category/laptops
```

```bash
curl http://localhost:3000/products/search/mouse
```

```bash
curl http://localhost:3000/products/low-stock/10
```

```bash
curl http://localhost:3000/products/price-range/50/200
```

```bash
curl http://localhost:3000/products/price-range/50/200/accessories
```

## Error format

Errors are returned as JSON:

```json
{ "error": "Some message" }
```

Common status codes:

- `400` — invalid request parameters
- `404` — not found
- `500` — internal server error