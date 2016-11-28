# ipnfo
> IP geolocation web server.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Running

### npm

```bash
git clone https://github.com/honzahommer/ipnfo.git && \
cd ipnfo && \
npm install && \
npm start
```

### Docker

```bash
docker run --net=host --restart=always -d honzahommer/ipnfo
```

#### Test

```bash
curl localhost:3000/8.8.8.8
```

## Endpoints

```bash
curl localhost:3000
curl localhost:3000/8.8.8.8
curl localhost:3000/8.8.8.8/hostname
```
