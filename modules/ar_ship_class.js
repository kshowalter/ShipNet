'use babel';
var log = console.log.bind(console);



var ship = {
    systems: {},
    power: {
        max: 0,
        generating: 0,
    },

    misc: {
        lastId: 100,
    },
};






ship.funct = {};


ship.funct.newID = function(){
    //ship.misc.lastId++;
    return ship.misc.lastId++;
}

ship.funct.installComponent = function(component){
    component.id = ship.funct.newID();
    component.status = 'connected';
    component.powered = false;
    component.on = false;
    component.damage = 0;

    if(component.max_power_generation) ship.power.max += component.max_power_generation;

    //log(ship);
    ship.net.ids[component.id] = component;

    return component;
}

ship.funct.powerToggle = function(id){
    var component = ship.net.ids[id];
    log(component);
    if( component.on ){
        ship.funct.compTurnOff(id)
    } else {
        ship.funct.compTurnOn(id)
    }
}

ship.funct.compTurnOn = function(id){
    log("turning on: "+id)
    var component = ship.net.ids[id];
    component.on = true;
    component.status = 'starting up';

    setTimeout( function(){ship.funct.compPowerOn(id)}, 2000);
    ship.misc.globalUpdate(settings)
}

ship.funct.compPowerOn = function(id){
    log("powering on: "+id)
    var component = ship.net.ids[id];

    component.status = 'running';
    ship.misc.globalUpdate(settings)
}

ship.funct.compTurnOff = function(id){
    log("turning off: "+id)
    var component = ship.net.ids[id];
    component.on = false;
    component.status = 'connected';

    ship.misc.globalUpdate(settings)
}


export default ship;
