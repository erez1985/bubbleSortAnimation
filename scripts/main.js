
var sortableNodesManager;
var array = [1,51,14,67,54,8,42,2,31,41,76,47,35,45];


/**
 * called by button click
 */
function draw(){
    document.getElementById("draw").setAttribute("class", "disabled");
    document.getElementById("complete_label").setAttribute("class","hidden");

    try{
        array = shuffle(array);
        sortableNodesManager = new SortableNodesManager();

        for (var i in array) {
            sortableNodesManager.push(i, array[i]);
        }
        sortableNodesManager.loadObjectsInContainer();

    }catch(e){
        console.log(e);
    }


}

function sort (){
    try {
        var sort = new BubbleSort(sortableNodesManager);
        sort.run();
        document.getElementById("sort").setAttribute("class", "disabled");
    }catch(e){
        console.log(e);
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



