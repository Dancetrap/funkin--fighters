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
    // console.log(text);
    // document.getElementById('messages').innerText = text;

    return false;
};

const upgrade = () => {
    const unlock = document.getElementById('premium');
    if (luma(Object.values(account)[0].header))
    {
        unlock.style.backgroundColor = "white";
        unlock.style.color = Object.values(account)[0].header;
    }
    else
    {
        unlock.style.backgroundColor = Object.values(account)[0].header;
        unlock.style.color = "black";
    }
    unlock.style.boxShadow = "2px 2px 25px black"
    unlock.textContent = "Unlocked";
    document.getElementById('features').style.display = "block";

    ReactDOM.render(
        <Premium color={Object.values(account)[0]}/>,
        document.getElementById('features')
    );
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
        setColor();
        upgrade();
    }
};

const checkIfUnlocked = () => {
    
    const pre = Object.values(account)[0].premium;
    if(pre)
    {
        setColor();
        upgrade();
    }
}

// window.onload = init;

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();
    csrfToken = data.csrfToken;

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
    // console.log(account);

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
    // console.log(unlock);

    // console.log(document.getElementById('headercolor').value);
}

const colorIn = async (e) => {
    e.preventDefault();

    const header = e.target.querySelector('#headercolor').value;
    const body = e.target.querySelector("#bodycolor").value;
    const _csrf = e.target.querySelector("#_csrf").value;

    helper.setColor(e.target.action, {header, body, _csrf});

    const acc = await fetch('/account');
    account = await acc.json();
    console.log(account);

    await setColor();
    await upgrade();
    return false;
}

// set everything to be the color of the selected one
const setColor = (e) => {
    const nav = document.querySelector('nav');
    const buttons = document.querySelectorAll('button');
    const links = document.querySelectorAll('a');
    const submits = document.querySelector('.formSubmit');
    // console.log(submits);

    // console.log(luma(Object.values(account)[0].header));
    // if it's true, then set text to white, else set it to black

    nav.style.backgroundColor = Object.values(account)[0].header;
    buttons.forEach((button) => button.style.backgroundColor = Object.values(account)[0].header);
    links.forEach((a) => a.style.backgroundColor = Object.values(account)[0].header);
    if (luma(Object.values(account)[0].header))
    {
        buttons.forEach((button) => button.style.color = "white");
        links.forEach((a) => a.style.color = "white");
    }
    else
    {
        buttons.forEach((button) => button.style.color = "black");
        links.forEach((a) => a.style.color = "black");
    }

    // submits.forEach((a) => a.style.backgroundColor = Object.values(account)[0].header);
};

const luma = (a) => {
    var c = a.substring(1);      // strip #
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    return luma < 40;
    // if (luma < 40) {
    //     // pick a different colour
    // }
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

const Premium = (props) => {
    return <div id='settings'>
        <form action="/apply" method="POST" key="colorful" onSubmit={colorIn} >
            <label htmlFor="header">Main Color: </label>
            <input type="color" id="headercolor" name="header" defaultValue={props.color.header} />
            <label htmlFor="body">Secondary Color: </label>
            <input type="color" id="bodycolor" name="body" defaultValue={props.color.body} />
            <input id="_csrf" type="hidden" name="_csrf" value={csrfToken} />
            <input className="formSubmit" type="submit" value="Apply" />  
        </form>
    </div>
}

window.onload = init;