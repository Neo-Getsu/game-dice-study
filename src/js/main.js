/* #########|-- ${DECLARATION DES VARIABLE} -- ########  */

//Btn game
const btnNewGame = document.querySelector(".newGameBtn");
const btnRollDice = document.querySelector('.rollDice');
const btnHoldScore = document.querySelector(".holdDice")
//Active players
const activePlayerOne = document.querySelector('.one')
const activePlayerTwo = document.querySelector('.two')
const players = [0, 1];
//Score Dom
const currentOne = document.querySelector(".current-one")
const currentTwo = document.querySelector(".current-two")
const globalOne = document.querySelector(".global-one")
const globalTwo = document.querySelector(".global-two")
const Dice = document.querySelector('.img-dice')

/* #########|-- ${Class } -- ########  */
class Player{
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.currentScore= 0;
        this.globalScore = 0;
        this.active = false
    }
    //Roll dice methode
    rollDice(){
    const diceValue =  randomizeDice()
    Dice.src = `img/dice-${diceValue}.svg`
        if(diceValue === 1){

            this.currentScore = 0;
            this.active = false;
            this.endTours()
        }
        else {
            this.currentScore += diceValue
            this.id === 1 ? currentOne.textContent = this.currentScore : currentTwo.textContent = this.currentScore;
        }
        return diceValue;
    }
    //Hold Score
    holdScore(){
        this.globalScore += this.currentScore;

        if (this.globalScore >=20){
            this.winningAlert()
            console.log("GG LA WIN")
            this.id === 1 ? globalOne.textContent = this.globalScore : globalTwo.textContent = this.globalScore;
        }
        else {
            this.currentScore = 0;
            this.active = false;
            this.endTours()
        }
        return this.globalScore
    }
    //Finish round
    endTours(){
        if (this.id === 1){
            playerTwo.active = true
            activePlayerTwo.classList.add("active")
            activePlayerOne.classList.remove("active")
            globalOne.textContent = this.globalScore
            currentOne.textContent = 0;


        }
        else {
            playerOne.active = true
            activePlayerOne.classList.add("active")
            activePlayerTwo.classList.remove("active")
            globalTwo.textContent = this.globalScore;
            currentTwo.textContent = 0;
        }

    }
    //reset stat players
    resetPlayer() {
        this.currentScore = 0;
        this.globalScore = 0;
        this.active = false;
        currentOne.textContent = 0;
        currentTwo.textContent = 0;
       globalOne.textContent = 0;
        globalTwo.textContent = 0;
    }
    // Showing alert
    winningAlert(){

        let x = document.createElement("div")

        x.innerHTML = `
           <div id='alertCustom' class="alertCustom">
           <h5> <span id="win-name">${this.name}</span> a gané !!!! </h5>
           <button class='newBtnTwo btn-game'>New Game</button>
         </div>
        `
       document.body.prepend(x)
        document.querySelector('.newBtnTwo').addEventListener('click', ()=> {
            domReset()
            x.remove()
            chooseStartingPlayer()
        })
    }
}

//Creation Joueur
const playerOne = new Player(1, "Player One");
const playerTwo = new Player(2, "Player Two");

/* #########|-- ${Function} -- ########  */

// Random Start Player
function chooseStartingPlayer() {
    const randomIndex = Math.floor(Math.random() * players.length);

    switch ( randomIndex) {
        case 0:
            activePlayerOne.classList.add("active")
            playerOne.active = true
            break;

        case 1:
            activePlayerTwo.classList.add("active")
            playerTwo.active = true
            break;

        default:
            console.log("ERROR")
            break;
    }
    }

//Random Dice value
function randomizeDice (){
    let randomDice = Math.floor(Math.random() * (7-1)) +1  ;
    return randomDice
}

//Dom Reset
function domReset(){
    if(activePlayerOne.classList.contains("active")){
        activePlayerOne.classList.remove("active")
    }
    if(activePlayerTwo.classList.contains("active")){
        activePlayerTwo.classList.remove("active")
    }

    playerOne.resetPlayer()
    playerTwo.resetPlayer()
}

/* #########|-- ${Listeners} -- ########  */
//Load Dom Element

document.addEventListener("DOMContentLoaded", (event)=> {
// Init Game
    btnNewGame.addEventListener('click', () => {
        domReset()
        playerOne.resetPlayer()
        playerTwo.resetPlayer()
        chooseStartingPlayer()

    })


//Roll the dice
    btnRollDice.addEventListener('click', () => {

        if((!playerOne.active) && !playerTwo.active) {
            alert("Vous devez cliquer sur New Game pour commencer la partie ! ")
        }
        else {
            const activePlayer =  playerOne.active ? playerOne : playerTwo;
            activePlayer.rollDice()
        }
    })


//Hold Score & next player
    btnHoldScore.addEventListener('click', () => {
        const activePlayer =  playerOne.active ? playerOne : playerTwo;
        activePlayer.holdScore()

    })

})








