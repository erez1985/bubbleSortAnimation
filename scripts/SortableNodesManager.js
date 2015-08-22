/**
 * manages the nodes, acts as a container which holds the array of all nodes,
 * renders nodes on screen
 */


var SortableNodesManager = (function (position) {
    var nodes = [];
    var objectsElement = document.getElementById("box_wrapper");
    var OBJECT_OFFSET = 40;

    if (objectsElement === undefined){
        throw "no container found";
    }

    slideIn = function(){
        objectsElement.setAttribute("class", "slidein");
        objectsElement.innerHTML = generateHTML();
        setTimeout(function() {
            document.getElementById("sort").removeAttribute("class", "disabled");
        },1000);
    };

    /**
     * generate an html represents all the nodes
     * @returns {string}
     */
    function generateHTML(){
        var html = "";
        for (var i = 0 ; i < nodes.length ; i++){
            html += '<span id="'+nodes[i].getId() +'" style="left:' + i*OBJECT_OFFSET+'px;">'+nodes[i].getValue() + '</span>'
        }
        return html;
    }

    /**
     * pushed key value into nodes array
     * @param key
     * @param val
     */
    this.push = function(key, val){
        nodes.push (new SortableNode(key, val));
    };

    /**
     * gets a node from nodes array by key
     * @param key
     * @returns {*}
     */
    this.get = function(key){
        return nodes[key];
    };

    /**
     * size of array
     * @returns {Number}
     */
    this.size = function(){
        return nodes.length;
    };

    /**
     * pushes html into the container in the DOM
     */
    this.loadObjectsInContainer = function(){
        if ( objectsElement.innerHTML === ""){
            slideIn();
        }else{
            objectsElement.setAttribute("class","slideout");
            setTimeout(function(){
                objectsElement.innerHTML = "";
                objectsElement.removeAttribute("class","slideout");
                setTimeout(function() {
                  slideIn();
                },10);
            },1000)
        }
    };

    /**
     * swapping nodes and call each node to perform animation
     * @param a
     * @param b
     * @param time
     */
    this.swap = function(a, b, time){
        var aV = nodes[a].getValue();
        var bV = nodes[b].getValue();

        var position = nodes[b].getPosition();
        // x.swap();
        nodes[b].moveForward(nodes[a].getPosition(), time);
        nodes[a].moveBackward(position, time);

        var temp = nodes[a];
        nodes[a] = nodes[b];
        nodes[b] = temp;
    };




});