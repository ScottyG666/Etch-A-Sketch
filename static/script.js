let grid = document.querySelector('.grid-container');
let sketchBoardIsActive = false;

create64By64Grid();

function create64By64Grid() {
    for (let i = 0 ; i < 16 ; i++){
        let nthDivRow = document.createElement('div');
        nthDivRow.classList.add('row-container');

        for(let j = 0 ; j < 16 ; j++) {
            let nthDivColumn = document.createElement('div');
            nthDivColumn.classList.add('grid-square');
            nthDivRow.appendChild(nthDivColumn);
        }

        grid.appendChild(nthDivRow);
    }
}



grid.addEventListener('click' , toggleChangingBoardColor);

function toggleChangingBoardColor() {
    if (sketchBoardIsActive) {
        setSketchBoardInactive();
    } else {
        setSketchBoardActive();
    }
}

function setSketchBoardInactive () {
    sketchBoardIsActive = false;
}

function setSketchBoardActive() {
    sketchBoardIsActive = true;
}