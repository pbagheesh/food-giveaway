'use strict';

const Package = require('../package.json');
const HauteCouture = require('haute-couture');

exports.register = (server, options, next) => {

    HauteCouture.using()(server, options, (err) => {

        if (err) {
            return next(err);
        }
        next();
    });
};

exports.register.attributes = {
    pkg: Package
};
