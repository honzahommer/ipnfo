#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const request = require('request');
const zlib = require('zlib');

const file = fs.createWriteStream(path.join(__dirname, '../db', 'geolite2-city.mmdb'));

request('http://geolite.maxmind.com/download/geoip/database/GeoLite2-City.mmdb.gz')
  .pipe(zlib.createGunzip())
  .pipe(file);
