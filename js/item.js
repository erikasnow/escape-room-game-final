//change what item is selected in the inventory
function itemSelection(itemId){

}

//inspect the item 
//on inspect button
function inspect(itemId){

}

//inventory switch between char selections
//takes in array
function updateInventory(itemIds){

}

//add the item to the character inventory
function addToInventory(itemId){
    console.log("entered addToInventory");
    //put picture in the inventory
    var pic = itemId + '.jpg';
    var picElt = '<img src="' + pic + '" style:"width:5%;height:5%">';

    var cellsRow = document.getElementById("inventoryCells");
    var cells = cellsRow.getElementsByTagName("td");
    var emptyCell;

    for(let i = 0; i < cells; i++){
        if(cells[i].innerHTML == ''){
            console.log("found empty cell");
            emptyCell = cells[i];
            break;
        }
    }

    emptyCell.innerHTML = picElt;
    console.log("should have added picture to inventory");
}

