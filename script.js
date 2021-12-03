const selectBox = document.querySelector(".select-box"),
    selectXBtn = selectBox.querySelector(".playerX"),
    selectOBtn = selectBox.querySelector(".playerO"),
    playBoard = document.querySelector(".play-board"),
    allBox = document.querySelectorAll("section span"),
    players = document.querySelector(".players"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector(".btn");
let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";

let runBot = true;
let playerSign='x';

/* User click function */
function clickedBox(element) {
    playerSign = 'x';
    if (players.classList.contains("player")) {
        playerSign = 'O';
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    playBoard.style.pointerEvents = "none";
    element.style.pointerEvents = "none"; //Once user select any box then that box can't be selected again.

    console.log(playerSign);
    selectWinner();
    setTimeout(() => {
        bot(runBot);
    }, 2000);

}

/* Bot click function */

function bot(runbot) {
    if (runbot==true) {
        let array = [];
        playerSign = 'O';

        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) { //If span has no any children element
                array.push(i);
            }
        }

        let randomBox = array[Math.floor(Math.random() * array.length)];

        if (array.length > 0) {
            if (players.classList.contains("player")) {
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                players.classList.remove("active");
                playerSign = "x";
                allBox[randomBox].setAttribute("id", playerSign);
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
        }

        console.log(playerSign);
        playBoard.style.pointerEvents = "auto";
        allBox[randomBox].style.pointerEvents = "none"; //Once user select any box then that box can't be selected again.
    }
}

/* let work on select the winner */
function getId(idName) {
    return document.querySelector('.box' + idName).id
}

function checkThreeId(val1, val2, val3, sign) {
    if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
        return true;
    }
}
function selectWinner() {
    let combinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [7, 5, 3], [1, 4, 7], [2, 5, 8], [3, 6, 9]];

    let ganador = false;

    for (let i = 0; i < combinations.length; i++) {
        if (checkThreeId(combinations[i][0], combinations[i][1], combinations[i][2], playerSign)) {
            console.log("Ganador:   ", playerSign);
            runBot = false;
            ganador = true;
            bot(runBot);
            setTimeout(() => {
                playBoard.classList.remove("show");
                playBoard.classList.add("hide");
                resultBox.classList.add("show");
            }, 700)

            wonText.innerHTML = `Player <p> ${playerSign} </p> won the game!`;
        }
    }

    if (ganador == false) {
        wonText.innerHTML = ` Match has been draw! `;
    }
}

replayBtn.onclick = () => {
    window.location.reload();
}

window.onload = () => {


    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXBtn.onclick = () => {
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
    }

    selectOBtn.onclick = () => {
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class", "players active player");
    }

}
