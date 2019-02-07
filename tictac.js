
//const GameBoard = () =>
//{
//
//};

const displayController = (() =>
{
    let currentPlayer = playerOne;
    let grids = document.querySelectorAll(".grid-item");
    let result = document.querySelector(".result");      
    const startBtn = document.querySelector("input[value='Start']");
    const gameBoard = document.getElementById('game-board');
    const resetBtn =  document.querySelector("input[value='Reset']");
    function playerClicks()
    {
        let once = {
            once : true
        };


        
       
        const playerDetails = document.querySelector(".playerDetails");
        console.log(result);
        /*Action to be performed when user clicks on each of grid in the game*/
       
            resetBtn.addEventListener('click',(e)=>{
            playerOne.playedGrids.length=0;
            playerTwo.playedGrids.length=0;
            grids.forEach(grid => grid.textContent="");
            playerDetails.classList.add("tableDisplay");
            startBtn.classList.remove("hide");
            gameBoard.classList.add("hide");
            gameBoard.classList.remove("active");
            resetBtn.classList.add("hide");
            resetBtn.classList.remove("active");
            result.textContent="";
            document.getElementById("player1").value="";
            document.getElementById("player2").value="";  
        })
     
        /*Action to be performed when user clicks on Start Button*/
        startBtn.addEventListener('click',(e)=>{
            if(document.getElementById("player1").value == "" || document.getElementById("player2").value =="")
            alert("Please enter both player names");
            else
            {
            gameBoard.classList.add("active");
            resetBtn.classList.add("active");
            startBtn.classList.add("hide");
            playerDetails.classList.remove("tableDisplay");
            playerDetails.classList.add("hide");
            grids.forEach(grid=>grid.addEventListener('click',play,once,{capture:false}));
            }
        })
     
    }

   
    /*Function to specify action to be done when someone clicks on grid*/
    function play(e)
    {
       
            this.textContent = currentPlayer.getChoice();
            currentPlayer.playedGrids.push(e.target.id);
               if(checkforwin(currentPlayer.playedGrids))
                {   
                    result.textContent = `${currentPlayer.getName()} Won`;     
                }
            changeCurrentPlayer(currentPlayer);  
                 
    }
   
    /*Function to change player after each click on Grid*/
    function changeCurrentPlayer(player)
    {
        if(player==playerOne)
        {
            currentPlayer = playerTwo; 
        }
        else if(player==playerTwo)
        {
            currentPlayer = playerOne;
        }
    }

    /*Function to check if someone has won the game*/
    function checkforwin(playedGrids)
    {
       
        let winningGrids = [[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,4,8],
		[2,4,6],
		[0,3,6],
		[1,4,7],
		[2,5,8]];
        for(let i=0;i<winningGrids.length;i++)
        {
            if(arrayContainsArray(winningGrids[i],playedGrids) == true)
            {
                grids.forEach(grid=>grid.removeEventListener('click',play,{capture:false}));
                return true;
            }
        }
        return false;
    }

    /*Function to check if all elements of array 1 are present in array 2*/
    function arrayContainsArray(array1,array2)
    {
       return array1.every(elem=>
        {
            let success = false;
            for(let i=0;i<array2.length;i++)
            {
                if(array2[i]==elem)
                    success=true;
            }
            return success;
        })
    }


return {playerClicks};
})


/*Factory function for Player*/
const Player = (playernumber,choice) =>
{
  const getName = () => document.getElementById(playernumber).value;
  const getChoice = () =>choice;
  let playedGrids = [];
  
  return {getName,getChoice,playedGrids};
};



const playerOne = Player("player1","x");
const playerTwo = Player("player2","o");

const d = displayController();

d.playerClicks();




