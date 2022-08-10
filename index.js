
let buttons = ""
const buttonEl = document.getElementById("game-area")
const player1El = document.getElementById("player-1")
const player2El = document.getElementById("player-2")
const h1draw = document.getElementById("draw")
console.log(buttonEl)
let game = {
    player1:{
        active:false,
        winner:false
    },
    player2:{
        active:false,
        winner:false
    },
    currentGame:{
        isPlaying:false
    }
}
let positions = {
    x:[],
    o:[]
}
for(let i=1;i<=9;i++)
{
    buttons += `<button class="buttons" id="sq-${i}" onClick="play(${i})"></button>`
}
console.log(buttons)
buttonEl.innerHTML = buttons

function play(sq)
{   
    
    if(game.currentGame.isPlaying === true)
    {

        let buttonId = document.getElementById(`sq-${sq}`)
        if(game.player1.active === true && buttonId.textContent === "")
        {
            buttonId.textContent = "X"
            game.player1.active = false
            game.player2.active = true
            positions.x.push(sq)
            verifyWin(positions.x , "X")
            
        }
        else if(game.player2.active === true && buttonId.textContent === "")
        {
            buttonId.textContent = "O"
            game.player1.active = true
            game.player2.active = false
            positions.o.push(sq)
            verifyWin(positions.o , "O")
        }

    }

    verifyDraw()
    console.log(positions)
}

function startGame(){
    game.currentGame.isPlaying = true
    game.player1.active = true;
}
function resetGame(){

    for(let i = 1 ; i <= 9 ; i++)
    {
        let buttonId = document.getElementById(`sq-${i}`)
        buttonId.textContent = ""
    }
    positions = {
        x:[],
        o:[]
    }
    game = {
        player1:{
            active:false,
            winner:false
        },
        player2:{
            active:false,
            winner:false
        },
        currentGame:{
            isPlaying:false
        }
    }
    player1El.textContent = "Player 1 : X " 
    player2El.textContent = "Player 2 : O " 
    player1El.style.color = "black"
    player2El.style.color = "black"
    h1draw.textContent = ""
    game.currentGame.isPlaying = true
    game.player1.active = true;
}

function verifyWin(currentChoice , choice)
{   
    if(game.currentGame.isPlaying === true)

    {   
        currentChoice.sort(function(a, b){return a-b})
        console.log("after sort")
       
        for(let i = 0 ; i < currentChoice.length; i++)
        {    //Verify if it's a HORIZONTAL line
            if(currentChoice[i] + 1 === currentChoice[i+1])
            {
                if(currentChoice[i+1] + 1 === currentChoice[i+2] && currentChoice[i+2] % 3 === 0)
                {
                    console.log(`${choice} is a Horizontal line`)
                    {
                        switch(choice){
                            case "X" : player1El.textContent += "WON"
                            player1El.style.color = "green"
                            break;
                            case "O" : player2El.textContent += "Won"
                            player2El.style.color = "green"
                            break;
                        }
                        game.currentGame.isPlaying = false
                    }
                }
            }

            for(let j = i+1 ; j < currentChoice.length ; j++)
            {   //Verifiy if it's a DIAGONAL line
                if(currentChoice[i] === currentChoice[j] - 4)
                {
                    for(let k = j+1 ; k < currentChoice.length ; k++)
                    {
                        if(currentChoice[j] === currentChoice[k] - 4)
                        {
                            console.log(`${choice} is Diagonal Line`)
                            switch(choice){
                                case "X" : player1El.textContent += "WON"
                                player1El.style.color = "green"
                                break;
                                case "O" : player2El.textContent += "Won"
                                player2El.style.color = "green"
                                break;
                            }
                            game.currentGame.isPlaying = false
                        }
                    }

                }

                else if(currentChoice[i] === currentChoice[j] - 2)
                {
                    for(let k = j+1 ; k < currentChoice.length ; k++)
                    {
                        if(currentChoice[j] === currentChoice[k] - 2 && currentChoice[k] === 7)
                        {
                            console.log(`${choice} is Diagonal Line`)
                            switch(choice){
                                case "X" : player1El.textContent += "WON"
                                player1El.style.color = "green"
                                break;
                                case "O" : player2El.textContent += "Won"
                                player2El.style.color = "green"
                                break;
                            }
                            game.currentGame.isPlaying = false
                        }
                    }
                }
            //Verify if it's a VERTICAL line
                if(currentChoice[i] === currentChoice[j] - 3)
                {
                    for(let k = j+1 ; k < currentChoice.length ; k++)
                    {
                        if(currentChoice[j] === currentChoice[k] - 3)
                        {
                            console.log(`${choice} is a Vertical Line`)
                            switch(choice){
                                case "X" : player1El.textContent += "WON"
                                player1El.style.color = "green"
                                break;
                                case "O" : player2El.textContent += "Won"
                                player2El.style.color = "green"
                                break;
                            }
                            game.currentGame.isPlaying = false
                        }
                    }
                }

            }


        }
    }
}

function verifyDraw(){
   

    if(positions.x.length === 5 && positions.o.length === 4 || positions.x.length === 4 && positions.o.length === 5 )
    {
        game.currentGame.isPlaying = false

        h1draw.textContent = "DRAW"
    }
}