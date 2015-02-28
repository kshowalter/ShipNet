'use babel';
var log = console.log.bind(console);

var node_proto = require('./node_proto');

var mk_node = function(parameters){
    var node = Object.create(node_proto);

    for( var param_name in parameters ){
        node[param_name] = parameters[param_name];
    }

    node.active = false;
    node.node = {};

    return node;
};



export default mk_node;
