/* #########|-- ${DECLARATION DES VARIABLE} -- ########  */

//Btn game
const btnNewGame = document.querySelector(".newGameBtn");
const btnRollDice = document.querySelector('.rollDice');
let playerNamesCustom = []

const p1Fields= document.querySelectorAll(".playerName-FIELDS")[0]
const p2Fields = document.querySelectorAll(".playerName-FIELDS")[1]

const btnP1Name = document.querySelectorAll(".playerName-BTN")[0]
const btnP2Name = document.querySelectorAll(".playerName-BTN")[1]

const btnHoldScore = document.querySelector(".holdDice")
const btnToSafety = [btnHoldScore, btnRollDice]
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

/**
 * Classe player avec plusieurs propriété & methode
 * @constuctor {id, name, currentScore, globalScore, active}
 * @param {number} id - Id du playler
 * @methods RollDice - rouler le dé
 * @methods HoldScore - sauvegarder le score
 * @methods EndTours - Finir le tour & passer au joueur suivant
 * @methods resetPlayer - Reset les scores des joueurs
 *
 */
class Player{
    constructor(id) {
        this.id = id;
        this.name = "player";
        this.currentScore= 0;
        this.globalScore = 0;
        this.active = false
    }
    //Roll dice methode
    rollDice(){
        const diceValue =  randomizeDice()
        Dice.src = `img/dice-${diceValue}.svg`
        if(diceValue === 1){
            const notif = document.createElement("div");
            notif.classList.add("notification");
            document.body.appendChild(notif)
            showMessageNotification(notif,`Vous avez fait le score: 1 -> Vous perdez , c'est au joueur suivant de jouer. `)
            //setTimeout(() => notif.remove(), 5000)
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

        if (this.globalScore >=100){
            this.winningAlert()
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

        const winMessage = document.createElement("div")


        winMessage.innerHTML = `
           <div id="alertCustom">
            <span id="win-name">${this.name}</span> a gané !!!!  
           <button class='newBtnTwo btn-game opac'>New Game</button>
         </div>
        `
        document.body.appendChild(winMessage)


        lockUnlock(btnToSafety, 'lock')
        document.querySelector('.newBtnTwo').addEventListener('click', ()=> {
            domReset()
            winMessage.remove()
            chooseStartingPlayer()
        })
    }
}
const playerOne = new Player(1);
const playerTwo = new Player(2);


/**
 * Assigner les pseudo dans le tableau & le dom
 * @param fields - L'input du pseudo
 */
const assignNames = (fields) => {
    if(fields.classList.contains("one")){
        fields.innerText = playerNamesCustom[0].toUpperCase()
        playerOne.name = playerNamesCustom[0]
    }

    else if (fields.classList.contains("two")){
        fields.innerText = playerNamesCustom[1].toUpperCase()
        playerTwo.name = playerNamesCustom[1]

    }


}

/* #########|-- ${Class } -- ########  */





//Creation Joueur


/* #########|-- ${Function} -- ########  */


/**
 * Choisir le player aléatoirement (toggle les classe active nécessaire)
 *
 *
 */
function chooseStartingPlayer() {
    const randomIndex = Math.floor(Math.random() * players.length);
    lockUnlock(btnToSafety, 'unlock')
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

/**
 * Lance le dé pour avoir une valeur aléatoire
 * @returns {number}
 */
function randomizeDice (){
    let randomDice = Math.floor(Math.random() * (7-1)) +1  ;
    return randomDice
}

/**
 * Sert a reset les element du dom & reset les score des joueurs.
 *
 */
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

/**
 * Permet de desactiver/reactiver certain boutton.
 * @param {Array} btnSafety - tableaau de button
 * @param {string} action - s'il faut lock ou unlock
 */
const lockUnlock = (btnSafety, action) => {

    if(action === 'lock'){
        btnSafety.forEach((b)=> {
            b.style.pointerEvents="none";

            b.style.opacity = "0.5"
        })
    }   else {
        btnSafety.forEach((b)=> {
            b.style.pointerEvents="auto";

            b.style.opacity = "1"
        })
    }

}

/**
 *
 * @param {Object} notif - La div créer pour afficher la notif
 * @param {string} message - Le message a envoyer pour la notif
 */
const showMessageNotification = (notif, message) => {
    notif.innerText = message;
    notif.style.opacity = 1;

    setTimeout(()=> {
        notif.remove()
    }, 4000)
}
/* #########|-- ${Listeners} -- ########  */
//Load Dom Element

document.addEventListener("DOMContentLoaded", (event)=> {

    console.log("le dom est chargé")
    btnP1Name.addEventListener("click", (e) => {
        if (playerNamesCustom.length >0) return
        e.preventDefault()
        playerNamesCustom.push(p1Fields.value)
        console.log('player1')
        console.log(playerNamesCustom[0])
        assignNames(document.querySelector("#P1"))
        p1Fields.value = ""
        p1Fields.style.display = "none"
        btnP1Name.style.display = "none"

    })
    btnP2Name.addEventListener("click", (e) => {
        e.preventDefault()
        if (playerNamesCustom.length === 1) {
            playerNamesCustom.push(p2Fields.value)
            assignNames(document.querySelector("#P2"))
            p2Fields.value = ""
            p2Fields.style.display = "none"
            btnP2Name.style.display = "none"
        }
        else return alert('Validez le joueur 1 en premier. (recharger la page)')

    })
// Init Game
    btnNewGame.addEventListener('click', () => {
        if(playerNamesCustom.length !== 2) return alert("Indiquez les deux pseudo pour demarrer la partie (recharger la page)")
        domReset()
        playerOne.resetPlayer()
        playerTwo.resetPlayer()
        chooseStartingPlayer()

    })


    /**
     * Event listener du bouton pour lancer le dés
     */
    btnRollDice.addEventListener('click', () => {


        if((!playerOne.active) && !playerTwo.active) {
            alert("Vous devez cliquer sur New Game pour commencer la partie ! ")
        }
        else {
            const activePlayer =  playerOne.active ? playerOne : playerTwo;
            activePlayer.rollDice()
        }
    })


    /**
     * Event listener du bouton pour sauvegarder le score
     */
    btnHoldScore.addEventListener('click', () => {
        const activePlayer =  playerOne.active ? playerOne : playerTwo;
        activePlayer.holdScore()

    })

})










