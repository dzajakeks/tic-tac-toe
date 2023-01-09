const selectBox = document.querySelector(".select-box");
const selectBtnX = selectBox.querySelector(".player-options .playerX");
const selectBtnO = selectBox.querySelector(".player-options .playerO");

const playBoard = document.querySelector(".ttt-board");
const players = document.querySelector(".players");
const allBox = document.querySelectorAll("section span");

const resultBox = document.querySelector(".result-box");
const wonText = resultBox.querySelector(".result-text");
const replayBtn = resultBox.querySelector("button");

let playerSign = "X"; 
let runCompBot = true;
let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle"

// END OF SELECTING DOM

window.onload = ()=>{
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "tileClicked(this)");
    }
}

replayBtn.onclick = () => {
    window.location.reload();
}

selectBtnX.onclick = () =>{
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}

selectBtnO.onclick = () =>{ 
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
}


function tileClicked(element){
    if(players.classList.contains("player")){
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        element.setAttribute("id", playerSign);
    }
    else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    selectWinner();
    playBoard.style.pointerEvents = "none";
    element.style.pointerEvents = "none";

    let BotThinkTime = (Math.random() * 1000).toFixed();
    setTimeout(()=>{
        ComputerPlayer(runCompBot);
    }, BotThinkTime);
}

function ComputerPlayer() {
    let arr = []
    if(runCompBot) {
        playerSign = 'O';
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0) {
                arr.push(i)
            }
        }

        let titleRandom = arr[Math.floor(Math.random() * arr.length)]
        if(arr.length > 0) {
            if(players.classList.contains('player')) {
                playerSign = 'X'
                players.classList.add('active')
                allBox[titleRandom].innerHTML = `<i class="${playerXIcon}"></i>`;
                allBox[titleRandom].setAttribute('id', playerSign);
            } else {
                allBox[titleRandom].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove('active')
                allBox[titleRandom].setAttribute('id', playerSign);
            }
            selectWinner()
        }
        allBox[titleRandom].style.pointerEvents = 'none';
        playBoard.style.pointerEvents = 'auto';
        playerSign = 'X'
    }
}


function validationId(classname) {
    return document.querySelector('.tile' + classname).id;
}

function signIdTiles(value1, value2, value3, sign) {
    if(validationId(value1) == sign && validationId(value2) == sign && validationId(value3) == sign) {
        return true
    } else {
        return false
    }
}

function selectWinner() {
    if(signIdTiles(1,2,3,playerSign) || signIdTiles(4,5,6,playerSign) || signIdTiles(7,8,9,playerSign) || signIdTiles(1,4,7,playerSign) || signIdTiles(2,5,8,playerSign) || signIdTiles(3,6,9,playerSign) || signIdTiles(1,5,9,playerSign) || signIdTiles(3,5,7,playerSign)) {
        runCompBot = false;
        ComputerPlayer(runCompBot);

        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 900);
        wonText.innerHTML = `Player ${playerSign} won.`
    } else {
        if(validationId(1) != "" && validationId(2) != "" && validationId(3) != "" && validationId(4) != "" && validationId(5) != "" && validationId(6) != "" && validationId(7) != "" && validationId(8) != "" && validationId(9) != "") {
            runCompBot = false;
            ComputerPlayer(runCompBot);

            setTimeout(() => {
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 900);
            wonText.textContent = "Match is draw!";
        }
    }
}

