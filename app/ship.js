'use strict';

var ship = {
    systems: {},
    power: {
        max: 0,
        generating: 0,
    }
};

ship.installComponent = function(settings, component){
    component.id = newID();
    component.status = 'connected';
    component.powered = false;
    component.on = false;
    component.damage = 0;

    if(component.max_power_generation) settings.ship.power.max += component.max_power_generation;

    //log(settings.ship);
    settings.ship.net.ids[component.id] = component;

    return component;
}

ship.powerToggle = function(settings, id){
    var component = settings.ship.net.ids[id];
    if( component.on ){
        ship.compTurnOff(settings, id)
    } else {
        ship.compTurnOn(settings, id)
    }
}

ship.compTurnOn = function(settings, id){
    log("turning on: "+id)
    var component = settings.ship.net.ids[id];
    component.on = true;
    component.status = 'starting up';
    
    setTimeout( function(){ship.compPowerOn(settings, id)}, 2000);
    updateSystems(settings)
}

ship.compPowerOn = function(settings, id){
    log("powering on: "+id)
    var component = settings.ship.net.ids[id];

    component.status = 'running';
    updateSystems(settings)
}

ship.compTurnOff = function(settings, id){
    log("turning off: "+id)
    var component = settings.ship.net.ids[id];
    component.on = false;
    component.status = 'connected';

    updateSystems(settings)
}


module.exports = ship;
