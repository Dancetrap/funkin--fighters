(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("domoMessage").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,a,n)=>{const c=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),r=await c.json();document.getElementById("domoMessage").classList.add("hidden"),r.redirect&&(window.location=r.redirect),r.error&&t(r.error),n&&n(r)},hideError:()=>{document.getElementById("domoMessage").classList.add("hidden")}}}},t={};function a(n){var c=t[n];if(void 0!==c)return c.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,a),r.exports}(()=>{let e,t,n,c;a(603);const r=e=>{if(20!==e.team.team.length)return React.createElement("div",{className:"characterList"},React.createElement("h3",{className:"emptyDomo"},"You need a team of 20 players in order to participate"));let a="";return 0!==t.accounts.length&&(a=React.createElement("button",{type:"exist",onClick:o},"Play against Another Player")),React.createElement("div",{className:"characterList"},React.createElement("div",{key:"gameMenu",id:"gameMenu"},React.createElement("button",{type:"ai"},"Play against AI"),a))},i=t=>{let a=[];for(let t=0;t<20;t++){const n=React.createElement("form",{id:"characterSlot"+t,action:"/remove",method:"POST",className:"d-sides",key:"p"+t},React.createElement("input",{type:"image",height:"50",width:"50",src:"/assets/img/150.png",className:"player",id:"p"+t,disabled:!0}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e}));a.push(n)}let n=[];for(let t=0;t<20;t++){const a=React.createElement("form",{id:"characterSlot"+t,action:"/remove",method:"POST",className:"d-sides",key:"o"+t},React.createElement("input",{type:"image",height:"50",width:"50",src:"/assets/img/150.png",className:"player",id:"o"+t,disabled:!0}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e}));n.push(a)}return React.createElement("div",{id:"teams"},React.createElement("div",{id:"twoteams"},React.createElement("div",{id:"teamPlayer"},React.createElement("h2",{id:"pName"}),React.createElement("div",{id:"teamP"},a)),React.createElement("h3",{id:"vs"},"vs."),React.createElement("div",{id:"teamOpponent"},React.createElement("h2",{id:"oName"}),React.createElement("div",{id:"teamO"},n))),React.createElement("div",{id:"buttons"},React.createElement("button",{type:"exist",onClick:o},"Find Another Team"),React.createElement("button",{type:"exist"},"Play Game")))},o=async()=>{const a=Math.floor(Math.random()*t.accounts.length),r=await fetch(`/theirTeam?team=${t.accounts[a].owner}`);c=await r.json(),ReactDOM.render(React.createElement(i,{csrf:e}),document.getElementById("stage"));const o=n.team[0].team,s=c.team.team,d=await fetch("/user"),m=await d.json(),l=await fetch(`/oUser?id=${c.team.owner}`),h=await l.json();document.querySelector("#pName").innerHTML=m.username,document.querySelector("#oName").innerHTML=h.username;for(let e=0;e<o.length;e++){const t=await fetch(`/getCharacter?name=${o[e]}`),a=await t.json(),n=document.getElementById("p"+e);n.src=a.character.image,n.disable=!1,document.getElementById(`characterSlot${e}`).innerHTML+=`<input id="_id" type="hidden" name="_id" value=${a.character._id} />`}for(let e=0;e<s.length;e++){const t=await fetch(`/getCharacter?name=${s[e]}`),a=await t.json(),n=document.getElementById("o"+e);n.src=a.character.image,n.disable=!1,document.getElementById(`characterSlot${e}`).innerHTML+=`<input id="_id" type="hidden" name="_id" value=${a.character._id} />`}};window.onload=async()=>{const a=await fetch("/getToken"),c=await a.json();e=c.csrfToken;const i=await fetch("/yourTeam");n=await i.json();const o=await fetch("/accounts");t=await o.json(),console.log(t),ReactDOM.render(React.createElement(r,{team:n.team[0]}),document.getElementById("stage"))}})()})();