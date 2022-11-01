const gridContainer = document.querySelector('.right-column');
const clearButton = document.querySelector('.clear-board');
const slider = document.getElementById("myRange");

let sketchBoardIsActive = false;
let currentMode = 'black'

createGrid(16);
makeColorBoardChangingDynamic();





/*          RESET BOARD BUTTON STARTS           */
clearButton.addEventListener('click', buttonFunction)

function buttonFunction() {
    let grid = document.querySelector('.grid-container');
    grid.remove();
    createGrid(slider.value);
}
/*          RESET BOARD BUTTON ENDS           */


/*      FUNCTIONS FOR CREATING THE GRID     */

function createGrid(size) {
    let grid = document.createElement('div');
    grid.classList.add('grid-container' , 'bordered');
    grid.addEventListener('click', activateGridSquares);

    for (let i = 0 ; i < size ; i++){
        let nthDivRow = createRowContainerDiv();
        for(let j = 0 ; j < size ; j++) {
            let nthDivColumn = addRoundedCornerIfNecessary(size,i,j, createGridColumn());
            nthDivRow.appendChild(nthDivColumn);
        }
        grid.appendChild(nthDivRow);
    }
    gridContainer.appendChild(grid);


    if (sketchBoardIsActive) {    
        let squares = document.querySelectorAll('.grid-square');
        squares.forEach( (square) => {
            square.addEventListener('mouseover', stuff);
        });
    }

    //  assigns the value of the slider to be displayed &&
    //change dynamically
    var output = document.getElementById("demo");
    output.innerHTML = `${slider.value} X ${slider.value}`; // Display the default slider value
    slider.oninput = function() {
    output.innerHTML =  `${this.value} X ${this.value}`;
    }
}

function createRowContainerDiv() {
    let nthDivRow = document.createElement('div');
    nthDivRow.classList.add('row-container');
    return nthDivRow
}

function createGridColumn() {
    let nthDivColumn = document.createElement('div');
    nthDivColumn.classList.add('grid-square');

    return nthDivColumn;
    
}


/**
 *          This method is purely aesthetic. The border around the grid is rounded.
 *      I wanted to make the corners rounded in the top-left, top-right, bottom-left,
 *      and bottom-right so they were not sharp and invading the border area.
 */
function addRoundedCornerIfNecessary (widthAndHeightOfGrid ,rowIndex, columnIndex, gridColumnElement) {
    if (rowIndex === 0 && columnIndex === 0) {
        gridColumnElement.classList.add('rounded-top-left');
    } else if (rowIndex === 0 && columnIndex === widthAndHeightOfGrid - 1) {
        gridColumnElement.classList.add('rounded-top-right');
    } else if (rowIndex === widthAndHeightOfGrid - 1 && columnIndex === 0) {
        gridColumnElement.classList.add('rounded-bottom-left');
    } else if (rowIndex === widthAndHeightOfGrid - 1 && columnIndex === widthAndHeightOfGrid - 1) {
        gridColumnElement.classList.add('rounded-bottom-right');
    }
    return gridColumnElement;
}

function activateGridSquares() {

    let squares = document.querySelectorAll('.grid-square');


    if( !sketchBoardIsActive) {
        squares.forEach( (square) => {
            square.addEventListener('mouseover', stuff);
        });
        sketchBoardIsActive = true;
    } else {
        squares.forEach( (square) => {
            square.removeEventListener('mouseover', stuff);
        });
        sketchBoardIsActive = false;
    }

}

function stuff () {
    const baseColor = 252;
    const deficient = 3;
    const decidingSlider = Math.floor(Math.random() *251) + 1;

    if (currentMode === 'black' || currentMode === 'white') {
        this.setAttribute('style' , `background-color: ${currentMode}; `);
    } else if (currentMode === 'warm'){
        if (decidingSlider % 2) {
            this.setAttribute('style' , `background-color: rgb(${baseColor},${deficient},${decidingSlider})`)
        } else {
            this.setAttribute('style' , `background-color: rgb(${baseColor},${decidingSlider},${deficient})`)
        }
    } else if (currentMode === 'cool'){
        if (decidingSlider % 2) {
            this.setAttribute('style' , `background-color: rgb(${deficient},${decidingSlider},${baseColor})`)
        } else {
            this.setAttribute('style' , `background-color: rgb(${deficient},${baseColor},${decidingSlider})`)
        }
    } else if(currentMode === 'darken') {

    }
}


/*          BEGINNING ADDING MORE DYNAMIC COLOR OPTIONS     */
function makeColorBoardChangingDynamic() {
    const blackMode = document.querySelector('.black');
    const whiteMode = document.querySelector('.white');
    const warmMode = document.querySelector('.warm');
    const coolMode = document.querySelector('.cool');

    blackMode.addEventListener('click', () => {
        currentMode = 'black';
    })

    whiteMode.addEventListener('click', () => {
        currentMode = 'white';
    })

    warmMode.addEventListener('click', () => {
        currentMode = 'warm';
    })

    coolMode.addEventListener('click', () => {
        currentMode = 'cool';
    })

    /*
    
    //const darkMode = document.querySelector('.darken');
    darkMode.addEventListener('click' , () => {
        currentMode = 'darken';
    })
*/

}

/*          END ADDING MORE DYNAMIC COLOR OPTIONS     */


/*          BEGINNING DROPDOWN MENU FUNCTIONALITY       */

// Get all the dropdown from document
document.querySelectorAll('.dropdown-toggle').forEach(dropDownFunc);


// Dropdown Open and Close function
function dropDownFunc(dropDown) {
    console.log(dropDown.classList.contains('click-dropdown'));

    if(dropDown.classList.contains('click-dropdown') === true){
        dropDown.addEventListener('click', function (e) {
            e.preventDefault();        
    
            if (this.nextElementSibling.classList.contains('dropdown-active') === true) {
                // Close the clicked dropdown
                this.parentElement.classList.remove('dropdown-open');
                this.nextElementSibling.classList.remove('dropdown-active');
    
            } else {
                // Close the opend dropdown
                closeDropdown();
    
                // add the open and active class(Opening the DropDown)
                this.parentElement.classList.add('dropdown-open');
                this.nextElementSibling.classList.add('dropdown-active');
            }
        });
    }

    if(dropDown.classList.contains('hover-dropdown') === true){

        dropDown.onmouseover  =  dropDown.onmouseout = dropdownHover;

        function dropdownHover(e){
            if(e.type == 'mouseover'){
                // Close the opend dropdown
                closeDropdown();

                // add the open and active class(Opening the DropDown)
                this.parentElement.classList.add('dropdown-open');
                this.nextElementSibling.classList.add('dropdown-active');
                
            }

             if(e.type == 'mouseout'){
                 // close the dropdown after user leave the list
                e.target.nextElementSibling.onmouseleave = closeDropdown;
            }
        }
    }

};

/*          BEGINNING DROPDOWN MENU FUNCTIONALITY       */
