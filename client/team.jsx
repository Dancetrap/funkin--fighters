const helper = require('./helper.js');
let csrfToken;

const CharacterSearch = (props) => {
    return (
    <form id="characterForm" action="characters" method="post">
    <input id="characterField" type="search" name="name" />
    <input id="_csrf" type="hidden" name="_csrf" value={csrfToken} />
    </form>
    );
}

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    // const load = await fetch('/load');
    // const onLoad = await load.json();

    csrfToken = data.csrfToken;
    ReactDOM.render(
        <CharacterSearch csrf={csrfToken} />,
        document.getElementById('search')
    );

    const searchBox = document.querySelector('#characterField');
    searchBox.addEventListener('input', async ()=>{
        ReactDOM.unmountComponentAtNode(document.getElementById('results'));
        const response = await fetch(`/searchCharacters?name=${searchBox.value}`);
        const obj = await response.json();
            ReactDOM.render(
                <CharacterList character={obj} />,
                document.getElementById('results')
            );
    });

    const load = await fetch('/load', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _csrf: csrfToken }),
      });

    const makeTeam = await fetch('/loadTeam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _csrf: csrfToken }),
    });
    
    const onLoad = await makeTeam.json();
    console.log(onLoad);
}

const CharacterList = (props) => {

    if(props.character.length === 0 || props.character.length === undefined)
    {
        return (
            <div className="characterList">
                <h3 className="emptyDomo">Nothing</h3>
            </div>
        );
    }

    const characters = props.character.map(chr => {
        return (
            // <div key = {chr._id} className="char">
            //     {/* <img src={chr.image} alt={chr.name} height="150px" style="object-fit: contain;" id={chr._id}></img> */}
            //     <h3 className="domoName"> Name: {chr.name} </h3>
            //     {/* <h3 className="domoAge"> Age: {domo.age} </h3> */}
            // </div>
            <form id="addToTeam" 
            name={chr.name}
            key={chr._id} 
            // onSubmit={handleLogin} 
            action="/add" 
            method="POST" 
            className="set">
                <input type="image" height="150" src={chr.image} />
                <h3 className="characterName"> {chr.name} </h3>
                <input id="_id" type="hidden" name="_id" value={chr._id} />
                <input id="_csrf" type="hidden" name="_csrf" value={csrfToken} />
            </form>
        );
    });

    return(
        <div className="characterList">
            {characters}
        </div>
    );
}

window.onload = init;