import { combineReducers } from 'redux';

import {
  TICK
} from './actions';

import ship_tick from '../../modules/ship';






var update_universe = function(state, action){
  state = Object.assign({}, state, {
    time: Object.assign({}, state.time)
  });

  //state.ship = ship_tick(state.ship,action);

  state.time.tick++;
  if( state.time.tick >= 10) {
    state.time.tick = 0;
    state.time.minute++;
  }
  if( state.time.minute >= 10) {
    state.time.minute = 0;
    state.time.hour++;
  }
  if( state.time.hour >= 10) {
    state.time.hour = 0;
    state.time.day++;
  }

  return state;
};

var update_UI = function(state, action){

  return state;
};

var tick = function(state, action){
  //console.log('Advancing time to the next tick', state.universe.time);
  //state.count += 1;
  //state.test = !state.test;
  state = Object.assign({}, state, {
    UI: update_UI(state.UI, action),
    universe: update_universe(state.universe, action)

  });

  return state;
};


function reducer( state={}, action ){
  //console.log('Action: ', action);
  //var state = Object.assign({}, state);

  if( ! action ){
    return state;
  }


  if( action.type === TICK ){
    return tick(state, action);
  } else {
    return state;
  }


}

export default reducer;
