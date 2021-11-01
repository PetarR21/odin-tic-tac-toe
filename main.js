const currentTurn = (() => {
    let value = 'X';

    const getValue = () => {
        return value;
    };

    const reset = () => {
        value = 'X';
    }

    const changeValue = () => {
        if (value === 'X') {
            value = 'O';
        } else {
            value = 'X';
        }
    }

    return { getValue, changeValue, reset };
})();

const gameBoard = (() => {
    let array = [];
    let result = '';
    let end = false;

    const initilaizeArray = () => {
        for (let i = 0; i < 9; i++) {
            array.push("");
        }
    };

    const clearArray = () => {
        for (let i = 0; i < 9; i++) {
            array.pop();
        }
        initilaizeArray();
    };

    const setArrayValue = (value, index) => {
        array[index] = value;
    };

    const isArrayFull = () => {
        for (let i = 0; i < 9; i++) {
            if (array[i] === '') {
                return false;
            }
        }

        return true;
    };

    const getArrayValue = (index) => {
        return array[index];
    }

    const getResult = () => {
        return result;
    }

    const resetResult = () => {
        result = '';
    };

    const checkResult = (value, index) => {
        if (checkWin(value, index)) {
            result = "win";
        } else if (isArrayFull()) {
            result = "draw";
        }

        return result;
    }

    const checkWin = (value, index) => {
        switch (Number(index)) {
            case 0:
                if ((array[1] === value && array[2] === value) || (array[3] === value && array[6] === value) ||
                    (array[4] === value && array[8] === value))
                    return true;
                break;
            case 1:
                if ((array[4] === value && array[7] === value) || (array[4] === value && array[7] === value))
                    return true;
                break;
            case 2:
                if ((array[0] === value && array[1] === value) || (array[5] === value && array[8] === value) ||
                    (array[4] === value && array[6] === value))
                    return true;
                break;
            case 3:
                if ((array[0] === value && array[6] === value) || (array[4] === value && array[5] === value))
                    return true;
                break;
            case 4:
                if ((array[0] === value && array[8] === value) || (array[1] === value && array[7] === value) ||
                    (array[2] === value && array[6] === value) || (array[3] === value && array[5] === value))
                    return true;
                break;
            case 5:
                if ((array[2] === value && array[8] === value) || (array[3] === value && array[4] === value))
                    return true;
                break;
            case 6:
                if ((array[0] === value && array[3] === value) || (array[2] === value && array[4] === value) ||
                    (array[7] === value && array[8] === value))
                    return true;
                break;
            case 7:
                if ((array[6] === value && array[8] === value) || (array[1] === value && array[4] === value))
                    return true;
                break;
            case 8:
                if ((array[6] === value && array[7] === value) || (array[0] === value && array[4] === value) ||
                    (array[2] === value && array[5] === value))
                    return true;
                break;
        }

        return false;
    }

    const getEnd = () => {
        return end;
    }

    const resetEnd = () => {
        end = false;
    }

    const endGame = () => {
        end = true;
    }

    return { setArrayValue, getArrayValue, clearArray, checkResult, getEnd, resetEnd, endGame, resetResult };

})();

const displayController = (() => {
    const cells = document.querySelectorAll('.cell');

    const getCells = () => {
        return cells;
    };

    const initilaizeTable = () => {
        cells.forEach(cell => cell.textContent = "");
    };

    const setDisplayValue = (value, index) => {
        document.querySelector(`.cell[dataID="${index}"]`).textContent = value;
    }

    const changeTurnText = () => {
        document.querySelector('#text-turn').textContent = currentTurn.getValue() + "'s";
    }

    const resetTurnText = () => {
        document.querySelector('#result-text').innerHTML = "Player<span id='text-turn'> X's </span>turn";
    }

    const setWinText = (value) => {
        document.querySelector('#result-text').innerHTML = `Player ${value} won`;
    }

    const setDrawText = () => {
        document.querySelector('#result-text').innerHTML = `It's a draw`;
    }

    return { setDisplayValue, getCells, initilaizeTable, changeTurnText, setWinText, setDrawText, resetTurnText };

})();

const game = (() => {
    /*Initialize array and table*/
    gameBoard.clearArray();
    displayController.initilaizeTable();

    /* Event listener on cells */
    displayController.getCells().forEach(cell => {
        cell.addEventListener('click', () => {

            const index = cell.attributes.dataId.value;

            if (gameBoard.getArrayValue(index) || gameBoard.getEnd()) {
                return;
            }

            const value = currentTurn.getValue();

            gameBoard.setArrayValue(value, index);
            displayController.setDisplayValue(value, index);
            currentTurn.changeValue();


            let result = gameBoard.checkResult(value, index);
            if (result === 'win') {
                displayController.setWinText(value);
                gameBoard.endGame();
            } else if (result === 'draw') {
                displayController.setDrawText();
                gameBoard.endGame();
            } else {
                displayController.changeTurnText();
            }
        });
    });

    document.querySelector('#btn-restart').addEventListener('click', () => {
        gameBoard.clearArray();
        displayController.initilaizeTable();
        currentTurn.reset();
        displayController.resetTurnText();
        gameBoard.resetEnd();
        gameBoard.resetResult();
    });


})();

