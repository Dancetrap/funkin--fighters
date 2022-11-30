const helper = require('./helper.js');
let csrfToken;

let team;
let images;
let ids;

let victories;
let account;

const uploadFile = async (e) => {
    e.preventDefault();

    const _csrf = e.target.querySelector("#_csrf").value;

    const response = await fetch('/upload',{
        method: 'POST',
        body: new FormData(e.target),
    });

    const text = await response.text();
    console.log(text);
    // document.getElementById('messages').innerText = text;

    return false;
};

const upgrade = () => {
    const unlock = document.getElementById('premium');
    unlock.style.backgroundColor = "black";
    unlock.textContent = "Unlocked";
}

const premiumMode = async (e) => {
    const response = await fetch('/unlock',{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({  _csrf: csrfToken }),
    });
    // Need to make this a callback
    const result = await response.json();
    // console.log(result);

    if(result.message)
    {
        upgrade();
    }
};

const checkIfUnlocked = () => {
    
    const pre = Object.values(account)[0].premium
    if(pre)
    {
        upgrade();
    }
}

// window.onload = init;

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();
    csrfToken = data.csrfToken;

    // const load = await fetch('/load', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ _csrf: csrfToken }),
    //   });

    // const makeTeam = await fetch('/loadTeam', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ _csrf: csrfToken }),
    // });

    const load = await fetch('/load', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _csrf: csrfToken }),
    });

    const getTeam = await fetch('/yourTeam');
    team = await getTeam.json();
    if(team.error)
    {
        const makeTeam = await fetch('/loadTeam', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _csrf: csrfToken }),
        });

        const getTeam = await fetch('/yourTeam');
        team = await getTeam.json();
    }

    const add = await fetch('/getSome');
    victories = await add.json();
    
    // const premi = await fetch('/unlock');
    // const premium = await premi.json();
    // console.log(premium);

    const acc = await fetch('/account');
    account = await acc.json();
    console.log(account);

    checkIfUnlocked();

    ReactDOM.render(
        <TeamMembers csrf={csrfToken} obj={team}/>,
        document.getElementById('team')
    );

    ReactDOM.render(
        <Pfp csrf={csrfToken}/>,
        document.getElementById('pfp')
    );

    ReactDOM.render(
        <WinnersAndLosers vic={victories}/>,
        document.getElementById('wins')
    );

    const uploadForm = document.getElementById('hover');
    uploadForm.addEventListener('submit', uploadFile);

    const unlock = document.getElementById('premium');
    unlock.addEventListener('click', premiumMode);
    console.log(unlock);
}

const Pfp = (props) => {
    return <div id='ppf'>
        <form action="/upload" key='prof' id='hover'>
            <input type="image" height="250" width="250" src="/assets/img/profileIcon.png" id='picture' />
            {/* <img src="/assets/img/choose.png" alt="choose" id="change" height="250" width="250" /> */}
            <input type="image" height="250" width="250" src="/assets/img/choose.png" id='change' />
            <input id="_csrf" type="hidden" name="_csrf" value={csrfToken} />
        </form>
    </div>
}

const TeamMembers = (props) => {

    const content = [];
    // const theTeam = team.team[0].team;

        for (let i = 0; i < props.obj.length; i++)
        {
            const imageForm = <form id={"characterSlot" + i} action="/remove" method="POST" className="d-sides" key={i} >
                <input type="image" height="50" width="50" src={props.obj[i].image} className="player" id={i} disabled />
                <input id="_id" type="hidden" name="_id" value={props.obj[i]._id} />
                <input id="_csrf" type="hidden" name="_csrf" value={csrfToken} />
                </form>  
            content.push(imageForm);
        }
        for (let i = props.obj.length; i < 20; i++)
        {
            const imageForm = <form id={"characterSlot" + i} action="/remove" method="POST" className="d-sides" key={i} >
                <input type="image" height="50" width="50" src="/assets/img/150.png" className="player" id={i} disabled />
                {/* <input id="_id" type="hidden" name="_id" value={chr._id} /> */}
                <input id="_csrf" type="hidden" name="_csrf" value={csrfToken} />
                </form>  
            content.push(imageForm);
        }
    return content;
}

const WinnersAndLosers = (props) => {
    const content = [];
    content.push(<h3 key='wins'>Wins: {props.vic.wins}</h3>)
    content.push(<h3 key='losses'>Losses: {props.vic.losses}</h3>)
    return content;
}

window.onload = init;