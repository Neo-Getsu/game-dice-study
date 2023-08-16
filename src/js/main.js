/* #########|-- ${DECLARATION DES VARIABLE} -- ########  */

//score
let globalScoreP1 =0, globalScoreP2=0, currentScoreP1=0, currentScoreP2=0;

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


/* #########|-- ${Class? } -- ########  */

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
        if(diceValue === 1){
            console.log(diceValue)
            this.currentScore = 0;
            this.active = false;
           if (this.id === 1){
               playerTwo.active = true
               activePlayerTwo.classList.add("active")
               activePlayerOne.classList.remove("active")
               currentOne.textContent = this.currentScore;
           }
           else {
               playerOne.active = true
               activePlayerOne.classList.add("active")
               activePlayerTwo.classList.remove("active")
               currentTwo.textContent = this.currentScore;
           }
        }
        else {
            this.currentScore += diceValue
            this.id === 1 ? currentOne.textContent = this.currentScore : currentTwo.textContent = this.currentScore;
        }
        return diceValue;
    }
    //Hold Score
    holdScore(){

    }

    resetPlayer() {
        this.currentScore = 0;
        this.globalScore = 0;
        this.active = false;
        currentOne.textContent = 0;
        currentTwo.textContent = 0;
    }
}


//Creation Joueur
const playerOne = new Player(1, "Player One");
const playerTwo = new Player(2, "Player Two");

/* #########|-- ${Function} -- ########  */








// Fonction pour choisir aléatoirement quel joueur commence
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
            break;
    }
    }


//fonction générer un nombre aléatoire entre 1&6
function randomizeDice (){
    let randomDice = Math.floor(Math.random() * (7-1)) +1  ;
    return randomDice
}












/* #########|-- ${Listeners} -- ########  */
//for start the game !
btnNewGame.addEventListener('click', () => {
    if(activePlayerOne.classList.contains("active")){
        activePlayerOne.classList.remove("active")
    }
    if(activePlayerTwo.classList.contains("active")){
        activePlayerTwo.classList.remove("active")
    }

    playerOne.resetPlayer()
    playerTwo.resetPlayer()
    chooseStartingPlayer()

})
btnRollDice.addEventListener('click', () => {
console.log(("btn rolls dice ok clicked"))
    if((!playerOne.active) && !playerTwo.active) {
       // En cas de non joueur selectionner.
    }
const activePlayer =  playerOne.active ? playerOne : playerTwo;
    const diceResult = activePlayer.rollDice()
    console.log("Dice Result " + diceResult)


})





