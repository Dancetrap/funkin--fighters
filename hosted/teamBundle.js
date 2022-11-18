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

eval("const handleError = message => {\n  document.getElementById('errorMessage').textContent = message;\n  document.getElementById('domoMessage').classList.remove('hidden');\n};\n\n/* Sends post requests to the server using fetch. Will look for various\r\n   entries in the response JSON object, and will handle them appropriately.\r\n*/\nconst sendPost = async (url, data, handler) => {\n  const response = await fetch(url, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  });\n  const result = await response.json();\n  document.getElementById('domoMessage').classList.add('hidden');\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    handleError(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst hideError = () => {\n  document.getElementById('domoMessage').classList.add('hidden');\n};\nmodule.exports = {\n  handleError,\n  sendPost,\n  hideError\n};\n\n//# sourceURL=webpack://Logins/./client/helper.js?");

/***/ }),

/***/ "./client/team.jsx":
/*!*************************!*\
  !*** ./client/team.jsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\");\nlet csrfToken;\nlet team;\nconst CharacterSearch = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"characterForm\",\n    action: \"characters\",\n    method: \"post\"\n  }, /*#__PURE__*/React.createElement(\"input\", {\n    id: \"characterField\",\n    type: \"search\",\n    name: \"name\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: csrfToken\n  }));\n};\nconst init = async () => {\n  const response = await fetch('/getToken');\n  const data = await response.json();\n\n  // const load = await fetch('/load');\n  // const onLoad = await load.json();\n\n  // const wait = await fetch(`/getCharacter?name=636e6574f553b97a16cfc184`);\n  // const obj = await wait.json();\n  // console.log(obj);\n\n  // await updateMembers();\n\n  csrfToken = data.csrfToken;\n  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterSearch, {\n    csrf: csrfToken\n  }), document.getElementById('search'));\n  const searchBox = document.querySelector('#characterField');\n  searchBox.addEventListener('input', async () => {\n    ReactDOM.unmountComponentAtNode(document.getElementById('results'));\n    const response = await fetch(`/searchCharacters?name=${searchBox.value}`);\n    const obj = await response.json();\n    ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {\n      character: obj\n    }), document.getElementById('results'));\n  });\n\n  // const getTeam = await fetch('/getTeam');\n  // const theTeam = await getTeam.json();\n  // console.log(theTeam);\n  // await updateMembers();\n\n  const getTeam = await fetch('/yourTeam');\n  team = await getTeam.json();\n  await ReactDOM.render( /*#__PURE__*/React.createElement(TeamMembers, {\n    csrf: csrfToken\n  }), document.getElementById('team'));\n  const load = await fetch('/load', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({\n      _csrf: csrfToken\n    })\n  });\n  const makeTeam = await fetch('/loadTeam', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({\n      _csrf: csrfToken\n    })\n  });\n  console.log(team);\n\n  // await updateMembers();\n};\n\nconst updateTeam = async e => {\n  e.preventDefault();\n  helper.hideError();\n  if (!e.target.querySelector(\"#_id\")) {\n    return false;\n  }\n  const _id = e.target.querySelector(\"#_id\").value;\n  const _csrf = e.target.querySelector(\"#_csrf\").value;\n  if (!_id || !_csrf) {\n    helper.handleError('All fields are required!');\n    return false;\n  }\n  helper.sendPost(e.target.action, {\n    _id,\n    _csrf\n  });\n\n  // const response = await fetch('/yourTeam');\n  // const data = await response.json();\n  // await updateMembers();\n  // console.log(data);\n\n  ReactDOM.render( /*#__PURE__*/React.createElement(TeamMembers, {\n    csrf: csrfToken\n  }), document.getElementById('team'));\n  return false;\n};\nconst CharacterList = props => {\n  if (props.character.length === 0 || props.character.length === undefined) {\n    return /*#__PURE__*/React.createElement(\"div\", {\n      className: \"characterList\"\n    }, /*#__PURE__*/React.createElement(\"h3\", {\n      className: \"emptyDomo\"\n    }, \"Nothing\"));\n  }\n  const characters = props.character.map(chr => {\n    return (\n      /*#__PURE__*/\n      // <div key = {chr._id} className=\"char\">\n      //     {/* <img src={chr.image} alt={chr.name} height=\"150px\" style=\"object-fit: contain;\" id={chr._id}></img> */}\n      //     <h3 className=\"domoName\"> Name: {chr.name} </h3>\n      //     {/* <h3 className=\"domoAge\"> Age: {domo.age} </h3> */}\n      // </div>\n      React.createElement(\"form\", {\n        id: \"addToTeam\",\n        name: chr.name,\n        key: chr._id,\n        onSubmit: updateTeam,\n        action: \"/add\",\n        method: \"POST\",\n        className: \"set\"\n      }, /*#__PURE__*/React.createElement(\"input\", {\n        type: \"image\",\n        height: \"150\",\n        src: chr.image\n      }), /*#__PURE__*/React.createElement(\"h3\", {\n        className: \"characterName\"\n      }, \" \", chr.name, \" \"), /*#__PURE__*/React.createElement(\"input\", {\n        id: \"_id\",\n        type: \"hidden\",\n        name: \"_id\",\n        value: chr._id\n      }), /*#__PURE__*/React.createElement(\"input\", {\n        id: \"_csrf\",\n        type: \"hidden\",\n        name: \"_csrf\",\n        value: csrfToken\n      }))\n    );\n  });\n  return /*#__PURE__*/React.createElement(\"div\", {\n    className: \"characterList\"\n  }, characters);\n};\nconst TeamMembers = async props => {\n  let content = [];\n  const theTeam = team.team[0].team;\n  // console.log(theTeam);\n\n  for (let i = 0; i < theTeam.length; i++) {\n    const wait = await fetch(`/getCharacter?name=${theTeam[i]}`);\n    const obj = await wait.json();\n    // console.log(obj);\n    const imageForm = /*#__PURE__*/React.createElement(\"form\", {\n      id: \"characterSlot\" + i,\n      action: \"/remove\",\n      method: \"POST\",\n      className: \"d-sides\",\n      key: i,\n      onSubmit: updateTeam\n    }, /*#__PURE__*/React.createElement(\"input\", {\n      type: \"image\",\n      height: \"50\",\n      width: \"50\",\n      src: obj.character.image,\n      className: \"player\",\n      id: i\n    }), /*#__PURE__*/React.createElement(\"input\", {\n      id: \"_id\",\n      type: \"hidden\",\n      name: \"_id\",\n      value: obj.character._id\n    }), /*#__PURE__*/React.createElement(\"input\", {\n      id: \"_csrf\",\n      type: \"hidden\",\n      name: \"_csrf\",\n      value: csrfToken\n    }));\n    content.push(imageForm);\n  }\n  for (let i = theTeam.length; i < 20; i++) {\n    const imageForm = /*#__PURE__*/React.createElement(\"form\", {\n      id: \"characterSlot\" + i,\n      action: \"/remove\",\n      method: \"POST\",\n      className: \"d-sides\",\n      key: i,\n      onSubmit: updateTeam\n    }, /*#__PURE__*/React.createElement(\"input\", {\n      type: \"image\",\n      height: \"50\",\n      width: \"50\",\n      src: \"/assets/img/150.png\",\n      className: \"player\",\n      id: i,\n      disabled: true\n    }), /*#__PURE__*/React.createElement(\"input\", {\n      id: \"_csrf\",\n      type: \"hidden\",\n      name: \"_csrf\",\n      value: csrfToken\n    }));\n    content.push(imageForm);\n  }\n  return content;\n};\nconst updateMembers = async e => {\n  // const getTeam = await fetch('/yourteam');\n  // const theTeam = await getTeam.json();\n\n  const members = team.team[0].team;\n  // for(let i = 0; i < e.character.team.length; i++)\n  for (let i = members.length; i < 20; i++) {\n    const addition = document.getElementById(`characterSlot${i}`);\n    const idInput = addition.querySelector('#_id');\n    if (idInput != null) {\n      addition.removeChild(idInput);\n    }\n    const img = document.getElementById(i);\n    img.src = \"/assets/img/150.png\";\n    img.disable = true;\n  }\n  if (members.length != 0) {\n    for (let i = 0; i < members.length; i++) {\n      const wait = await fetch(`/getCharacter?name=${members[i]}`);\n      const obj = await wait.json();\n      const img = document.getElementById(i);\n      // console.log(img.height);\n      img.src = obj.character.image;\n      // Disable is not working\n      img.disable = false;\n      const addition = document.getElementById(`characterSlot${i}`);\n      addition.innerHTML += `<input id=\"_id\" type=\"hidden\" name=\"_id\" value=${obj.character._id} />`;\n      // What's suppose to happen\n      // For every character on the team\n      // Get the input with the id of that number\n      // src equals character image\n      // enable it\n      // If all becomes twenty \n    }\n  }\n\n  // ReactDOM.render(\n  //     <TeamMembers csrf={csrfToken} />,\n  //     document.getElementById('team')\n  // );\n};\n\nwindow.onload = init;\n\n//# sourceURL=webpack://Logins/./client/team.jsx?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client/team.jsx");
/******/ 	
/******/ })()
;