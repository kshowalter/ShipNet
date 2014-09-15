'use strict';

var rate = 1




var $ = require('jquery');
console.log($)

var settings = require('./app/settings');
var misc = require('./app/misc');


settings.data = { files: {} };
//settings.data.files = {};
settings.data.fileNames = ['comps.json', 'hulls.json', 'ships.json'];
settings.data.fileNames.forEach(function(name){
    settings.data.files[name] = {
        loaded: false,
        content: null,
    }
})
settings.data.filesLoaded = false;

//var d = k.load_files(d_files, make_world)

settings.data.fileNames.forEach( function( fileName ){
    console.log(fileName);
    var url = 'data/'+fileName;
    console.log(url);
    $.getJSON( url)
        .fail( function(returned){
            console.log('failed', returned)
        })
        .done( function(json){
            //console.log('done', data);
            ready(json, fileName);
        })
})


function ready(json, fileName){
    settings.data.files[fileName].content = json;
    settings.data.files[fileName].loaded = true;

    var go = true;
    for( fileName in settings.data.files ){
       if( ! settings.data.files[fileName].loaded ) go = false; 
    }
    if( go ) start();
}


function start(){
    console.log('start');
}



















// OLD content


function make_world(d){
    for( var name in d) { k.obj_rename(d, name, name.split('.')[0])}
//    log(d)
    var comps = build_comps(d.comps)
//	var hulls = build_hulls(d.hulls)
}

/*
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
*/


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







console.log('settings', settings);

