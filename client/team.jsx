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
    csrfToken = data.csrfToken;
    ReactDOM.render(
        <CharacterSearch csrf={csrfToken} />,
        document.getElementById('search')
    );

    const searchBox = document.querySelector('#characterField');
    searchBox.addEventListener('input', async ()=>{
        const response = await fetch(`/searchCharacters?name=${searchBox.value}`);
        const obj = await response.json();
        console.log(obj);
    });
}

// const CharacterList = (props) => {
//     if(props.domos.length === 0)
//     {
//         return (
//             <div className="characterList">
//                 <h3 className="emptyDomo">No Domos Yet!</h3>
//             </div>
//         );
//     }

//     const domoNodes = props.domos.map(domo => {
//         return (
//             <div key = {domo._id} className="domo">
//                 <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
//                 <h3 className="domoName"> Name: {domo.name} </h3>
//                 <h3 className="domoAge"> Age: {domo.age} </h3>
//             </div>
//         );
//     });

//     return(
//         <div className="characterList">
//             {domoNodes}
//         </div>
//     );
// }

window.onload = init;