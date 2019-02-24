#!/usr/bin/env node

const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const favicon = require('request-favicon');
const flatten = require('flat');
const helmet = require('helmet');
const maxmind = require('maxmind');
const path = require('path');
const robots = require('request-robots');
const { reverse } = require('dns');

const { entries, keys, values } = Object;
const app = express();
const cities = maxmind.openSync(path.join(__dirname, '../db', 'geolite2-city.mmdb'));
const pkg = require('../package.json');

app.use(cors({ methods: 'GET', allowedHeaders: 'Content-Type,Accept' }));
app.use(favicon());
app.use(helmet());
app.use(robots());

app.get('/:ip([0-9.]+|[a-f0-9:]+)?/:key?', (req, res, next) => {
  const { params: { ip = req.ip, key } } = req;

  let lookup = cities.get(ip);
  let result;

  if (!lookup) {
    return next();
  }

  reverse(ip, (err, [hostname = null] = []) => {
    if (err) {
      hostname = null;
    }

    lookup = flatten(lookup);
    result = entries({
      city: 'city.names.en',
      postal_code: 'postal.code',
      metro_code: 'location.metro_code',
      subdivision: 'subdivisions.0.names.en',
      subdivision_code: 'subdivisions.0.iso_code',
      country: 'country.names.en',
      country_code: 'registered_country.iso_code',
      continent: 'continent.names.en',
      latitude: 'location.latitude',
      longitude: 'location.longitude',
      accuracy: 'location.accuracy_radius',
      time_zone: 'location.time_zone'
    }).reduce((acc, [key, val]) => {
      acc[key] = lookup[val] || null;

      return acc;
    }, { ip, hostname });

    if (key) {
      if (!(key in result)) {
        return next();
      }

      res.send(result[key]);
      return;
    }

    res.format({
      csv: () => {
        res.send(
          `${keys(result).join(';')}\n${values(result).join(';')}`
        );
      },
      json: () => {
        res.send(result);
      },
      html: () => {
        res.send(
          '<dl>' + entries(result).map(([ key, value ]) => `<dt>${key}</dt><dd>${value}</dd>`).join('') + '</dl>'
        );
      },
      text: () => {
        res.send(
          entries(result).map(([ key, value ]) => `${key}:${value}`).join('\n')
        );
      },
      xml: () => {
        res.send(
          '<?xml version="1.0" encoding="utf-8"?><result>' + entries(result).map(([ key, value ]) => `<${key}>${value}</${key}>`).join('') + '</result>'
        );
      },
      default: () => {
        next(createError(406));
      }
    });
  });
});

app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
  const { status = 500 } = err;

  res.status(status);
  res.json(err);
});

if (!module.parent) {
  const listener = app.listen(process.env.PORT || 3000, () => {
    // eslint-disable-next-line no-console
    console.log(pkg.name + ' listening on port ' + listener.address().port);
  });
}

module.exports = app;
