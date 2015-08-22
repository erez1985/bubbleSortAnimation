/**
 * algorithm for bubble sort
 * @param nodesManager
 * @constructor
 */
var BubbleSort = function(nodesManager){


    var _current        = 0; //current position
    var _nodesManager   = nodesManager;
    var _total          = nodesManager.size();
    var _changed        = false;
    var _checkTimer     = 100; //wait ms each node check
    var _swapTimer      = 300; //wait ms each node swap
    var _timeout;


    function check(){
        if (_current < _total-1){
            _nodesManager.get(_current).check();
            _nodesManager.get(_current+1).check();
            if (_current > 0){
                _nodesManager.get(_current - 1 ).unCheck();
            }

            if(_nodesManager.get(_current).getValue() > _nodesManager.get(_current + 1).getValue()){
                _nodesManager.swap(_current, _current+1, _swapTimer);

                _changed = true;
                _nodesManager.get(_current+1).check();
                //_nodesManager.get(_current).unCheck();
                _timeout = setTimeout(check, _swapTimer)

            }else{
                _nodesManager.get(_current).unCheck();
                _timeout = setTimeout(check, _checkTimer)
            }

            _current++;
        }else{
            if (!_changed){
                _nodesManager.get(_current).sorted();
                clearTimeout(_timeout);
                document.getElementById("complete_label").removeAttribute("class","hidden");
                document.getElementById("draw").removeAttribute("class", "disabled");
            }else{

                _total--;
                _nodesManager.get(_current-1).unCheck();
                _nodesManager.get(_current).unCheck();
                _nodesManager.get(_current).sorted();
                _current = 0;
                _changed = false;
                _timeout = setTimeout(check, _checkTimer)
            }
        }
    }

    /**
     * starts the bubble sort here
     */
    this.run = function() {

        _timeout = setTimeout(check, _checkTimer);


    }


};