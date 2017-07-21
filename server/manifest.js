'use strict';

const Dotenv = require('dotenv');
const Hoek = require('hoek');
const Confidence = require('confidence');

// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` });

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
    server: {
        debug: {
            $filter: 'NODE_ENV',
            development: {
                log: ['error', 'implementation', 'internal'],
                request: ['error', 'implementation', 'internal']
            }
        }
    },
    connections: [
        {
            host: '0.0.0.0',
            // port: Hoek.reach(process.env, 'PORT', { default: 3000 })
            port: process.env.PORT
        }
    ],
    registrations: [
        {
            plugin: {
                register: '../lib', // Main plugin
                options: {}
            }
        },
        {
            plugin: './plugins/swagger'
        },
        {
            plugin: {
                register: 'schwifty',
                options: {
                    $filter: 'NODE_ENV',
                    $default: {},
                    $base: {
                        migrateOnStart: true,
                        knex: {
                            client: 'pg',
                            useNullAsDefault: true,
                            pool: {
                                idleTimeoutMillis: Infinity // Handles knex v0.12/0.13 misconfiguration when using sqlite3 (tgriesser/knex#1701)
                            },
                            connection: {
                                host: 'localhost',
                                // user: 'brs',
                                // password: 'BRS@2017',
                                // database: 'food_network'
                                user: process.env.DB_USERNAME,
                                password:  process.env.DB_PASSWORD,
                                database:  process.env.DB_NAME
                            }
                        }
                    },
                    production: {
                        migrateOnStart: false
                    }
                }
            }
        }
    ]
});
