var log = console.log
var print = console.log
var rate = 1






//////////////////////////////////////////
// misc functions


function get_JSON(URL, name) {
    $.getJSON( URL, function( json ) {
        build_comps(json)
    }).fail(function(jqxhr, textStatus, error) { 
        console.log( "error", textStatus, error  ) 
    })
}

function get_data() {
    var json_comps = false
    while(!json_comps || true){
        var URL = 'comps.json' 
        $.getJSON( URL, function( json ) {
            json_comps = json
        }).fail(function(jqxhr, textStatus, error) { 
            console.log( "error", textStatus, error  ) 
        })

    }
    build_comps(json_comps)

}

function format_floats( elem, index, array ) {
    array[index] = parseFloat(elem).toFixed(2)
}

function format_float( str ) {
    return parseFloat(str).toFixed(2)
}


/*
 *  normRand: returns normally distributed random numbers
 *  http://memory.psych.mun.ca/tech/snippets/random_normal/
 */
function normRand(mu, sigma) {
    var x1, x2, rad

    do {
        x1 = 2 * Math.random() - 1
        x2 = 2 * Math.random() - 1
        rad = x1 * x1 + x2 * x2
    } while(rad >= 1 || rad === 0)

    var c = Math.sqrt(-2 * Math.log(rad) / rad)
    var n = x1 * c
    return (n * mu) + sigma
}


function setRate(value){
    rate = parseInt(value, 10)
    $('#rate').text(rate)
}








/////////////////////////////////////////////
// WORLD
function make_world(json){
    build_comps(json)

}

var Component = {
    name: '',


    on: false,

    prop: false,
    power: false,
    life_support: false,
}


function build_comps(json){
    var comps = {}
    for(var comp_name in json) {
        var comp = Object.create(Component)
        extend(comp, json[comp_name])
        if(comp.life){ 
            comp.power_use = function(){
                return 1 + 10 * comp.people
            }
        }

        if(comp.prop){ 
            comp.prop_level = 0
            comp.fuel_use = function(){
                return 0.001 + 0.1*this.prop_level 
            }
        }
        if(comp.power){ 
            comp.power_level =  0
            comp.fuel_use = function(){
                return 0.001 + 0.01*this.power_level 
            }                
        }
        if(comp.power && comp.prop){ 
            comp.fuel_use = function(){
                return 0.001 + 0.01*this.power_level + 0.1*this.prop_level 
            }
        }

        comp.items = {
            'cargo': ['miner', 'ore'],
            'test': 42
            
        }

        comps[comp_name] = comp
//        print(comp)
        
        
    }
    
//    for( var obj in comps) {
//        log(k.obj_display(obj))
//        $('#Eng').append(k.obj_display(obj))
//    }
        

    for( var key in comps) {
        var obj = comps[key]
        var obj_div = $('<div>').addClass('box')
        obj_div.append('<span>'+key+'</span>')
        obj_div.append(k.obj_display(obj))
        $('#Eng').append(obj_div)
    }


     $('ul.tree li:last-child').addClass('last');
}






//////////////////////////////////////////
// after page loads functions

$(document).ready( function() {
    document.title = 'ShipNet'
        
    $('body').prepend('<h1 id="title">ShipNet </h1>')
    $('body').prepend('<div id="status">Status</div>')

    var section_obj = {
        'Eng':'Eng', 
        'test':'test', 
        'Brd':'Brd', 
        'Nav':'Nav', 
        'Car':'Car', 
        'text_dump':'text_dump' 
    }

    var tabs_div = k.make_tabs(section_obj)
    $('body').append(tabs_div)
    
    

    $('.tabs > #test').append($('<span id="rate">x</span> \
        <input type="range" class= "slidder" id="rate" \
            min="-50" \
            max="50" \
            step="1" \
            value="0" \
            width="100%" \
            onchange="setRate(this.value)"> \
        <input type="date">" '))


    $( '.tabs' ).tabs({ 
        activate: function( event, ui ) {
            document.title = ui.newTab[0].textContent
            //dump(moment().format('YYYY-MM-DD HH:mm:ss'))
            $.sparkline_display_visible()
        }
    })
    

    
    var dump = $('#text_dump')
    dump.text('this is a test')
    
    /* Inline sparklines take their values from the contents of the tag */
    $('.inlinesparkline').sparkline()
    /* Sparklines can also take their values from the first argument
    passed to the sparkline() function */
    var myvalues = [10,8,5,7,4,4,1]
    $('.dynamicsparkline').sparkline(myvalues)
    /* The second argument gives options such as chart type */
    $('.dynamicbar').sparkline(myvalues, {type: 'bar', barColor: 'green'} )
    /* Use 'html' instead of an array of values to pass options
    to a sparkline with data in the tag */
    $('.inlinebar').sparkline('html', {type: 'bar', barColor: 'red'} )

    $( ".slider" ).slider()

    $( "#rate" ).slider({
        change: function( event, ui ) {
            console.log(ui.value)
            rate = ui.value - 50
        }
    })


    //

});



$(window).ready( function() {
    var boot_time = moment()
    var status_id = "#status"
    setInterval(function(){ k.update_status_page(status_id, boot_time) },1000)
    get_JSON('comps.json', 'comps')
    

    
})


