const helper = require('./helper.js');
let csrfToken;

const SelectGame = (props) => {

    console.log(props.team.team.length);
    if(props.team.team.length !== 20)
    {
        return (
            <div className="characterList">
                <h3 className="emptyDomo">You need a team of 20 players in order to participate</h3>
            </div>
        );
    }

    // const characters = props.character.map(chr => {
    //     return (
    //         // <div key = {chr._id} className="char">
    //         //     {/* <img src={chr.image} alt={chr.name} height="150px" style="object-fit: contain;" id={chr._id}></img> */}
    //         //     <h3 className="domoName"> Name: {chr.name} </h3>
    //         //     {/* <h3 className="domoAge"> Age: {domo.age} </h3> */}
    //         // </div>
    //         <form id="addToTeam" 
    //         name={chr.name}
    //         key={chr._id} 
    //         onSubmit={updateTeam} 
    //         action="/add" 
    //         method="POST" 
    //         className="set">
    //             <input type="image" height="150" src={chr.image} />
    //             <h3 className="characterName"> {chr.name} </h3>
    //             <input id="_id" type="hidden" name="_id" value={chr._id} />
    //             <input id="_csrf" type="hidden" name="_csrf" value={csrfToken} />
    //         </form>
    //     );
    // });

    return(
        <div className="characterList">
            {/* {characters} */}
            <h3 className="emptyDomo">You are qualified</h3>
        </div>
    );
}

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();
    csrfToken = data.csrfToken;

    const fetchTeam = await fetch('/getTeam');
    const team = await fetchTeam.json();

    const load = await fetch('/accounts');
    const accounts = await load.json();

    ReactDOM.render(
        <SelectGame team={team.team[0]} />,
        document.getElementById('stage')
    );
}

window.onload = init;