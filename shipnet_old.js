
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


function setRate(id, value){
    log(id)
    rate = parseInt(value, 10)
    $('#'+id).text(rate)
}








/////////////////////////////////////////////
// WORLD






//var d = {}
var d_files = ['comps.json', 'hulls.json', 'ships.json']

var d = k.load_files(d_files, make_world)







/*
(function get_data() {
    var json_comps = false
    while(!json_comps || true){
        var URL = 'comps.json' 
        $.getJSON( URL, function( json ) {
            json_comps = json
        }).fail(function(jqxhr, textStatus, error) { 
            console.log( "error", textStatus, error  ) 
        })

    }

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

})()

*/





function make_world(d){
    for( var name in d) { k.obj_rename(d, name, name.split('.')[0])}
//    log(d)
    var comps = build_comps(d.comps)
//	var hulls = build_hulls(d.hulls)
}

var Component = {
    name: '',


    on: false,

    prop: false,
    power: false,
    life_support: false,
}

Component.prototype.update - function(){
	if( this.power ){
		this.power_level = this.power_reqested / this.max_power_generation
		this.power_availible = this.power_level * this.max_power_generation
	}
	
	
	
}


function build_comps(json){
    log('building comps')
    var comps = {}
    for(var comp_name in json) {
        var comp = Object.create(Component)
        k.obj_extend(comp, json[comp_name])

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

        comps[comp_name] = comp
        
    }

    for( var key in comps) {
        var obj = comps[key]
        var obj_div = $('<div>').addClass('box')
        obj_div.append(k.obj_tree(obj,key))
        $('#Eng').append(obj_div)
    }
//	$('ul.tree li:last-child').addClass('last');
	return comps
}






//////////////////////////////////////////
// after page loads functions

$(document).ready( function() {
    var title = 'ShipNet'
    var sections = {
        'Eng':'Eng', 
        'test':'test', 
        'Brd':'Brd', 
        'Nav':'Nav', 
        'Car':'Car', 
        'text_dump':'text_dump' 
    }

    k.setup_body(title, sections)
 
    
    
    /*jshint multistr: true */
    $('.tabs > #test').append($('<span>Prop level </span><span id="prop_level">20</span> \
        <input type="range" class= "slidder" id="rate" \
            min="20" max="100" step="1" value="20" \
            oninput="setRate(prop_level, this.value)"></br>'))

    $('.tabs > #test').append($('<span>Power level </span><span id="power_level">0</span> \
        <input type="range" class= "slidder" id="rate" \
            min="0" max="100" step="0.01" value="0" \
            oninput="setRate(power_level, this.value)"></br>'))

    
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

//    $( ".slider" ).slider()

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
    
    

    

    
})


