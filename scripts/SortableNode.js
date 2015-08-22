
var SortableNode = function(id, value){

    var _id = "pos_" + id;
    var _value = value;
    var _element;


    var getElement = function() {
        if (_element === undefined) {
            _element = document.getElementById(_id);
        }
        return _element;
    };


    this.check = function(){
        getElement().setAttribute("class", "checked");
    };

    this.unCheck = function(){
        getElement().removeAttribute("class", "checked");
    };

    this.getPosition = function(){
        return {
            "left"  : parseInt(getElement().style.left),
            "top"   : parseInt(getElement().style.top)
        };
    };

    var round = function(left){
        return left % 40 > 20 ?   left + (40 - left % 40) : left - left % 40;
    };

    /**
     *
     */
    var animate = function(position, direction, timeToAnimate){
        var interval;
        var leftStep        = direction * -1;
        var top             = 0;
        var topLimit        = 25;
        var left            = parseInt(getElement().style.left);
        var frame           = timeToAnimate/Math.abs(position.left-left); // how many frames to move
        var howManyFrames   = timeToAnimate/frame;                        // how many frames for the interval
        var tStep = topLimit / (howManyFrames / 2 ) * direction ;         // size of step based on frames amount

        var move = function(){
            left += leftStep;
            top += tStep;

            getElement().style.top = top + "px";
            getElement().style.left = left + "px";
            if (Math.abs(top) >= topLimit){
                tStep *= -1;
            }
            if (position.left == left){
                clearInterval(interval);
                getElement().style.top = "0px";
                getElement().style.left= round(position.left) + "px";
            }
        };
        interval = setInterval(move,frame);
    };

    /**
     *
     * @returns {string}
     */
    this.getId = function(){
        return _id;
    };

    /**
     * marks element as sorted
     */
    this.sorted = function(){
        getElement().setAttribute("class", "sorted")
    };

    /**
     * get the value of the node
     */
    this.getValue = function(){
        return _value;
    };

    /**
     * moving element to position
     * @param position - object {left: <number>, top: <number>}
     */
    this.moveForward = function(position, timeToAnimate){
        animate(position, 1, timeToAnimate);
    };

    /**
     * moving element to position
     * @param position - object {left: <number>, top: <number>}
     */
    this.moveBackward = function(position, timeToAnimate){
        animate(position, -1, timeToAnimate);
    };


};