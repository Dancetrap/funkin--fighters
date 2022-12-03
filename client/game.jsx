const helper = require('./helper.js');
const premium = require('./premium.js');
let csrfToken;
let accounts;

let player;
let opponent;

let playerTeam;
let opposingTeam;

let ai = false;

// game variables
const playerAlive = [];
const playerDead = [];
const opponentAlive = [];
const opponentDead = [];

let startGame = false;

let pName, oName;

const SelectGame = (props) => {

    // console.log(props.team);

    if(props.team.length !== 20)
    {
        return (
            <div className="characterList">
                <h3 className="emptyDomo">You need a team of 20 players in order to participate</h3>
            </div>
        );
    }

    let anotherPlayer = '';

    // This will be commented out if I cannot figure out how to fix this. I'll probably ask Austin on Monday
    // if(accounts.accounts.length !== 0) anotherPlayer = <button type='exist' onClick={otherPlayer}>Play against Another Player</button>;

    return(
        <div className="characterList">
            {/* {characters} */}
            {/* <h3 className="emptyDomo">You are qualified</h3> */}
            <div key={"gameMenu"} id="gameMenu" >
                {/* <form action="/ai"></form> */}
                {/* <form action="/existing"></form> */}
                <button type='ai' onClick={aiPlayer} >Play against AI</button>
                {anotherPlayer}
            </div>
        </div>
    );
}

const SelectTeam = (props) => {
    let content = [];
    let type;

    for (let i = 0; i < 20; i++)
    {
        const imageForm = <form id={"characterSlot" + i} action="/remove" method="POST" className="d-sides" key={"p"+i} >
            <input type="image" height="50" width="50" src="/assets/img/150.png" className="player" id={"p"+i} disabled />
            {/* <input id="_id" type="hidden" name="_id" value={chr._id} /> */}
            <input id="_csrf" type="hidden" name="_csrf" value={csrfToken} />
            </form>  
        content.push(imageForm);
    }
    let oppContent = [];
    for (let i = 0; i < 20; i++)
    {
        const imageForm = <form id={"characterSlot" + i} action="/remove" method="POST" className="d-sides" key={"o"+i} >
            <input type="image" height="50" width="50" src="/assets/img/150.png" className="opponent" id={"o"+i} disabled />
            {/* <input id="_id" type="hidden" name="_id" value={chr._id} /> */}
            <input id="_csrf" type="hidden" name="_csrf" value={csrfToken} />
            </form>  
        oppContent.push(imageForm);
    }

    if(ai) type = <button type='exist' onClick={aiPlayer}>Find Another Team</button>;
    else type = <button type='exist' onClick={otherPlayer}>Find Another Team</button>;
    
    return ( 
        <div id="teams">
            <div id="twoteams">
        <div id="teamPlayer">
        <h2 id='pName'></h2>
        <div id="teamP">
            {content}
        </div>    
        </div>
        <h3 id='vs'>vs.</h3>
        <div id="teamOpponent">
        <h2 id='oName'></h2>
        <div id="teamO">
            {oppContent}
        </div>
        </div>
        </div>
        <div id="buttons">
            {type}
            <button type='exist' onClick={gameStart}>Play Game</button>
        </div>
    </div>
    );
}

const Game = (props) => {
    // props.player
    // props.opponent

    // if character.flip is true, transform: scaleY(-1);

    // document.addEventListener('keydown', function(event) {
    // if(event.keyCode == 37) {
        // alert('Left was pressed');
    // }
    // else if(event.keyCode == 39) {
        // alert('Right was pressed');
    // }

    // Space is 32

    // Lerp function, lerp(current number, new number, 1)
// });

    return ( <div id="game">
        <div id="battle">
        <div id="player">
            <h3 id="remainingPlayers">Players Left: </h3>
            <h3 id="playerCharName"></h3>
            <img src="" alt="player" id="yourGuy" />
            <h3 id="yourNumber"></h3>
        </div>
        <h3>vs.</h3>
        <div id="opponent">
            <h3 id="remainingOpponents">Players Left: </h3>
            <h3 id="opponentCharName"></h3>
            <img src="" alt="opponent" id="theirGuy" />
            <h3 id="theirNumber"></h3>
        </div>
        </div>
        <h3 id="roll">Turn</h3>
        <button type='exist' id='space' onClick={yourRoll} >Roll</button>
    </div> );
}

const Winner = (props) => {

    let content = [];
    for (let i = 0; i < 20; i++)
    {
        const image = <img src='' alt='winner' height="100px" key={`${i}won`} id={'y'+i} ></img>
        content.push(image);
    }

    let message = '';
    if(props.message)
    {
        message = "You Win!";
    }
    else
    {
        message = "You Lose!";
    }

    return (<div id='final'>
        <h2>{message}</h2>
        <div id='winners'>
            {content}
        </div>
        <button id="tryagain" onClick={tryAgain}> Try Again </button>
        </div>);
}

const aiPlayer = async () => {

    const other = await fetch(`/random`);
    opponent = await other.json();
    // console.log(opponent.team);
    ai = true;
    await loadOpposingTeam(player, opponent, "Bot");  

}

let oUsername;

const otherPlayer = async () => {
    const o = Math.floor(Math.random() * accounts.accounts.length);
    
    const other = await fetch(`/theirTeam?team=${accounts.accounts[o].owner}`);
    oUsername = accounts.accounts[o].owner;
    opponent = await other.json();
    // console.log(opponent);
    // await loadOpposingTeam(player, opponent.team);
    await loadOpposingTeam(player, opponent);
  
}

const loadOpposingTeam = async (p,o,b) => {
    // const o = Math.floor(Math.random() * accounts.accounts.length);

    // const other = await fetch(`/theirTeam?team=${accounts.accounts[o].owner}`);
    // opponent = await other.json();

    // await preGame(player.team[0].team, opponent.team.team);

    startGame = false;
    playerTurn = null;
    opponentTurn = null;

    ReactDOM.render(
        <SelectTeam csrf={csrfToken} />,
        document.getElementById('stage')
    );

    premium.init();
    let oMembers;
    const pMembers = playerTeam = p;
    if(ai) oMembers = opposingTeam = o.team;
    else oMembers = opposingTeam = o;
    // const oMembers = opposingTeam = o;


    // console.log(oMembers);
    
    const yourName = await fetch(`/user`);
    const getMyName = await yourName.json();

    if(b == null)
    {
        const theirName = await fetch(`/oUser?id=${oUsername}`);
        const getTheirName = await theirName.json();
        document.querySelector('#oName').innerHTML = oName = getTheirName.username;
    }
    else
    {
        document.querySelector('#oName').innerHTML = oName = b;
    }

    document.querySelector('#pName').innerHTML = pName = getMyName.username;
    
    for(let i = 0; i < pMembers.length; i++)
    {
        // const wait = await fetch(`/getCharacter?name=${pMembers[i]}`);
        // const obj = await wait.json();
        const img = document.getElementById("p"+i);
        // console.log(img.height);
        img.src = pMembers[i].image;
        // Disable is not working
        img.disable = false;
    
        const addition = document.getElementById(`characterSlot${i}`);
        addition.innerHTML += `<input id="_id" type="hidden" name="_id" value=${pMembers[i]._id} />`;
    }
    for(let i = 0; i < oMembers.length; i++)
    {
        const img = document.getElementById("o"+i);
        const addition = document.getElementById(`characterSlot${i}`);
        if(ai)
        {
            img.src = oMembers[i].image;
            addition.innerHTML += `<input id="_id" type="hidden" name="_id" value=${oMembers[i]._id} />`;
        }
        else
        {
            // console.log(oMembers[i]);

            // const wait = await fetch(`/getCharacter?name=${oMembers[i]}`);
            // const obj = await wait.json();
            // // console.log(img.height);
            img.src = oMembers[i].image;
            // Disable is not working
            img.disable = false;
            addition.innerHTML += `<input id="_id" type="hidden" name="_id" value=${oMembers[i]._id} />`;
        }
    }
}

const gameStart = async () => {
    ReactDOM.render(
        <Game csrf={csrfToken} />,
        document.getElementById('stage')
    );

    premium.init();

    if(playerAlive.length != 0)
    {
        playerAlive.splice(0);
        playerDead.splice(0);
        opponentAlive.splice(0);
        opponentDead.splice(0);
    }
    

    for(let i = 0; i < 20; i++)
    {
        playerAlive.push(playerTeam[i]);
        if(ai) opponentAlive.push(opposingTeam[i]._id);
        else opponentAlive.push(opposingTeam[i]);
    }

    console.log(opponentAlive.length);
    
    startGame = true;
    curOpNum = 0;
    curPNum = 0;

    console.log(pName);
    console.log(oName);

    if(startGame)
    {
        await playGame();
        // setInterval(await playGame);
    }
}

let playerTurn;
let opponentTurn;

let curOpNum = 0;
let curPNum = 0;

    // rolling
let plyRoll;
let oppRoll;

let roundOne = true;

const playGame = async () => {
    // console.log("Start");

    // console.log(document.getElementById("remainingPlayers"));

    // const getPlayer = await fetch(`/getCharacter?name=${playerAlive[0]}`);
    const ply = playerAlive[0];

    let opp;

    if(ai) {
        const getOpponent = await fetch(`/getCharacter?name=${opponentAlive[0]}`);
        opp = await getOpponent.json();
    }
    else opp = {character: opponentAlive[0]};

    console.log(opp);
    
    // console.log(opp.character.image);

    // Get all the images of characters
    const playerImg = document.getElementById('yourGuy');
    const opponentImg = document.getElementById('theirGuy');

    console.log(document.getElementById('remainingPlayers'));

    document.getElementById('remainingPlayers').innerHTML = `Players Left: ${playerAlive.length}`;
    document.getElementById('remainingOpponents').innerHTML = `Players Left: ${opponentAlive.length}`;

    document.getElementById('playerCharName').innerHTML = ply.name;
    if(ai) document.getElementById('opponentCharName').innerHTML = opp.character.name;
    else document.getElementById('opponentCharName').innerHTML = opp.name;

    const playerRollOutput = document.getElementById('yourNumber');
    const opponentRollOutput = document.getElementById('theirNumber');

    playerRollOutput.innerHTML = curPNum;
    opponentRollOutput.innerHTML = curOpNum;

    playerImg.src = ply.image;
    opponentImg.src = opp.character.image;

    // plyRoll = null;
    // oppRoll = null;

    plyRoll = null;
    oppRoll = null;

    if(ply.flip)
    {
        playerImg.style.transform = "scaleX(-1)";
    }
    else
    {
        playerImg.style.transform = null;
    }

    if(!opp.character.flip)
    {
        opponentImg.style.transform = "scaleX(-1)";
    }
    else
    {
        opponentImg.style.transform = null;
    }

    let coinFlip;
    if(playerTurn == null && opponentTurn == null)
    {
        const random = Math.random();
        coinFlip = random < 0.5;
        if(coinFlip) playerTurn = true;
        else opponentTurn = true;

    }

    const roll = document.getElementById('roll');
    if(opponentTurn)
    {

        roll.innerHTML = `${oName}'s Turn`;
        document.getElementById('space').style.display = "none";
        setTimeout(getRandomOpponent, 2000);
        // getRandomOpponent();
    }

    if(playerTurn)
    {
        document.getElementById('space').style.display = "block";
        roll.innerHTML = `${pName}'s Turn`;
    }

    // Goals: figure out how to do timer for opponent

    // document.addEventListener('keypress', function(event) {
        // 32 is the code for space
        // if(event.keyCode != 32 || !playerTurn) return;
            // plyRoll = getRandomInt(21);
            // // playerRollOutput.innerHTML = lerp(curPNum,plyRoll,1);
            // playerRollOutput.innerHTML = plyRoll;
            // curPNum = plyRoll;
            // // console.log(plyRoll);
            // if(oppRoll == null)
            // {
            //     playerTurn = false;
            //     opponentTurn = true;
            //     roll.innerHTML = `${oName}'s Turn`;
            //     setTimeout(getRandomOpponent, 1000);
            //     // getRandomOpponent();
            // }
            // else
            // {
            //     compareNumbers(plyRoll,oppRoll);
            // }
        // }
    // }
    // });
}

// What if instead of the spacebar, I can just create a button?

function getRandomOpponent() {
    const roll = document.getElementById('roll');
    const opponentRollOutput = document.getElementById('theirNumber');

    oppRoll = getRandomInt(21);
    // opponentRollOutput.innerHTML = lerp(curOpNum,oppRoll,1);
    opponentRollOutput.innerHTML = oppRoll;
    curOpNum = oppRoll;
    // I just realized I need to figure out how I'm going to do a tie. Maybe if it's a tie, I'll make the player go first
    if(plyRoll == null)
    {
        playerTurn = true;
        opponentTurn = false;
        document.getElementById('space').style.display = "block";
        roll.innerHTML = `${pName}'s Turn`;
    }
    else
    {
        compareNumbers(plyRoll,oppRoll);
    }
}

function yourRoll() {
    if(!playerTurn) return;
    const playerRollOutput = document.getElementById('yourNumber');
    plyRoll = getRandomInt(21);
    // playerRollOutput.innerHTML = lerp(curPNum,plyRoll,1);
    playerRollOutput.innerHTML = plyRoll;
    curPNum = plyRoll;
    if(oppRoll == null)
    {
        playerTurn = false;
        opponentTurn = true;
        document.getElementById('space').style.display = "none";
        roll.innerHTML = `${oName}'s Turn`;
        setTimeout(getRandomOpponent, 1000);
        // getRandomOpponent();
    }
    else
    {
        compareNumbers(plyRoll,oppRoll);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


// It's skipping numbers and I don't know why. I'll have to ask Austin on friday
function compareNumbers(a,b) {
    document.getElementById('space').style.display = "none";
    playerTurn = false;
    opponentTurn = false;
    if(a > b){
        // console.log("You Win");
        roll.innerHTML = `Point ${pName}`;
        setTimeout(async function() {
            opponentDead.push(opponentAlive[0]);
            opponentAlive.splice(0,1);
            if(opponentAlive.length == 0)
            {
                console.log("Winner: You!");
                await callWinner(true);
            }
            else{
                playerTurn = true;
                opponentTurn = false;
                playGame();
            }
        },1000);
    } 
    else if(a < b){
        roll.innerHTML = `Point ${oName}`;
        // console.log("You Lose");
        setTimeout(async function() {
            playerDead.push(playerAlive[0]);
            playerAlive.splice(0,1);
            playerTurn = false;
            opponentTurn = true;
            if(playerAlive.length == 0)
            {
                console.log("Winner: Other Guy");
                await callWinner(false);
            }
            else
            {
                playGame();
            }
        },1000);
    } 
    else if(a == b){
        // console.log("Tie");
        roll.innerHTML = `Tie`;
        setTimeout(function() {
            plyRoll = null;
            oppRoll = null;
            let coinFlip;
            const random = Math.random();
            coinFlip = random < 0.5;
            if(coinFlip){
                playerTurn = true;
                document.getElementById('space').style.display = "block";
                roll.innerHTML = `${pName}'s Turn`;
            } 
            else {
                opponentTurn = true;
                roll.innerHTML = `${oName}'s Turn`;
                setTimeout(getRandomOpponent, 1000);
                // getRandomOpponent();
            } 
        }, 1000);
    } 
}
async function callWinner(win) {
    ReactDOM.render(
        <Winner message={win} />,
        document.getElementById('stage')
    );

    premium.init();

    let winners;
    if(win)
    {
        // Win method
        const win = await fetch('/win', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _csrf: csrfToken }),
        });
        const winner = await win.json();
        console.log(winner);

        winners = playerTeam;
        for(let i = 0; i < winners.length; i++)
        {
            const img = document.getElementById("y"+i);
            img.src = winners[i].image;
        }
    }
    else
    {
        // Lose method
        const lose = await fetch('/lose', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _csrf: csrfToken }),
        });
        const loser = await lose.json();
        console.log(loser);

        winners = opposingTeam;
        // console.log(winners);
        if(ai)
        {
            for(let i = 0; i < winners.length; i++)
            {
                // Apparently it's getting back an object, which IDK why
                // console.log(winners[i]);
                // const wait = await fetch(`/getCharacter?name=${winners[i]._id}`);
                // const obj = await wait.json();
                const img = document.getElementById("y"+i);
                img.src = winners[i].image;
            }
        }
        else
        {
            for(let i = 0; i < winners.length; i++)
            {
                // Apparently it's getting back an object, which IDK why
                // console.log(winners[i]);
                const wait = await fetch(`/getCharacter?name=${winners[i]}`);
                const obj = await wait.json();
                const img = document.getElementById("y"+i);
                img.src = obj.character.image;
            }
        }

    }
}

async function callWinnerBuild() {
    const other = await fetch(`/random`);
    opponent = await other.json();

    ReactDOM.render(
        <Winner message={false} />,
        document.getElementById('stage')
    );
    let winners;
    // if(win)
    // {
    //     winners = playerTeam;
    //     for(let i = 0; i < winners.length; i++)
    //     {
    //         const img = document.getElementById("y"+i);
    //         img.src = winners[i].image;
    //     }
    // }
    // else
    // {
        // for(let i = 0; i < op.team.team.length; i++)
        // {
        //      // Apparently it's getting back an object, which IDK why
        //     console.log(op.team.team[i]);
        //     const wait = await fetch(`/getCharacter?name=${op.team.team[i]}`);
        //     // const obj = await wait.json();
        //     // console.log(obj);
        //     // const img = document.getElementById("y"+i);
        //     // console.log(img.height);
        //     // img.src = obj.character.image;
        // }

        winners = opponent.team;
        // winners = opponent.team.team;
        // console.log(winners);
        for(let i = 0; i < winners.length; i++)
        {
             // Apparently it's getting back an object, which IDK why
            console.log(winners[i]);
            const wait = await fetch(`/getCharacter?name=${winners[i]._id}`);
            const obj = await wait.json();
            // console.log(obj);
            const img = document.getElementById("y"+i);
            img.src = obj.character.image;
        }

    // }
}

function tryAgain() {
    ai = false;
    if(playerAlive.length != 0) playerAlive.splice(0,playerAlive.length);
    if(opponentAlive.length != 0) opponentAlive.splice(0,opponentAlive.length);
    ReactDOM.render(
        <SelectGame team={player} />,
        document.getElementById('stage')
    );

    premium.init();
}

const init = async () => {

    const response = await fetch('/getToken');
    const data = await response.json();
    csrfToken = data.csrfToken;

    const fetchTeam = await fetch('/yourTeam');
    player = await fetchTeam.json();

    console.log(player);

    const load = await fetch('/accounts');
    accounts = await load.json();

    ReactDOM.render(
        <SelectGame team={player} />,
        document.getElementById('stage')
    );

    premium.init();

    // await callWinnerBuild();
}

window.onload = init;