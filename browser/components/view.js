var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

import {
  tick
} from '../redux/actions.js';


/* eslint no-unused-vars: 0 */



var Button = React.createClass({
  click: function(e){
    //console.log(this.props.name);
    this.props.cb(this.props.name);
  },
  render: function(){
    return (
      <span className='button' onClick={this.click}>{this.props.name}</span>
    );
  }
});

var Display_text = React.createClass({
  render: function(){
    return (
      <span>{this.props.text}</span>
    );
  }
});


var ReactApp = React.createClass({

  test: function(){
    console.log('test');
  },
  tick: function(){
    this.props.dispatch(tick());
  },
  componentWillUpdate: function(nextProps){
    //console.log('view will update', this.props.universe.count);
  },
  render: function(){
    //console.log('view update', this.props);
    const time = this.props.universe.time;
    return (

      <span>
        <Button name='test' cb={this.test} /><br/>
        <br/>
        <Button name='tick' cb={this.tick} /><br/>
        <br/>
        <Display_text text={this.props.count} /><br/>
        <Display_text text={ 'Day ' + time.day + ' ' + time.hour + ':' + time.minute + ':' + time.tick } /><br/>
        <br/>
        {this.props.universe.ships_in_system[0].name}<br/>
        <br/>
      </span>
    );
  }
});

export default ReactApp;
