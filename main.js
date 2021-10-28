const currentTurn = (() => {
    let value = 'X';

    const getValue = () => {
        return value;
    };

    const changeValue = () => {
        if (value === 'X') {
            value = 'O';
        } else {
            value = 'X';
        }
    }

    return { getValue, changeValue };
})();

const gameBoard = (() => {
    let array = [];

    const initilaizeArray = (() => {
        for (let i = 0; i < 9; i++) {
            array.push("");
        }
    })();

    const setArrayValue = (value, index) => {
        array[index] = value;
    };

    const getArrayValue = (index) => {
        return array[index];
    }

    return { setArrayValue,getArrayValue };

})();

const displayController = (() => {
    const cells = document.querySelectorAll('.cell');

    const getCells = () => {
        return cells;
    };

    const initilaizeTable = (() => {
        cells.forEach(cell => cell.textContent = "");
    })();

    const setDisplayValue = (value, index) => {
        document.querySelector(`.cell[dataID="${index}"]`).textContent = value;
    }

    return { setDisplayValue, getCells };

})();

const game = (() => {

    displayController.getCells().forEach(cell => {
        cell.addEventListener('click', () => {

            const index = cell.attributes.dataId.value;
            
            if(gameBoard.getArrayValue(index) != ''){
                return;
            }
            

            const value = currentTurn.getValue();

            gameBoard.setArrayValue(value, index);
            displayController.setDisplayValue(value, index);
            currentTurn.changeValue();
        });
    });


})();

