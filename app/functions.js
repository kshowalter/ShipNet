var f = {};

f.getJSON = function(URL, name) {
    $.getJSON( URL, function( json ) {
        build_comps(json);
    }).fail(function(jqxhr, textStatus, error) {
        console.log( "error", textStatus, error  ) ;
    });
};

f.formatFloats = function( elem, index, array ) {
    array[index] = parseFloat(elem).toFixed(2);
};

f.formatFloat = function( str ) {
    return parseFloat(str).toFixed(2);
};


/*
 *  normRand: returns normally distributed random numbers
 *  http://memory.psych.mun.ca/tech/snippets/random_normal/
 */
f.normRand = function(mu, sigma) {
    var x1, x2, rad;

    do {
        x1 = 2 * Math.random() - 1;
        x2 = 2 * Math.random() - 1;
        rad = x1 * x1 + x2 * x2;
    } while(rad >= 1 || rad === 0);

    var c = Math.sqrt(-2 * Math.log(rad) / rad);
    var n = x1 * c;
    return (n * mu) + sigma;
};


f.setRate = function(id, value){
    log(id);
    rate = parseInt(value, 10);
    $('#'+id).text(rate);
};


module.exports = f;
