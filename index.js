let cards = []   //creates an empty array
let dealer_cards = []
let hasBlackJack = false;   
let isAlive = false;
let message = '';
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");  //Paragraph element is assigned to sumEl variable
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
let winEl = document.getElementById("win-el")
let dealerHandEl = document.getElementById("dealerhand-el")
let responseEl = document.getElementById("response-el")
let sum = 0;
let dealer_sum = 0;

//player object with key-value pairs
let player = {
name: "Tebogo",
bet: 50000,
}
    
playerEl.textContent = player.name + ": R" + player.bet

// Creates random numbers between 1 and 13.
function getRandomCard () {
    randomNumber = Math.floor(Math.random()*13) + 1   // Math.floor cuts off decimals
    if (randomNumber === 1) {   //For card 1, return 11
        return 11
    }
    else if (randomNumber >= 11 && randomNumber <= 13) {    //For cards 11, 12 and 13, return 10
        return 10
    }
    else {
        return randomNumber
    }
}

// Starts the game by generating two initial cards and getting their sum
function startGame() {    
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;    
    renderGame()        
    
}

//Gets two initial cards for the dealer
function showDealerHand () {   
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    dealer_cards = [firstCard, secondCard];
    dealer_sum = firstCard + secondCard;
    dealerHandEl.textContent = "Dealer sum: " + dealer_sum
    if (dealer_sum > 16) { //Checks if initial sum is less than, equal to or greater than 16
         messageEl.textContent = "Dealer stays with their hand";
         if (sum > dealer_sum) {
            winEl.textContent = "You have won: R" + 2*player.bet
            messageEl.textContent = "Congratulations. You have a higher hand than the dealer";
        } else if (sum < dealer_sum) {
            winEl.textContent = "You have lost: R" + player.bet 
            messageEl.textContent = "Sorry. You have a lower hand than the dealer";                
        } else if (dealer_sum === sum) {
            winEl.textContent = "You get your original bet back";
            messageEl.textContent = "You have exact same hand as the dealer"; 
        }
    } else if (dealer_sum <= 16) {
        messageEl.textContent = "Dealer must draw new card";
    }
    
}

//Deals new card for the dealer if their initial sum is less than 16.
function dealerNewCard() {    
    if (dealer_sum <= 16) {
        new_card = getRandomCard()
        dealer_sum += new_card; 
        dealer_cards.push(new_card)
        dealerHandEl.textContent = "Dealer sum: " + dealer_sum          
        if (dealer_sum > 21) {
            winEl.textContent = "You have won: R" + 2*player.bet
        } else if (sum > dealer_sum) {
            winEl.textContent = "You have won: R" + 2*player.bet
        } else if (sum < dealer_sum) {
            winEl.textContent = "You have lost: R" + player.bet 
            isAlive = false;                
        }  
        else if (dealer_sum === sum) {
            winEl.textContent = "You get your original bet back"; 
        }
           
    } else {
        if (dealer_sum > 21) {
            winEl.textContent = "You have won: R" + 2*player.bet
        } else if (sum > dealer_sum) {
            winEl.textContent = "You have won: R" + 2*player.bet
        } else if (sum < dealer_sum) {
            winEl.textContent = "You have lost: R" + player.bet 
            isAlive = false;                   
        } 
         else if (dealer_sum === sum) {
            winEl.textContent = "You get your original bet back"; 
        }
    }
    messageEl.textContent = '';
    
}

//Checks player's hand to determine ultimate game outcome and displays result
function renderGame () {
    cardsEl.textContent = "Cards: "
    if (sum < 21) {
         message = "Do you want to draw another card?";
    } 
    else if (sum === 21) {    
         hasBlackJack = true; 
         winEl.textContent = "You have won: R" + 0.5*player.bet
             if (hasBlackJack === true) {
                  message = "You have blackjack!";
                  }
    }
    else {
         isAlive = false
         winEl.textContent = "You have lost: R" + player.bet
         message = "You are out of the game";            
         }
         
    messageEl.textContent = message;
    sumEl.textContent = "Sum: " + sum;
    for (let i = 0; i < cards.length; i+=1) {
     cardsEl.textContent = cardsEl.textContent + cards[i] + " ";   
    }    
}

//Function that draws a new card if hand is less than 21 AND you are still in the game
function newCard () {   
    if (isAlive && sum != 21) {
       let card = getRandomCard(); 
       cardsEl.textContent = "Cards: " + '';   
       sum += card;   
       cards.push(card) //add new card to the cards array
       renderGame()      
    }    
}

//Resets the game if you are out of the game OR if you have blackjack
function newRound () {    
     if (!isAlive || hasBlackJack) {
          cardsEl.textContent = "Cards: " + '';   
          sumEl.textContent = "Sum: " + ''; 
          messageEl.textContent = "Lets start a new round";
          winEl.textContent = '';
          dealerHandEl.textContent = '';
     }   
}

