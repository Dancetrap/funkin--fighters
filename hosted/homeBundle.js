/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/helper.js":
/*!**************************!*\
  !*** ./client/helper.js ***!
  \**************************/
/***/ ((module) => {

eval("const handleError = message => {\n  document.getElementById('errorMessage').textContent = message;\n  document.getElementById('domoMessage').classList.remove('hidden');\n};\n\n// Only for the login page\nconst loginError = message => {\n  document.getElementById('bf').src = \"/assets/img/bfmiss.png\";\n  document.getElementById('gf').src = \"/assets/img/gfmiss.png\";\n  document.getElementById(\"user\").style.borderColor = \"red\";\n  document.getElementById(\"pass\").style.borderColor = \"red\";\n  // document.getElementById(\"pass2\").style.borderColor = \"red\";\n\n  document.getElementById('loginMessage').textContent = message;\n  document.getElementById('loginMessage').classList.remove('hidden');\n};\nconst signUpError = message => {\n  document.getElementById('bf').src = \"/assets/img/bfmiss.png\";\n  document.getElementById('gf').src = \"/assets/img/gfmiss.png\";\n  document.getElementById(\"user\").style.borderColor = \"red\";\n  document.getElementById(\"pass\").style.borderColor = \"red\";\n  document.getElementById(\"pass2\").style.borderColor = \"red\";\n  document.getElementById('loginMessage').textContent = message;\n  document.getElementById('loginMessage').classList.remove('hidden');\n};\n\n/* Sends post requests to the server using fetch. Will look for various\r\n   entries in the response JSON object, and will handle them appropriately.\r\n*/\n\nconst post = async (url, data, handler) => {\n  const response = await fetch(url, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  });\n  const result = await response.json();\n  return result;\n};\nconst sendPost = async (url, data, handler) => {\n  const response = await fetch(url, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  });\n  const result = await response.json();\n  document.getElementById('domoMessage').classList.add('hidden');\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    handleError(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst hideError = () => {\n  document.getElementById('domoMessage').classList.add('hidden');\n};\nconst hideThing = () => {\n  document.getElementById('loginMessage').classList.add('hidden');\n};\nconst vDomo = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n  document.getElementById('domoMessage').classList.add('hidden');\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    handleError(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst loginAccountPage = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    loginError(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst signUpAccountPage = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    signUpError(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst setColor = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n  // console.log(result.head);\n\n  const nav = document.querySelector('nav');\n  const body = document.querySelector('body');\n  const buttons = document.querySelectorAll('button');\n  const links = document.querySelectorAll('a');\n  const submits = document.querySelector('.formSubmit');\n  // console.log(submits);\n\n  // console.log(luma(result.head));\n  // if it's true, then set text to white, else set it to black\n\n  nav.style.backgroundColor = result.head;\n  body.style.backgroundColor = result.body;\n  if (luma(result.body)) {\n    body.style.color = \"white\";\n  } else {\n    body.style.color = \"black\";\n  }\n  buttons.forEach(button => button.style.backgroundColor = result.head);\n  links.forEach(a => a.style.backgroundColor = result.head);\n  if (luma(result.head)) {\n    buttons.forEach(button => button.style.color = \"white\");\n    links.forEach(a => a.style.color = \"white\");\n  } else {\n    buttons.forEach(button => button.style.color = \"black\");\n    links.forEach(a => a.style.color = \"black\");\n  }\n  const unlock = document.getElementById('premium');\n  if (unlock != null || unlock != undefined) {\n    if (luma(result.head)) {\n      unlock.style.backgroundColor = \"white\";\n      unlock.style.color = result.head;\n    } else {\n      unlock.style.backgroundColor = result.head;\n      unlock.style.color = \"black\";\n    }\n  }\n};\nconst luma = a => {\n  var c = a.substring(1); // strip #\n  var rgb = parseInt(c, 16); // convert rrggbb to decimal\n  var r = rgb >> 16 & 0xff; // extract red\n  var g = rgb >> 8 & 0xff; // extract green\n  var b = rgb >> 0 & 0xff; // extract blue\n\n  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709\n\n  return luma < 50;\n  // if (luma < 40) {\n  //     // pick a different colour\n  // }\n};\n\nmodule.exports = {\n  handleError,\n  loginError,\n  signUpError,\n  sendPost,\n  hideError,\n  hideThing,\n  vDomo,\n  loginAccountPage,\n  signUpAccountPage,\n  setColor,\n  luma\n};\n\n//# sourceURL=webpack://Logins/./client/helper.js?");

/***/ }),

/***/ "./client/home.jsx":
/*!*************************!*\
  !*** ./client/home.jsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\");\nconst premium = __webpack_require__(/*! ./premium.js */ \"./client/premium.js\");\nconst init = () => {\n  premium.init();\n};\nwindow.onload = init;\n\n//# sourceURL=webpack://Logins/./client/home.jsx?");

/***/ }),

/***/ "./client/premium.js":
/*!***************************!*\
  !*** ./client/premium.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\");\nlet account;\nlet premium;\nlet headercolor;\nlet bodycolor;\nconst init = async () => {\n  const acc = await fetch('/account');\n  account = await acc.json();\n  premium = Object.values(account)[0].premium;\n  headercolor = Object.values(account)[0].header;\n  bodycolor = Object.values(account)[0].body;\n  if (premium) {\n    const nav = document.querySelector('nav');\n    const body = document.querySelector('body');\n    const buttons = document.querySelectorAll('button');\n    const links = document.querySelectorAll('a');\n    nav.style.backgroundColor = headercolor;\n    body.style.backgroundColor = bodycolor;\n    if (helper.luma(bodycolor)) {\n      body.style.color = \"white\";\n    } else {\n      body.style.color = \"black\";\n    }\n    console.log(buttons);\n    buttons.forEach(button => button.style.backgroundColor = headercolor);\n    links.forEach(a => a.style.backgroundColor = headercolor);\n  }\n  document.getElementById('logo').src = account.account.picture;\n};\n\n// window.onload = init;\n\nmodule.exports = {\n  init\n};\n\n//# sourceURL=webpack://Logins/./client/premium.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/home.jsx");
/******/ 	
/******/ })()
;