var score, roundScore, activePlayer;//global scope so any one can access it
var gamePlaying;//A state variable  simply tell us the condition of a system.

init();//all the things that happened before we can start to play will now be placed right into this init function.

document.querySelector(".btn-roll").addEventListener('click', function(){
    if(gamePlaying){//game variable to be true, game is playing.

        //1.Random number
     var dice = Math.floor(Math.random() * 6) +1;//'floor' is used to convert decimal number. In last we add 1 bcz we need number between 1 to 6.
      //we only need this variable in this scope, and not in the outside, so i used 'var dice'.

       //2.Display the result
     var diceDom = document.querySelector('.dice');
         diceDom.style.display = 'block';//dice will show
         diceDom.src = 'dice-' +dice + '.png';
 
      //3.Update the round score if the rolled number was not a 1
     if(dice !== 1){
         //Add score
          roundScore += dice; //roundScore = roundScore + dice
          document.querySelector('#current-' +activePlayer).textContent = roundScore;
        }
        else{
         //next player
          nextPlayer();
        }
    }    
});/*End RollDice button*/ 

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){//game variable to be true, game is playing.

        //add current score to global score
         scores[activePlayer] += roundScore;

        //update the user interface
         document.querySelector('#score-' +activePlayer).textContent = scores[activePlayer];
    
         //input in FinalScore box
         var input = document.querySelector('.final-score').value;//that value will be store what we input in this box
         var winningScore;
         if(input){//true, if any one put any value in input variable then that FinalScore will be store in input variable.
              winningScore = input;//swap the FinalScore
         }
         else{//false
             winningScore = 20;//if any one not put any value in input variable then winningScore (FinalScore) is by default 20.
         }
    
        //check if player won the game
     if(scores[activePlayer] >= winningScore){//when player1 or player2 's global scores will be greater then equal to FinalScore, then this player will be won that match
        document.querySelector('#name-' +activePlayer).textContent ='WINNER';
        document.querySelector('.dice').style.display = 'none';//after player win, dice will be hidden
        document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
        document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');

        gamePlaying = false;//After winner declare we need not to continue that game, so we have to stop it and disable the RollDice and Hold button
      }
     else{
        //next player
        nextPlayer(); //if i write this calling function inside else block then which player win first, this player again rolldice first
     }
    } 
});/*End Hold button*/



function nextPlayer(){

     //next player
     if(activePlayer === 0){
        activePlayer = 1;
    }
    else{
        activePlayer = 0;
    }
    roundScore = 0;//next player roundScore will start with 0.
    
    //whrn dice comes 1 then current player dice chance will be gone to next player and his current score will start from 0.
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';

    //classList, This property is useful to add, remove and toggle CSS classes on an element.
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //when dice will be 1 then it will not display and just swap to next player
    document.querySelector('.dice').style.display = "none";
};


// we also want to call init() function when we hit on our new game button.
document.querySelector('.btn-new').addEventListener('click', init);
                                                             //callback function 
    //I just want to tell this event listener that hey when someone clicks this button then please call the init() function for me.    

                              //OR                               
/*document.querySelector('.btn-new').addEventListener('click', function(){ //anonymous function 
    init();
});    
*/                                                    


function init(){
    scores =[0,0];//both global score start with 0 in beginning
    roundScore = 0;
    activePlayer = 0;//0 is first player and 1 is second player
    gamePlaying = true;//game variable to be true, game is playing.

    //the object that will give us access to the DOM is the document object.
   document.querySelector('.dice').style.display = "none";
   document.getElementById('score-0').textContent = '0';
   document.getElementById('score-1').textContent = '0';
   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';
   
   //after New Game button click all should be look normal like a new game start
   document.querySelector('#name-0').textContent ='Player 1';
   document.querySelector('#name-1').textContent ='Player 2';
   document.querySelector('.player-0-panel').classList.remove('winner');
   document.querySelector('.player-1-panel').classList.remove('winner');
   document.querySelector('.player-0-panel').classList.remove('active');
   document.querySelector('.player-1-panel').classList.remove('active');

   document.querySelector('.player-0-panel').classList.add('active');//active class first player
};





