/**
 * Created by dkrzos on 17.03.16.
 */

var heroin = require('heroin-js');

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

configurator.export('bbbook-inventory').then(function(result) {
    console.log(result);
});


var prod= { name: 'bbbook-inventory',
    region: 'eu',
    maintenance: false,
    stack: 'cedar-14',
    config_vars: {
        MONGOLAB_URI: 'mongodb://heroku_3fk7nns1:8s3s3i4ju7e4n827hoh8nk3jc2@ds013619.mlab.com:13619/heroku_3fk7nns1',
        NAME: 'Dorota'
    },
    addons: {},
    collaborators:
        [ 'rafal@plan3.se',
            'katarzyna.wlodarska@schibsted.pl',
            'dorota.krzos@schibsted.pl',
            'mateusz.kwasniewski@schibsted.pl'],
    features:
    { 'runtime-dyno-metadata': { enabled: false },
        'log-runtime-metrics': { enabled: false },
        'http-session-affinity': { enabled: false },
        preboot: { enabled: false },
        'http-shard-header': { enabled: false },
        'http-end-to-end-continue': { enabled: false } },
    formation: [ { process: 'web', quantity: 1, size: 'Free' } ],
    log_drains: ['syslog://data.logentries.com:13636'],
    domains: [ 'bbbook-inventory.herokuapp.com' ] }

configurator(prod)