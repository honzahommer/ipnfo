# ipnfo
> IP geolocation web server.

[![Release](https://img.shields.io/github/release/honzahommer/ipnfo.svg)](https://github.com/honzahommer/ipnfo/releases/latest) &nbsp;
[![npm version](https://img.shields.io/npm/v/ipnfo.svg)](https://www.npmjs.com/package/ipnfo)  &nbsp; [![Build Status](https://img.shields.io/travis/honzahommer/ipnfo/master.svg)](https://travis-ci.org/honzahommer/ipnfo) &nbsp; [![devDependency Status](https://img.shields.io/david/dev/honzahommer/ipnfo.svg)](https://david-dm.org/honzahommer/ipnfo?type=dev) &nbsp; [![Meteor Atmosphere](https://img.shields.io/badge/meteor-honzahommer%3Aipnfo-blue.svg)](https://atmospherejs.com/honzahommer/ipnfo)

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
docker run -d -p 3000:3000 --restart=always --name=ipnfo honzahommer/ipnfo
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
