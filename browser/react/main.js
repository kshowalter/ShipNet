var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

import {
  getData
} from '../redux/actions.js';


/* eslint no-unused-vars: 0 */

//*
var Table_row = React.createClass({
  render: function(){
    var row_content = this.props.values.map(function(value, i){
      return (
        <td key={i}>{value}</td>
      );
    });
    return (
      <tr>{row_content}</tr>
    );
  }
});
var Table_header = React.createClass({
  render: function(){
    var fields = this.props.fields.map(function(field, i){
      return <th key={i}>{field.name}</th>;
    });
    return (
      <thead>
        <tr>{fields}</tr>
      </thead>
    );
  }
});
var Table_body = React.createClass({
  render: function(){
    var headerIndex = {};
    this.props.fields.forEach(function(field, index){
      headerIndex[field.name] = index;
    });
    var colNum = this.props.fields.length;
    var rows = this.props.rows.map(function(doc, i){
      var values = [];
      for( var c = 0; c < colNum; c++ ){
        var key = this.props.fields[c].name;
        if( doc[key] !== undefined ){
          values.push(doc[key]);
        } else {
          values.push('');
        }
      }
      return <Table_row  key={i} values={values}/>;
    }.bind(this));
    return (
      <tbody>
        {rows}
      </tbody>
    );
  }
});
var DataTable = React.createClass({
  render: function(){

    return (
      <table className="datatable">
        <Table_header fields={this.props.fields} />
        <Table_body fields={this.props.fields} rows={this.props.data} />
      </table>
    );
  }
});

var DropList = React.createClass({
  change: function(e){
    this.props.cb(this.props.name, e.target.value);
  },
  render: function(){
    var options = this.props.list.map(function(name, i){
      return <option value={name} key={name}>{name}</option>;
    }.bind(this));
    return (
      <select className="dropList" onChange={this.change} value={this.props.selected}>
        <option key="-" > </option>
        {options}
      </select>
    );
  }
});

var Button = React.createClass({
  click: function(e){
    console.log(this.props.name);
    this.props.cb(this.props.name);
  },
  render: function(){
    return (
      <span className="button" onClick={this.click}>{this.props.name}</span>
    );
  }
});

var Drawer = React.createClass({
  click: function(e){
    console.log(e.target.parentNode.querySelectorAll('.drawer')[0].querySelectorAll('.drawer_content')[0].style.display);
    var drawer_content = e.target.parentNode.querySelectorAll('.drawer')[0].querySelectorAll('.drawer_content')[0];
    if( drawer_content.style.display === '' ){
      drawer_content.style.display = 'none';
    } else {
      drawer_content.style.display = '';
    }
  },
  render: function(){
    return (
      <div className="fieldSelect drawer_container" >
        <div className="title_bar title_bar_text" onClick={this.click}>{this.props.title}</div>
        <div className="drawer">
          <div className="drawer_content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

var FieldControl = React.createClass({
  click: function(e){
    this.props.toggleField(e.target.innerHTML);
  },
  render: function(){
    var fields = this.props.fields.map(function(field, i){
      var className = field.display ? 'selectedField' : 'unSelectedField';
      return <span key={i} className={className} onClick={this.click}>{field.name}</span>;
    }.bind(this));
      {/*
      <div className="fieldSelect drawer_container" >
        <div className="title_bar title_bar_text">Field Control</div>
        <div className="drawer">
          <div className="drawer_content">
            {fields}
          </div>
        </div>
      </div>
      */}
    return (
      <Drawer title="Field Control">
        {fields}
      </Drawer>
    );
  }
});



var ReactApp = React.createClass({
  /*
  toggleField: function(fieldName){
    var fields = this.state.fields;

    var index = _.findIndex(fields, function(field) {
      return field.name == fieldName;
    });
    fields[index].display = ! fields[index].display;
    this.setState({fields: fields});
  },
  getData: function(){
    g.socket.emit('getData', this.state.activeProject, this.state.dataSelectParams, function(dataDocs){

      dataDocs = dataDocs.slice(0,30);

      var data = this.convertData(dataDocs);
      this.setState({fields: data.fields});
      this.setState({data: data.data});
    }.bind(this));
  },
  convertData: function(dataIn){
    var idKey = '_id';
    var data = {
      fields: [],
      data: []
    };
    data.data = dataIn.map(function(doc){
      doc = _.omit(doc, idKey);
      _.keys(doc).forEach(function(fieldName){
        data.fields.push(fieldName);
      });
      return doc;
    });
    data.fields = _.unique(data.fields);

    data.fields = data.fields.map(function(fieldName){


      return {
        name: fieldName,
        display: true
      };
    });
    return data;
  },

  getInitialState: function() {
    return this.props.initState;
  },
  componentDidMount: function() {
    g.socket.emit('projectList', function(projectList){
      this.setState({projectList: projectList});
    }.bind(this));

    if( true ){
      //this.setState({activeProject: 'RTC_met'})
      this.change('activeProject', 'RTC_met');
      //this.setState({date: '2015-06-21'})
      //this.switchDate('2015-06-21');
    }
  },
  //*/
  /*
  change: function(toChange, newValue){
    if( toChange === 'activeProject' ){
      var newProject = newValue;
      this.setState({activeProject: newProject});
      g.socket.emit('projectInfo', this.state.activeProject, function(projectInfo){
        this.setState({projectInfo: projectInfo});
      }.bind(this));
      g.socket.emit('dataDates', newProject, function(dates){
        this.setState({projectDates: dates});
      }.bind(this));

    } else {
      var stateParam = toChange.split('.');
      console.log(stateParam);
      if( stateParam.length === 1 ){
        var nextState = {};
        nextState[stateParam[0]] = newValue;
        this.setState(nextState, function(){
          this.getData();
        });
      } else if( stateParam.length === 2 ) {
        var existingObject = this.state[stateParam[0]];
        existingObject[stateParam[1]] = newValue;
        var nextState = {};
        nextState[stateParam[0]] = existingObject;
        this.setState(nextState, function(){
          this.getData();
        });
      }
    }
  },
  //*/
  changeDataSelection: function(name, newValue){
    var newDataSelection = Object.assign({}, this.props.dataSelectParams, {
      [name]: newValue
    });
    this.props.dispatch( getData(newDataSelection) );
  },
  render: function(){
    console.log('root state: ', this.state);
    console.log('root props: ', this.props);
    //console.log('root test: ', this.state.test);
    //var fields = this.state.fields.map(function(field, i){
    //  if( field.display ) {
    //    return field;
    //  } else {
    //    return undefined;
    //  }
    //  //return <Table_row values={header}/>;
    //});
    //fields = _.compact(fields);
    //var dayHours = _.range(24).map(function(n){
    //  var hour = String(n);
    //  if(hour.length === 1) hour = '0' + hour;
    //  return hour + ':00';
    //});
    return (
//      <span>
//        <Drawer title="Data Selection">
//          <DropList list={this.state.projectList} selected={this.state.activeProject} change={this.change} toChange='activeProject' />
//          <DropList list={['none', 'RTC_met' ]} selected={this.state.dataProfile} change={this.change} toChange='dataProfile' />
//          <DropList list={this.state.projectDates} selected={this.state.dataSelectParams.date} change={this.change} toChange='dataSelectParams.date' ///>
//          <DropList list={dayHours} selected={this.state.dataSelectParams.startTime} change={this.change} toChange='dataSelectParams.startTime' />
//          <DropList list={dayHours} selected={this.state.dataSelectParams.endTime} change={this.change} toChange='dataSelectParams.endTime' />
//        </Drawer>
//        <div>
//          <FieldControl fields={this.state.fields} toggleField={this.toggleField} />
//        </div>
//        <div>
//          <DataTable fields={fields} data={this.state.data}/>
//        </div>
//      </span>
      <span>
        message
        <br />
        <br />
        <Button name="test" cb={this.test} />
        <br />
        <br />
        <DropList
          list={this.props.projectDates}
          selected={this.props.dataSelectParams.date}
          name='date'
          cb={this.changeDataSelection}
        />
      </span>
    );
  }
});

export default ReactApp;
