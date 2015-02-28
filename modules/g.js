'use babel';

var mk_settings = function(settings){
    settings = settings || {};
    var g = {};
    window.g = g;


    g.settings = settings;


    var seedrandom = require('seedrandom');
    var rand = seedrandom('phoebe');
    g.lib = {};
    g.lib.rand = rand;



};

export default mk_settings;
