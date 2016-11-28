#!/usr/bin/env node

'use strict';

var cors = require('cors');
var dns = require('dns');
var express = require('express');
var fs = require('fs');
var ip = require('request-ip');
var path = require('path');
var maxmind = require('maxmind');

var pkg = require('./package.json');

var app = express();
var router = new express.Router();

// Maxmind GeoIP
var cities = maxmind.openSync('db/geolite2-city.mmdb');

// Gets the value at `path` of `object`.
var getter = function(object, path, value) {
  if (typeof path === 'string') {
    // convert indexes to properties
    // string = string.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/\[(\w+)]/g, '.$1');
    // strip a leading dot
    path = path.replace(/^\./, '');
    // path to array
    path = path.split('.');
  }

  for (var i = 0, n = path.length; i < n; ++i) {
    var key = path[i];

    if (object && key in object) {
        object = object[key];
    } else {
        return value;
    }
  }

  return object;
};

// Validate request params and set default IP.
var params = function(req) {
  (function __(ip) {
    return (req.params.ip = maxmind.validate(ip) ? ip : (req.params.key = ip, __(req.clientIp)), ip);
  })(req.params.ip);

  return req.params;
}

// Disable X-Powered-By header
app.disable('x-powered-by');

// Middlewares
app.use(cors());
app.use(router);
app.use(ip.mw());

// Handle favicon requests
app.get('/favicon.ico', function(req, res) {
  res.status(204).send();
});

// Base route
app.get('/:ip?/:key?', function(req, res) {
  var p = params(req);
  var ip = p.ip;
  var key = p.key;

  dns.reverse(ip, function(err, hostname) {
    var lookup = cities.get(ip);
    var result = {
      ip: ip,
      hostname: getter(hostname, '0'),
      city: getter(lookup, 'city.names.en'),
      postal_code: getter(lookup, 'postal.code'),
      metro_code: getter(lookup, 'location.metro_code'),
      subdivision: getter(lookup, 'subdivisions.0.names.en'),
      subdivision_code: getter(lookup, 'subdivisions.0.iso_code'),
      country: getter(lookup, 'country.names.en'),
      country_code: getter(lookup, 'registered_country.iso_code'),
      continent: getter(lookup, 'continent.names.en'),
      latitude: getter(lookup, 'location.latitude'),
      longitude: getter(lookup, 'location.longitude'),
      accuracy: getter(lookup, 'location.accuracy_radius'),
      time_zone: getter(lookup, 'location.time_zone')
    };

    res.status(200).send(key ? getter(result, key) : result);
  });
});

var listener = app.listen(process.env.PORT || 3000, function() {
  console.log(pkg.name + ' listening on port ' + listener.address().port);
});
