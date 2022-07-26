function checkWin(){
    let roundWon = false, winner;
    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const a = options[condition[0]];
        const b = options[condition[1]];
        const c = options[condition[2]];
  
        if(a == "" || b == "" || c == ""){
            continue;
        }
        if(a == b && b == c){
            roundWon = true;
            winner = a;
            break;
        }
    }
    if(roundWon == true){
        statusText.textContent = `${winner} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
  }
  
  function oTurn(){
    let max = optionsLeft.length - 1;
    let num = Math.random() * max;
    num = Math.floor(num);
    return num;
  }
  
  const cells = document.querySelectorAll(".cells");
  const statusText = document.querySelector("#text");
  const restartBtn = document.querySelector("#restart");
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let options = ["", "", "", "", "", "", "", "", ""];
  let optionsLeft = [0,1,2,3,4,5,6,7,8,9]; 
  let currentPlayer = "X";
  let running = true;
  
  document.addEventListener("click", function(e){
    if(e.target.parentElement.id == "container" && e.target.innerHTML == "" && running == true){
        let xIndex = e.target.id;
        options[xIndex] = "X";
        e.target.innerHTML = "X";
  
        let index = optionsLeft.indexOf(+xIndex);
        optionsLeft.splice(index, 1);
        
        checkWin();
  
        if(running){
            let oIndex = optionsLeft[oTurn()];
            options[oIndex] = "O";
            document.getElementById(oIndex).innerHTML = "O";
            
            index = optionsLeft.indexOf(+oIndex);
            optionsLeft.splice(index, 1);
            checkWin();
        }
    }
    if(e.target.id == "restart"){
        cells.forEach(cell => cell.textContent = "");
        options = ["", "", "", "", "", "", "", "", ""];
        optionsLeft = [0,1,2,3,4,5,6,7,8,9];
        statusText.textContent = ``;
        currentPlayer = "X";
        running = true;
    }
  });