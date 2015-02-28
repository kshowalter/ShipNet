'use babel';
var log = console.log.bind(console);

var node_proto = {
    turn_off: function(){
        this.active = false;
        return this;
    },
    turn_on: function(){
        this.active = true;
        return this;
    },

    add_node: function(name, node){
        //this.subnodes[name] = node;
        this.node[name] = node;
        return this;
    },

    toggle_display: function(){
        if(this.display_expaned) this.display_expaned = false;
        else this.display_expaned = true;
        g.update();
    },


    html_one_line: function(){
        var one_line = $('<div>');
        var node = this;
        $('<span>').text(this.name).appendTo(one_line)
            .click(function(){
                node.toggle_display();
                console.log(node, this);
            });

        var status;
        if(this.active) status = 'ON';
        else status = 'OFF';
        $('<a>').text("["+status+"]").appendTo(one_line)
            .click(function(){
                if(node.active) node.active = false;
                else node.active = true;
                console.log(node, this);
                g.update();
            });

        return one_line;
    },

    html_subnodes: function(){
        var subnodes_span = $('<span>');
        for( var node in this.nodes ){
            subnodes_span.append( this.nodes[node].html_one_line() );
        }
        return subnodes_span;
    },

    html: function(){

        var output = $('<span>');
        if(this.display_expaned){
            output.append( this.html_one_line() );
            output.append( this.html_subnodes() );
        } else {
            output.append( this.html_one_line() );
        }

        return output;
    },


};



export default node_proto;
