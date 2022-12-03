const helper = require('./helper.js');
let csrfToken;

let team;
let images;
let ids;

let victories;
let account;

function getImgData() {
    const files = chooseFile.files[0];
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener("load", function () {
        imgPreview.style.display = "block";
        imgPreview.innerHTML = '<img src="' + this.result + '" />';
      });    
    }
  }

const uploadFile = async (e) => {
    e.preventDefault();

    console.log(e.target);
    // const _csrf = e.target.querySelector("#_csrf").value;

    const response = await fetch('/upload', {
        method: 'POST',
        body: new FormData(e.target),
    });

    const text = await response.json();
    // console.log(text.message);
    // document.getElementById('messages').innerText = text;

    if(text.message)
    {
        document.getElementById('picture').src = `/retrieve?_id=${text.fileId}`;
        document.getElementById('logo').src = `/retrieve?_id=${text.fileId}`;
        console.log(document.getElementById('picture').src);
    }

    return false;
};

const uploadPic = async () => 
{
    const forum = document.getElementById('hover');

    const response = await fetch('/upload', {
        method: 'POST',
        body: new FormData(forum),
    });

    const text = await response.json();
    // console.log(text.message);
    // document.getElementById('messages').innerText = text;

    if(text.message)
    {
        document.getElementById('picture').src = `/retrieve?_id=${text.fileId}`;
        document.getElementById('logo').src = `/retrieve?_id=${text.fileId}`;
        console.log(document.getElementById('picture').src);
    }

    return false;
}

const upgrade = () => {
    const unlock = document.getElementById('premium');
    if (helper.luma(Object.values(account)[0].header))
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

    unlock.disabled = true;

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
        upgrade();
        setColor();
    }
};

const checkIfUnlocked = () => {
    
    const pre = Object.values(account)[0].premium;
    if(pre)
    {
        upgrade();
        setColor();
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
    // console.log();

    document.getElementById('logo').src = account.account.picture;

    checkIfUnlocked();

    ReactDOM.render(
        <TeamMembers csrf={csrfToken} obj={team}/>,
        document.getElementById('team')
    );

    ReactDOM.render(
        <Pfp pfp={account.account} csrf={csrfToken}/>,
        document.getElementById('pfp')
    );

    ReactDOM.render(
        <WinnersAndLosers vic={victories}/>,
        document.getElementById('wins')
    );

    // const uploadForm = document.getElementById('hover');
    // uploadForm.addEventListener('submit', uploadFile);

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

    // await setColor();
    // await upgrade();
    return false;
}

// set everything to be the color of the selected one
const setColor = (e) => {
    const nav = document.querySelector('nav');
    const body = document.querySelector('body');
    const buttons = document.querySelectorAll('button');
    const links = document.querySelectorAll('a');
    const submits = document.querySelector('#apply');
    // console.log(submits);

    // console.log(luma(Object.values(account)[0].header));
    // if it's true, then set text to white, else set it to black

    nav.style.backgroundColor = Object.values(account)[0].header;
    body.style.backgroundColor = Object.values(account)[0].body;
    submits.style.backgroundColor = Object.values(account)[0].header;

    if (helper.luma(Object.values(account)[0].body))
    {
        body.style.color = "white";
    }
    else
    {
        body.style.color = "black";
    }

    const hsl = helper.hexToHSL(Object.values(account)[0].header).split(",");
    const h = parseInt(hsl[0]);
    const s = parseInt(hsl[1]);
    let b = parseInt(hsl[2]);

    buttons.forEach((button) => button.style.backgroundColor = Object.values(account)[0].header);
    links.forEach((a) => a.style.backgroundColor = Object.values(account)[0].header);
    if (helper.luma(Object.values(account)[0].header))
    {
        b = b + 5;
        buttons.forEach((button) => { 
            button.style.color = "white"; 
            button.addEventListener('mouseover', (e) => {
                e.target.style.backgroundColor = helper.HSLToHex(h,s,b);
            });
            button.addEventListener('mouseout', (e) => {
                e.target.style.backgroundColor = Object.values(account)[0].header;
            });    
        });
        links.forEach((a) => a.style.color = "white");
        submits.style.color = "white";
    }
    else
    {
        b = b - 5;
        buttons.forEach((button) => {
            button.style.color = "black";
            button.addEventListener('mouseover', (e) => {
                e.target.style.backgroundColor = helper.HSLToHex(h,s,b);
            });
            button.addEventListener('mouseout', (e) => {
                e.target.style.backgroundColor = Object.values(account)[0].header;
            });            
        });
        links.forEach((a) => a.style.color = "black");
        submits.style.color = "black";
    }

    const unlock = document.getElementById('premium');
    if (helper.luma(Object.values(account)[0].header))
    {
        unlock.style.backgroundColor = "white";
        unlock.style.color = Object.values(account)[0].header;
    }
    else
    {
        unlock.style.backgroundColor = Object.values(account)[0].header;
        unlock.style.color = "black";
    }

    // submits.forEach((a) => a.style.backgroundColor = Object.values(account)[0].header);
};

const Pfp = (props) => {
    return <div id='ppf'>
        <form action="/upload" key='prof' id='hover' encType='multipart/form-data' >
            {/* <input type="image" height="250" width="250" src={props.pfp.picture} id='picture' /> */}
            <img src={props.pfp.picture} alt="img" height="250" width="250" id="picture" />
            <label htmlFor='fileUploader'>
                <img src="/assets/img/choose.png" alt="img" height="250" width="250" id='change' />
            </label>
            <input type="file" name='sampleFile' id='fileUploader' accept="image/*" onChange={uploadPic} />
                {/* <input type="image" height="250" width="250" src="/assets/img/choose.png" id='change' /> */}
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
        <h2 id='setTitle'>App Color</h2>
        <form action="/apply" method="POST" key="colorful" id="colorSettings" onSubmit={colorIn} >
            <div id="colorOpt">
            <div className="colors">
                <label htmlFor="header">Main Color: </label>
                <input type="color" id="headercolor" name="header" defaultValue={props.color.header} />
            </div>
            <div className="colors">
                <label htmlFor="body">Secondary Color: </label>
                <input type="color" id="bodycolor" name="body" defaultValue={props.color.body} />
            </div>
            </div>
            <input id="_csrf" type="hidden" name="_csrf" value={csrfToken} />
            <input className="formSubmit" id="apply" type="submit" value="Apply" />  
        </form>
    </div>
}

window.onload = init;