(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("domoMessage").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,a,c)=>{const n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),r=await n.json();document.getElementById("domoMessage").classList.add("hidden"),r.redirect&&(window.location=r.redirect),r.error&&t(r.error),c&&c(r)},hideError:()=>{document.getElementById("domoMessage").classList.add("hidden")}}}},t={};function a(c){var n=t[c];if(void 0!==n)return n.exports;var r=t[c]={exports:{}};return e[c](r,r.exports,a),r.exports}(()=>{let e;a(603);const t=t=>React.createElement("form",{id:"characterForm",action:"characters",method:"post"},React.createElement("input",{id:"characterField",type:"search",name:"name"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e})),c=t=>{if(0===t.character.length||void 0===t.character.length)return React.createElement("div",{className:"characterList"},React.createElement("h3",{className:"emptyDomo"},"Nothing"));const a=t.character.map((t=>React.createElement("form",{id:"addToTeam",name:t.name,key:t._id,action:"/add",method:"POST",className:"set"},React.createElement("input",{type:"image",height:"150",src:t.image}),React.createElement("h3",{className:"characterName"}," ",t.name," "),React.createElement("input",{id:"_id",type:"hidden",name:"_id",value:t._id}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e}))));return React.createElement("div",{className:"characterList"},a)};window.onload=async()=>{const a=await fetch("/getToken"),n=await a.json();e=n.csrfToken,ReactDOM.render(React.createElement(t,{csrf:e}),document.getElementById("search"));const r=document.querySelector("#characterField");r.addEventListener("input",(async()=>{const e=await fetch(`/searchCharacters?name=${r.value}`),t=await e.json();console.log(e.status),console.log(t),ReactDOM.render(React.createElement(c,{character:t}),document.getElementById("results"))}));const o=await fetch("/load",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({_csrf:e})});await o.json()}})()})();