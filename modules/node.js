'use babel';


class Node {
    constructor(properties) {

        for( var prop_name in properties ){
            this[prop_name] = properties[prop_name];
        }

        this.active = false;
        this.node = {};

    }


    turn_off() {
        this.active = false;
        return this;
    }
    turn_on() {
        this.active = true;
        return this;
    }

    add_node(name, node){
        //this.subnodes[name] = node;
        this.node[name] = node;
        return this;
    }

    toggle_display() {
        if(this.display_expaned) this.display_expaned = false;
        else this.display_expaned = true;
        g.update();
    }


    html_one_line() {
        var one_line = $('<div>');
        var node = this;
        $('<span>').text(this.name).appendTo(one_line)
            .click(function() {
                node.toggle_display();
                console.log(node, this);
            });

        var status;
        if(this.active) status = 'ON';
        else status = 'OFF';
        $('<a>').text("["+status+"]").appendTo(one_line)
            .click(function() {
                if(node.active) node.active = false;
                else node.active = true;
                console.log(node, this);
                g.update();
            });

        return one_line;
    }

    html_subnodes() {
        var subnodes_span = $('<span>');
        for( var node_name in this.node ){
            log('showing: '+ node_name);
            subnodes_span.append( this.node[node_name].html_one_line() );
        }
        return subnodes_span;
    }


//    html() {
//
//        var output = $('<div>')
//            .attr('class', 'node');
//        if(this.display_expaned){
//            log('display everything');
//            output.append( this.html_one_line() );
//            output.append( this.html_subnodes() );
//        } else {
//            output.append( this.html_one_line() );
//        }
//
//        return output;
//    }

    html(){
        var drawer_container = $('<div>')
            .attr('class', 'node')
            .attr('id', 'node_'+this.name);
            //.attr('id', title );
            //drawer_container.get(0).style.display = display_type;

        var title_bar = $('<div>')
            .attr('class', 'title_bar')
            .attr('section_nom', this.name)
            .appendTo(drawer_container)
            /* jshint -W083 */
            .click(function(){
                //var name = $(this).attr('section_nom');
                //g.webpage.selections_manual_toggled[name] = true;
                $(this).parent().children('.drawer').children('.drawer_content').slideToggle('fast');
            });
//        var title = $('<a>')
//            .attr('class', 'title_bar_text')
//            .attr('href', '#')
//            //.text(f.pretty_name(title))
//            .text(this.name)
//            .appendTo(title_bar);

        this.html_one_line()
            .appendTo(title_bar);

        var drawer = $('<div>')
            .attr('class', 'drawer')
            .appendTo(drawer_container);

        this.html_subnodes()
            .attr('class', 'drawer_content')
            .appendTo(drawer);

        return drawer_container;


    }

}

export default Node;
