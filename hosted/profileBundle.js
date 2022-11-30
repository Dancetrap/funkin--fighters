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

eval("const handleError = message => {\n  document.getElementById('errorMessage').textContent = message;\n  document.getElementById('domoMessage').classList.remove('hidden');\n};\n\n// Only for the login page\nconst loginError = message => {\n  document.getElementById('bf').src = \"/assets/img/bfmiss.png\";\n  document.getElementById('gf').src = \"/assets/img/gfmiss.png\";\n  document.getElementById(\"user\").style.borderColor = \"red\";\n  document.getElementById(\"pass\").style.borderColor = \"red\";\n  // document.getElementById(\"pass2\").style.borderColor = \"red\";\n\n  document.getElementById('loginMessage').textContent = message;\n  document.getElementById('loginMessage').classList.remove('hidden');\n};\nconst signUpError = message => {\n  document.getElementById('bf').src = \"/assets/img/bfmiss.png\";\n  document.getElementById('gf').src = \"/assets/img/gfmiss.png\";\n  document.getElementById(\"user\").style.borderColor = \"red\";\n  document.getElementById(\"pass\").style.borderColor = \"red\";\n  document.getElementById(\"pass2\").style.borderColor = \"red\";\n  document.getElementById('loginMessage').textContent = message;\n  document.getElementById('loginMessage').classList.remove('hidden');\n};\n\n/* Sends post requests to the server using fetch. Will look for various\r\n   entries in the response JSON object, and will handle them appropriately.\r\n*/\n\nconst post = async (url, data, handler) => {\n  const response = await fetch(url, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  });\n  const result = await response.json();\n  return result;\n};\nconst sendPost = async (url, data, handler) => {\n  const response = await fetch(url, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  });\n  const result = await response.json();\n  document.getElementById('domoMessage').classList.add('hidden');\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    handleError(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst hideError = () => {\n  document.getElementById('domoMessage').classList.add('hidden');\n};\nconst hideThing = () => {\n  document.getElementById('loginMessage').classList.add('hidden');\n};\nconst vDomo = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n  document.getElementById('domoMessage').classList.add('hidden');\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    handleError(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst loginAccountPage = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    loginError(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst signUpAccountPage = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    signUpError(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nmodule.exports = {\n  handleError,\n  loginError,\n  signUpError,\n  sendPost,\n  hideError,\n  hideThing,\n  vDomo,\n  loginAccountPage,\n  signUpAccountPage\n};\n\n//# sourceURL=webpack://Logins/./client/helper.js?");

/***/ }),

/***/ "./client/profile.jsx":
/*!****************************!*\
  !*** ./client/profile.jsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\");\nlet csrfToken;\nlet team;\nlet images;\nlet ids;\nlet victories;\nlet account;\nconst uploadFile = async e => {\n  e.preventDefault();\n  const _csrf = e.target.querySelector(\"#_csrf\").value;\n  const response = await fetch('/upload', {\n    method: 'POST',\n    body: new FormData(e.target)\n  });\n  const text = await response.text();\n  console.log(text);\n  // document.getElementById('messages').innerText = text;\n\n  return false;\n};\nconst upgrade = () => {\n  const unlock = document.getElementById('premium');\n  unlock.style.backgroundColor = \"black\";\n  unlock.textContent = \"Unlocked\";\n};\nconst premiumMode = async e => {\n  const response = await fetch('/unlock', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({\n      _csrf: csrfToken\n    })\n  });\n  // Need to make this a callback\n  const result = await response.json();\n  // console.log(result);\n\n  if (result.message) {\n    upgrade();\n  }\n};\nconst checkIfUnlocked = () => {\n  const pre = Object.values(account)[0].premium;\n  if (pre) {\n    upgrade();\n  }\n};\n\n// window.onload = init;\n\nconst init = async () => {\n  const response = await fetch('/getToken');\n  const data = await response.json();\n  csrfToken = data.csrfToken;\n\n  // const load = await fetch('/load', {\n  //     method: 'POST',\n  //     headers: {\n  //       'Content-Type': 'application/json',\n  //     },\n  //     body: JSON.stringify({ _csrf: csrfToken }),\n  //   });\n\n  // const makeTeam = await fetch('/loadTeam', {\n  //     method: 'POST',\n  //     headers: {\n  //       'Content-Type': 'application/json',\n  //     },\n  //     body: JSON.stringify({ _csrf: csrfToken }),\n  // });\n\n  const load = await fetch('/load', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({\n      _csrf: csrfToken\n    })\n  });\n  const getTeam = await fetch('/yourTeam');\n  team = await getTeam.json();\n  if (team.error) {\n    const makeTeam = await fetch('/loadTeam', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        _csrf: csrfToken\n      })\n    });\n    const getTeam = await fetch('/yourTeam');\n    team = await getTeam.json();\n  }\n  const add = await fetch('/getSome');\n  victories = await add.json();\n\n  // const premi = await fetch('/unlock');\n  // const premium = await premi.json();\n  // console.log(premium);\n\n  const acc = await fetch('/account');\n  account = await acc.json();\n  console.log(account);\n  checkIfUnlocked();\n  ReactDOM.render( /*#__PURE__*/React.createElement(TeamMembers, {\n    csrf: csrfToken,\n    obj: team\n  }), document.getElementById('team'));\n  ReactDOM.render( /*#__PURE__*/React.createElement(Pfp, {\n    csrf: csrfToken\n  }), document.getElementById('pfp'));\n  ReactDOM.render( /*#__PURE__*/React.createElement(WinnersAndLosers, {\n    vic: victories\n  }), document.getElementById('wins'));\n  const uploadForm = document.getElementById('hover');\n  uploadForm.addEventListener('submit', uploadFile);\n  const unlock = document.getElementById('premium');\n  unlock.addEventListener('click', premiumMode);\n  console.log(unlock);\n};\nconst Pfp = props => {\n  return /*#__PURE__*/React.createElement(\"div\", {\n    id: \"ppf\"\n  }, /*#__PURE__*/React.createElement(\"form\", {\n    action: \"/upload\",\n    key: \"prof\",\n    id: \"hover\"\n  }, /*#__PURE__*/React.createElement(\"input\", {\n    type: \"image\",\n    height: \"250\",\n    width: \"250\",\n    src: \"/assets/img/profileIcon.png\",\n    id: \"picture\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    type: \"image\",\n    height: \"250\",\n    width: \"250\",\n    src: \"/assets/img/choose.png\",\n    id: \"change\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: csrfToken\n  })));\n};\nconst TeamMembers = props => {\n  const content = [];\n  // const theTeam = team.team[0].team;\n\n  for (let i = 0; i < props.obj.length; i++) {\n    const imageForm = /*#__PURE__*/React.createElement(\"form\", {\n      id: \"characterSlot\" + i,\n      action: \"/remove\",\n      method: \"POST\",\n      className: \"d-sides\",\n      key: i\n    }, /*#__PURE__*/React.createElement(\"input\", {\n      type: \"image\",\n      height: \"50\",\n      width: \"50\",\n      src: props.obj[i].image,\n      className: \"player\",\n      id: i,\n      disabled: true\n    }), /*#__PURE__*/React.createElement(\"input\", {\n      id: \"_id\",\n      type: \"hidden\",\n      name: \"_id\",\n      value: props.obj[i]._id\n    }), /*#__PURE__*/React.createElement(\"input\", {\n      id: \"_csrf\",\n      type: \"hidden\",\n      name: \"_csrf\",\n      value: csrfToken\n    }));\n    content.push(imageForm);\n  }\n  for (let i = props.obj.length; i < 20; i++) {\n    const imageForm = /*#__PURE__*/React.createElement(\"form\", {\n      id: \"characterSlot\" + i,\n      action: \"/remove\",\n      method: \"POST\",\n      className: \"d-sides\",\n      key: i\n    }, /*#__PURE__*/React.createElement(\"input\", {\n      type: \"image\",\n      height: \"50\",\n      width: \"50\",\n      src: \"/assets/img/150.png\",\n      className: \"player\",\n      id: i,\n      disabled: true\n    }), /*#__PURE__*/React.createElement(\"input\", {\n      id: \"_csrf\",\n      type: \"hidden\",\n      name: \"_csrf\",\n      value: csrfToken\n    }));\n    content.push(imageForm);\n  }\n  return content;\n};\nconst WinnersAndLosers = props => {\n  const content = [];\n  content.push( /*#__PURE__*/React.createElement(\"h3\", {\n    key: \"wins\"\n  }, \"Wins: \", props.vic.wins));\n  content.push( /*#__PURE__*/React.createElement(\"h3\", {\n    key: \"losses\"\n  }, \"Losses: \", props.vic.losses));\n  return content;\n};\nwindow.onload = init;\n\n//# sourceURL=webpack://Logins/./client/profile.jsx?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client/profile.jsx");
/******/ 	
/******/ })()
;