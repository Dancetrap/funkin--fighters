(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("domoMessage").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,o,n)=>{const s=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),r=await s.json();document.getElementById("domoMessage").classList.add("hidden"),r.redirect&&(window.location=r.redirect),r.error&&t(r.error),n&&n(r)},hideError:()=>{document.getElementById("domoMessage").classList.add("hidden")}}}},t={};function o(n){var s=t[n];if(void 0!==s)return s.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,o),r.exports}(()=>{let e;o(603),window.onload=async()=>{const t=await fetch("/getToken"),o=await t.json();e=o.csrfToken;const n=await fetch("/accounts"),s=await n.json();console.log(s)}})()})();