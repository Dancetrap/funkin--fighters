// This ain't permanent
import characters from '../assets/characters.json' assert { type: "json" };

const init = () => {
    // console.log(characters);
    const section = document.getElementById('content');
    const val = Object.values(characters).sort(function(a, b) {
        return compareStrings(a.name, b.name);
      });
    //   God that's a lot of animations
      content.innerHTML = '';

              val.forEach(char => {
                console.log(char.name);
                  
                  const characterDiv = document.createElement('div');
                  const characterButton = document.createElement('button');
  
                  characterButton.innerHTML = `<img src="${char.imageURL}" alt="${char.name}" height="150px" style="object-fit: contain;" id="${char.name}Img"></img><p style="margin: 1px; font-family: 'Phantom'; ">${char.name}</p>`;
                  
                  characterButton.style = "background: rgba(0,0,0,0); border: none; cursor: pointer;";
                  characterDiv.appendChild(characterButton);
                  section.appendChild(characterDiv);
              });
}

function compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();
  
    return (a < b) ? -1 : (a > b) ? 1 : 0;
  };

window.onload = init;