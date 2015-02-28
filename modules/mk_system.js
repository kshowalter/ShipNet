'use babel';
var orbit_types = [ 'Planet', 'Planet', 'Belt'];

var mk_system = function(settings){
    var system = {};
    var num_orbits = Math.round(Math.random()*10);

    system.orbits = [];

    for( var i=1; i<=num_orbits; i++){
        var r = Math.random() * 3;
        var type = orbit_types[Math.floor(Math.random()*orbit_types.length)];
        system.orbits.push({
            r: r,
            type: type,
            content: [],
        });
    }

    return system;
};

export default mk_system;
