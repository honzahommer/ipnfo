# ipnfo

[![npm version][npm-image]][npm-url]
[![npm download][downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> IP geolocation web server.

## Install & Running

### Linux host (postinstall not works on Windows)

```bash
git clone https://github.com/honzahommer/ipnfo.git && \
cd ipnfo && \
npm install && \
npm start
```

### PM2 (Node.js process manager)

```bash
git clone https://github.com/honzahommer/ipnfo.git && \
cd ipnfo && \
npm install && \
pm2 startOrRestart ecosystem.config.js
```

### Docker

```bash
docker run -d -p 3000:3000 --restart=always --name=ipnfo honzahommer/ipnfo
```

### Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy) [![Greenkeeper badge](https://badges.greenkeeper.io/honzahommer/ipnfo.svg)](https://greenkeeper.io/)

## Tests

```bash
npm test
```

## Endpoints

```bash
curl localhost:3000
curl localhost:3000/8.8.8.8
curl localhost:3000/8.8.8.8/hostname
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/ipnfo.svg
[npm-url]: https://npmjs.org/package/ipnfo
[travis-image]: https://img.shields.io/travis/honzahommer/ipnfo/master.svg
[travis-url]: https://travis-ci.org/honzahommer/ipnfo
[downloads-image]: https://img.shields.io/npm/dm/ipnfo.svg
