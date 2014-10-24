'use strict';
var version_string = "Dev";

var log = console.log.bind(console);

var moment = require('moment');

var misc = require('./app/misc');
var $ = require('jquery');
var k = require('./lib/k/k')

var settings = require('./app/settings');
var ship = require('./app/ship');
settings.ship = ship;
var component_update = require('./app/component_update');

var boot_time = moment();

var title = "ShipNet";
var rate = 1
var status_id = "status";

k.setup_body(title)
setInterval(function(){ k.update_status_page(status_id, boot_time, version_string);},1000);

settings.data = {};
settings.file = {};
settings.file.files = {};
settings.file.fileNames = ['comps.json', 'hulls.json', 'ships.json', 'systems.json', 'mater.json'];
settings.file.fileNames.forEach(function(name){
    settings.file.files[name] = {
        loaded: false,
        content: null,
    }
})
settings.file.filesLoaded = false;

//var d = k.load_files(d_files, make_world)

settings.file.fileNames.forEach( function( fileName ){
    //console.log(fileName);
    var url = 'data/'+fileName;
    //console.log(url);
    $.getJSON( url)
        .fail( function(returned){
            console.log('failed', returned)
        })
        .done( function(json){
            //console.log('done', data);
            ready(json, fileName);
        })
})


function ready(json, jsonFileName){
    settings.file.files[jsonFileName].content = json;
    settings.file.files[jsonFileName].loaded = true;

    var temp = jsonFileName.split('.');
    temp.pop();
    var name = temp.join('.');
    settings.data[name] = json;

    var go = true;
    for( var fileName in settings.file.files ){
       if( ! settings.file.files[fileName].loaded ) go = false; 
    }
    if( go ) start(settings);
}


function start(settings){
    console.log('start');

    for( var systemName in settings.data.systems ) {
        settings.ship.systems[systemName] = {};

    }


    settings.ship.location = [23,43,144];
    settings.ship.mainPower = true;
    settings.ship.life = {
        on: true,
        atmos: {
            O2: 22,
            CO2: 73,
        }
    }

    settings.ship.cargo = [
        {
            id: 23123,
            description: 'crate',
        },
        {
            id: 124958,
            description: 'crate',
        },
    ]

    settings.ship.net = {
        ids: {
            0: "ship",
        },
    }

    for( var componentName in settings.data.comps ) {
        var component = settings.data.comps[componentName]; 
        component.systems.forEach( function(systemName) {
            settings.ship.systems[systemName][componentName] = ship.funct.installComponent(component);
        });

    }

    mk_page(settings);
}



function mk_page(settings){
    log('making page');
    var ship = settings.ship;

    var body = $('body');

    var status_bar = $('<div>').attr('id', 'status').appendTo(body);

    var shipDiv = $('<div>').attr('class', 'ship').appendTo(body);

    var title = $('<span>').text('ship').appendTo(shipDiv);

    for( var systemName in ship.systems ){
        var systemDiv = $('<div>').attr('class', 'system').attr('id', 'system_'+systemName).appendTo(shipDiv);
    }
    update(settings);


}





function update(settings){
    for( var systemName in settings.ship.systems ){
        updateSystemDiv(settings, systemName);
    }



}
ship.misc.globalUpdate = update;





function updateSystemDiv(settings, systemName){
    var systemDiv = $('#system_'+systemName);
    systemDiv.empty();
    var systemTitle = $('<a>').attr('href', '#').text(systemName).appendTo(systemDiv).click(function(){
        //log($('#system_'+systemName).children('.drawer'));
        $(this).parent().children('.drawer').slideToggle('fast');
        //$(this).slideToggle();
    });
    var drawer = $('<div>').attr('class', 'drawer').appendTo(systemDiv);
    var system = settings.ship.systems[systemName];

    if( systemName in mkSystems) {
        mkSystems[systemName](settings).appendTo(drawer);
    }

    var systemDiv = $('<div>').attr('class', 'subSection').appendTo(drawer);

    $('<p>').html('Installed components').appendTo(systemDiv);

    for( var compName in system ){
        var comp = system[compName];
        var compDiv = $('<div>').attr('class', 'component').appendTo(systemDiv);
        var powDisplay = '_';
        if( comp.powered ) powDisplay = 'o';
        $('<a>').attr('href', '#').text('['+powDisplay+']').appendTo(compDiv).click(function(){
            if( event.toElement.innerHTML === '[o]' ) event.toElement.innerHTML = '[_]';
            else event.toElement.innerHTML = '[o]';
            ship.funct.powerToggle(settings, comp.id);
        });
        $('<span>').text(compName+' ').appendTo(compDiv);
        $('<span>').text('('+comp.id+')').attr('class', 'id').appendTo(compDiv);
        $('<span>').attr('class', 'rightValue').attr('id', 'S'+comp.id+'_status' ).text(comp.status).appendTo(compDiv);
    }
}

var mkSystems = {
    nav: function(settings){
        var div = $('<div>');

        $('<p>').html( 'Location: '+ settings.ship.location ).appendTo(div);

        return div;
    },
    cargo: function(settings){
        var div = $('<div>');
        $('<p>').html( 'Cargo contents').appendTo(div);
        settings.ship.cargo.forEach( function( cargo ){
            $('<span>').text( 'crate' ).appendTo(div);
            $('<span>').text( '('+cargo.id+')' ).attr('class', 'id').attr('id', 'C'+cargo.id).appendTo(div);
            $('<br>').appendTo(div);
        });

        return div;
        
    },

}














// OLD content

/*

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


*/





console.log('settings', settings);

