const helper = require('./helper.js');
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

    if(props.team.team.length !== 20)
    {
        return (
            <div className="characterList">
                <h3 className="emptyDomo">You need a team of 20 players in order to participate</h3>
            </div>
        );
    }

    let anotherPlayer = '';

    if(accounts.accounts.length !== 0) anotherPlayer = <button type='exist' onClick={otherPlayer}>Play against Another Player</button>;

    // const gameOptions =
        // return (
            // <div key = {chr._id} className="char">
            //     {/* <img src={chr.image} alt={chr.name} height="150px" style="object-fit: contain;" id={chr._id}></img> */}
            //     <h3 className="domoName"> Name: {chr.name} </h3>
            //     {/* <h3 className="domoAge"> Age: {domo.age} </h3> */}
            // </div>
            // <form id="addToTeam" 
            // name={chr.name}
            // key={chr._id} 
            // onSubmit={updateTeam} 
            // action="/add" 
            // method="POST" 
            // className="set">
            //     <input type="image" height="150" src={chr.image} />
            //     <h3 className="characterName"> {chr.name} </h3>
            //     <input id="_id" type="hidden" name="_id" value={chr._id} />
            //     <input id="_csrf" type="hidden" name="_csrf" value={csrfToken} />
            // </form>
        // );

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
            <h3 id="playerCharName"></h3>
            <img src="" alt="player" id="yourGuy" />
            <h3 id="yourNumber"></h3>
        </div>
        <h3>vs.</h3>
        <div id="opponent">
            <h3 id="opponentCharName"></h3>
            <img src="" alt="opponent" id="theirGuy" />
            <h3 id="theirNumber"></h3>
        </div>
        </div>
        <h3 id="roll">Turn</h3>
    </div> );
}

const aiPlayer = async () => {

    const other = await fetch(`/random`);
    opponent = await other.json();
    // console.log(opponent.team);
    ai = true;
    await loadOpposingTeam(player.team[0], opponent, "Bot");  
}

const otherPlayer = async () => {
    const o = Math.floor(Math.random() * accounts.accounts.length);

    const other = await fetch(`/theirTeam?team=${accounts.accounts[o].owner}`);
    opponent = await other.json();

    await loadOpposingTeam(player.team[0], opponent.team);   
}

const loadOpposingTeam = async (p,o,b) => {
    // const o = Math.floor(Math.random() * accounts.accounts.length);

    // const other = await fetch(`/theirTeam?team=${accounts.accounts[o].owner}`);
    // opponent = await other.json();

    // await preGame(player.team[0].team, opponent.team.team);

    ReactDOM.render(
        <SelectTeam csrf={csrfToken} />,
        document.getElementById('stage')
    );

    const pMembers = playerTeam = p.team;
    const oMembers = opposingTeam = o.team;
    
    const yourName = await fetch(`/user`);
    const getMyName = await yourName.json();

    if(b == null)
    {
        const theirName = await fetch(`/oUser?id=${opponent.team.owner}`);
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
        const wait = await fetch(`/getCharacter?name=${pMembers[i]}`);
        const obj = await wait.json();
        const img = document.getElementById("p"+i);
        // console.log(img.height);
        img.src = obj.character.image;
        // Disable is not working
        img.disable = false;
    
        const addition = document.getElementById(`characterSlot${i}`);
        addition.innerHTML += `<input id="_id" type="hidden" name="_id" value=${obj.character._id} />`;
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
            const wait = await fetch(`/getCharacter?name=${oMembers[i]}`);
            const obj = await wait.json();
            // console.log(img.height);
            img.src = obj.character.image;
            // Disable is not working
            img.disable = false;
            addition.innerHTML += `<input id="_id" type="hidden" name="_id" value=${obj.character._id} />`;
        }
    }
}

const gameStart = async () => {
    ReactDOM.render(
        <Game csrf={csrfToken} />,
        document.getElementById('stage')
    );

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
    startGame = true;

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

    const getPlayer = await fetch(`/getCharacter?name=${playerAlive[0]}`);
    const ply = await getPlayer.json();
    console.log(ply.character.image);

    const getOpponent = await fetch(`/getCharacter?name=${opponentAlive[0]}`);
    const opp = await getOpponent.json();
    console.log(opp.character.image);

    // Get all the images of characters
    const playerImg = document.getElementById('yourGuy');
    const opponentImg = document.getElementById('theirGuy');

    document.getElementById('playerCharName').innerHTML = ply.character.name;
    document.getElementById('opponentCharName').innerHTML = opp.character.name;

    const playerRollOutput = document.getElementById('yourNumber');
    const opponentRollOutput = document.getElementById('theirNumber');

    playerRollOutput.innerHTML = curPNum;
    opponentRollOutput.innerHTML = curOpNum;

    playerImg.src = ply.character.image;
    opponentImg.src = opp.character.image;

    plyRoll = null;
    oppRoll = null;

    if(ply.character.flip)
    {
        playerImg.style.transform = "scaleX(-1)";
    }
    else
    {
        playerImg.style.transform = null;
    }

    console.log(opp.character.flip);

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
        setTimeout(getRandomOpponent, 3000);
    }

    if(playerTurn)
    {
        roll.innerHTML = `${pName}'s Turn`;
    }

    // Goals: figure out how to do timer for opponent

    document.addEventListener('keydown', function(event) {
        // 32 is the code for space
        if(event.keyCode == 32 && playerTurn) {
            plyRoll = getRandomInt(21);
            // playerRollOutput.innerHTML = lerp(curPNum,plyRoll,1);
            playerRollOutput.innerHTML = plyRoll;
            curPNum = plyRoll;
            console.log(plyRoll);
            if(oppRoll == null)
            {
                playerTurn = false;
                opponentTurn = true;
                roll.innerHTML = `${oName}'s Turn`;
                setTimeout(getRandomOpponent, 1000);
            }
            else
            {
                compareNumbers(plyRoll,oppRoll);
            }
        }
    });
}

function getRandomOpponent() {
    const roll = document.getElementById('roll');
    const opponentRollOutput = document.getElementById('theirNumber');

    oppRoll = getRandomInt(21);
    console.log(oppRoll);
    // opponentRollOutput.innerHTML = lerp(curOpNum,oppRoll,1);
    opponentRollOutput.innerHTML = oppRoll;
    curOpNum = oppRoll;
    // I just realized I need to figure out how I'm going to do a tie. Maybe if it's a tie, I'll make the player go first
    if(plyRoll == null)
    {
        playerTurn = true;
        opponentTurn = false;
        roll.innerHTML = `${pName}'s Turn`;
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
    if(a > b){
        console.log("You Win");
        roll.innerHTML = `Point ${pName}`;
        setTimeout(async function() {
            opponentDead.push(opponentAlive[0]);
            opponentAlive.splice(0,1);
            if(opponentAlive.length == 0)
            {
                console.log("You Win");
            }
            else{
                playerTurn = true;
                opponentTurn = false;
                await playGame();
            }
        },1000);
    } 
    else if(a < b){
        roll.innerHTML = `Point ${oName}`;
        console.log("You Lose");
        setTimeout(async function() {
            playerDead.push(playerAlive[0]);
            playerAlive.splice(0,1);
            if(playerAlive.length == 0)
            {
                console.log("You Lose");
            }
            else
            {
                playerTurn = false;
                opponentTurn = true;
                await playGame();
            }
        },1000);
    } 
    else if(a == b){
        console.log("Tie");
        setTimeout(function() {
            let coinFlip;
            const random = Math.random();
            coinFlip = random < 0.5;
            if(coinFlip){
                playerTurn = true;
            } 
            else {
                opponentTurn = true;
                setTimeout(getRandomOpponent, 1000);
            } 
        }, 1000);
    } 
}

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();
    csrfToken = data.csrfToken;

    const fetchTeam = await fetch('/yourTeam');
    player = await fetchTeam.json();

    const load = await fetch('/accounts');
    accounts = await load.json();

    ReactDOM.render(
        <SelectGame team={player.team[0]} />,
        document.getElementById('stage')
    );
}

window.onload = init;