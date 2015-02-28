'use babel';
var log = console.log.bind(console);




g.f.rand_letter = function(list_string){
    var r = g.lib.rand();
    var i = Math.round( r * (list_string.length-1) );
    return list_string[i];
};

g.f.flip = function(A,B){
    var coin = Math.round(g.lib.rand());
    if(coin) return A;
    else return B;
};


var mk_node = function(parameters){
    var name = "";

    var consonants = 'bcdfghjklmnpqrstvwxyz';
    var vowels = 'aeiou';

    var len = Math.ceil( g.lib.rand() * 6 ) + 3;

    for( var i=0; i<len; i++){
        var letter_list = g.f.flip(consonants,vowels);

        if( letter_list === consonants) letter_list = g.f.flip( letter_list, vowels );
            else letter_list = g.f.flip( letter_list, consonants );

        name += g.f.rand_letter(letter_list);


    }



    return name;
};



export default mk_node;
