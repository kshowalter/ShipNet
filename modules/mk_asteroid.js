'use babel';
var log = console.log.bind(console);

var mk_asteroid = function(settings){
    var asteroid = {};
    asteroid.contents = {};
    var contents = [];
    var total = 0;
    for( var e in settings.element ){
        var quantity = Math.pow(Math.random()*100,3);
        quantity = Math.round(quantity);
        total += quantity;
        contents[e] = quantity;
    }

    /*jshint -W004 */
    for( var e in contents ){
        asteroid.contents[e] = Math.round(contents[e]/total*100)/100;
    }

    asteroid.loc = {
        out_of_plane: Math.pow( (Math.random()-0.5)*2, 3 ),
        out_of_orbit: Math.pow( (Math.random()-0.5)*2, 3 ),
        orbit_location: Math.random()*360
    };
    

    return asteroid;
};

export default mk_asteroid;
