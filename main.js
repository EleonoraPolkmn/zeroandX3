document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const result = document.getElementById("result");
    const restartOptions = document.getElementById("restartOptions");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = '';
    let gameActive = true;

    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function startGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        cells.forEach(cell => cell.textContent = '');
        result.textContent = '';
        restartOptions.style.display = 'none';
        currentPlayer = Math.random() < 0.5 ? 'human' : 'computer';
        message.textContent = currentPlayer === 'human' ? 'Тебе повезло, ходи первым' : 'Повезёт в другой раз, компьютер ходит первым';

        if (currentPlayer === 'computer') {
            computerMove();
        }
    }

    function checkWinner() {
        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                result.textContent = board[a] === 'X' ? 'Победитель – человек!' : 'Победитель – компьютер!';
                restartOptions.style.display = 'block';
                return;
            }
        }

        if (!board.includes('')) {
            gameActive = false;
            result.textContent = 'Ничья!';
            restartOptions.style.display = 'block';
        }
    }

    function humanMove(index) {
        if (board[index] === '' && gameActive) {
            board[index] = 'X';
            cells[index].textContent = 'X';
            checkWinner();
            if (gameActive) {
                currentPlayer = 'computer';
                computerMove();
            }
        }
    }

    function computerMove() {
        if (gameActive) {
            let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
            let move = availableCells[Math.floor(Math.random() * availableCells.length)];
            board[move] = 'O';
            cells[move].textContent = 'O';
            checkWinner();
            if (gameActive) {
                currentPlayer = 'human';
            }
        }
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (currentPlayer === 'human') {
                humanMove(index);
            }
        });
    });

    yesBtn.addEventListener('click', startGame);
    noBtn.addEventListener('click', () => {
        message.textContent = 'Игра окончена. Спасибо за игру!';
        restartOptions.style.display = 'none';
    });

    startGame();
});
