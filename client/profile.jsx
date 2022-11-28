const helper = require('./helper.js');
let csrfToken;

let team;
let images;
let ids;

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

    ReactDOM.render(
        <TeamMembers csrf={csrfToken} obj={team}/>,
        document.getElementById('team')
    );

    ReactDOM.render(
        <Pfp csrf={csrfToken}/>,
        document.getElementById('pfp')
    );
}

const Pfp = (props) => {
    return <div id='ppf'>
        <form action="/" key='prof' id='hover'>
            <input type="image" height="250" width="250" src="/assets/img/profileIcon.png" id='picture' />
            {/* <img src="/assets/img/choose.png" alt="choose" id="change" height="250" width="250" /> */}
            <input type="image" height="250" width="250" src="/assets/img/choose.png" id='change' />
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

window.onload = init;