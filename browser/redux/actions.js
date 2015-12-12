export const CHANGE_DATA_SELECTION = 'CHANGE_DATA_SELECTION';
export const REQUEST_DATA = 'REQUEST_DATA';
export const GET_DATA = 'GET_DATA';
export const SET_DATA = 'SET_DATA';

export function changeDataSelection(name, newValue){
  return {
    type: CHANGE_DATA_SELECTION,
    name,
    newValue
  };
}

export function requestData(){
  return {
    type: REQUEST_DATA
  };
}

var convertData = function(dataIn){
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
};


export function getData(dataSelectParams){
  console.log('dataSelectParams: ', dataSelectParams);
  return function(dispatch){
    g.socket.emit('getData', dataSelectParams, function(dataDocs){
      console.log(dataDocs.length);
      //dataDocs = dataDocs.slice(0,30);
      var data = convertData(dataDocs);
      dispatch(setData(data));
    });

  };
}

export function setData(data){
  return {
    type: SET_DATA,
    data
  };
}
