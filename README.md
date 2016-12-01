# ipnfo
> IP geolocation web server.

[![npm version](https://img.shields.io/npm/v/ipnfo.svg)](https://www.npmjs.com/package/ipnfo)
[![Build Status](https://img.shields.io/travis/honzahommer/ipnfo/master.svg)](https://travis-ci.org/honzahommer/ipnfo)
[![devDependency Status](https://img.shields.io/david/dev/honzahommer/ipnfo.svg)](https://david-dm.org/honzahommer/ipnfo?type=dev)
[![Meteor Atmosphere](https://img.shields.io/badge/meteor-honzahommer%3Aipnfo-blue.svg)](https://atmospherejs.com/honzahommer/ipnfo)

## Instal & Running

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
docker run  -d --net=host --restart=always --name=ipnfo honzahommer/ipnfo
```

### Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

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
