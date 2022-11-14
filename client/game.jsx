const helper = require('./helper.js');
let csrfToken;
let accounts;

let player;
let opponent;

// game variables
const playerAlive = [];
const playerDead = [];
const opponentAlive = [];
const opponentDead = [];

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

    if(accounts.accounts.length !== 0) anotherPlayer = <button type='exist' onClick={loadOpposingTeam}>Play against Another Player</button>;

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
                <button type='ai'>Play against AI</button>
                {anotherPlayer}
            </div>
        </div>
    );
}

const SelectTeam = (props) => {
    let content = [];


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
            <input type="image" height="50" width="50" src="/assets/img/150.png" className="player" id={"o"+i} disabled />
            {/* <input id="_id" type="hidden" name="_id" value={chr._id} /> */}
            <input id="_csrf" type="hidden" name="_csrf" value={csrfToken} />
            </form>  
        oppContent.push(imageForm);
    }
    
    return ( 
        <div id="teams">
            <h2 id='pName'></h2>
        <div id="team">
            {content}
        </div>
        <h3>vs.</h3>
            <h2 id='oName'></h2>
        <div id="team">
            {oppContent}
        </div>
        <button type='exist' onClick={loadOpposingTeam}>Find Another Team</button>
    </div>
    );
}

const Game = (props) => {
    // props.player
    // props.opponent
}

const loadOpposingTeam = async () => {
    const o = Math.floor(Math.random() * accounts.accounts.length);

    const other = await fetch(`/theirTeam?team=${accounts.accounts[o].owner}`);
    opponent = await other.json();

    ReactDOM.render(
        <SelectTeam csrf={csrfToken} />,
        document.getElementById('stage')
    );

    const pMembers = player.team[0].team;
    const oMembers = opponent.team.team;
    
    const yourName = await fetch(`/user`);
    const getMyName = await yourName.json();

    const theirName = await fetch(`/oUser?id=${opponent.team.owner}`);
    const getTheirName = await theirName.json();

    document.querySelector('#pName').innerHTML = getMyName.username;
    document.querySelector('#oName').innerHTML = getTheirName.username;

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
        const wait = await fetch(`/getCharacter?name=${oMembers[i]}`);
        const obj = await wait.json();
        const img = document.getElementById("o"+i);
        // console.log(img.height);
        img.src = obj.character.image;
        // Disable is not working
        img.disable = false;
    
        const addition = document.getElementById(`characterSlot${i}`);
        addition.innerHTML += `<input id="_id" type="hidden" name="_id" value=${obj.character._id} />`;
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
    console.log(accounts);

    ReactDOM.render(
        <SelectGame team={player.team[0]} />,
        document.getElementById('stage')
    );
}

window.onload = init;