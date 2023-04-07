/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/locate.js":
/*!***********************!*\
  !*** ./src/locate.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_coordonate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/coordonate.mjs */ \"./src/modules/coordonate.mjs\");\n\n\n// console.log(locate(43.2883675 , 43.29768, 5.5712287, 5.571452))\n\nvar point = document.querySelector('#allpoint');\nsetTimeout(function () {\n  document.querySelector('.loader').classList.add('none');\n}, 1500);\nwindow.onload = function () {\n  var lskey = Object.keys(localStorage);\n  lskey.forEach(function (key) {\n    var jsonData = JSON.parse(localStorage.getItem(key));\n    var jsonPoint = JSON.parse(localStorage.getItem('point-' + jsonData.id));\n    if (jsonPoint != null) {\n      console.log('toto');\n      if (navigator.geolocation) {\n        navigator.geolocation.getCurrentPosition(function (position) {\n          var latUser = position.coords.latitude;\n          var longUser = position.coords.longitude;\n          point.innerHTML += '<div class=\"card \" data-locate=\"' + (0,_modules_coordonate_mjs__WEBPACK_IMPORTED_MODULE_0__.locate)(latUser, jsonData.lat, longUser, jsonData[\"long\"]) + '\">' + '<header class=\"card-header\"> <p class=\"card-header-title is-centered\">' + jsonPoint.title + '</p></header> <br>' + '<div class=\"card-content\"><span class=\"desc-interet\">Description : ' + jsonPoint.description + '</span><br> <br>' + '<span class=\"label\">Adresse</span>' + '            <span class=\"\">Label :' + jsonData.label + '</span>' + '            <span class=\"\">Nom :' + jsonData.name + '</span> <br>' + '            <span class=\"\">Ville :' + jsonData.city + '</span> <br>' + '            <span class=\"\">Code Postal :' + jsonData.postcode + '</span><br>' + ' <span class=\"title\">Distance : ' + (0,_modules_coordonate_mjs__WEBPACK_IMPORTED_MODULE_0__.locate)(latUser, jsonData.lat, longUser, jsonData[\"long\"]) + ' Km</span> <br>' + '</div> ' + '        <footer class=\"card-footer\"><button class=\"suppPoint button is-danger card-footer-item\">Supprimer</button></footer> </div> <br>';\n          document.querySelectorAll('.suppPoint').forEach(function (supp) {\n            supp.addEventListener('click', function () {\n              console.log('coucou');\n              localStorage.removeItem('point-' + jsonPoint.idadresse);\n              location.reload();\n            });\n          });\n        });\n      } else {\n        console.log(\"La géolocalisation n'est pas prise en charge par ce navigateur.\");\n      }\n    }\n  });\n};\n\n//# sourceURL=webpack://td---cdc---copie/./src/locate.js?");

/***/ }),

/***/ "./src/modules/coordonate.mjs":
/*!************************************!*\
  !*** ./src/modules/coordonate.mjs ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"locate\": () => (/* binding */ locate),\n/* harmony export */   \"toRadians\": () => (/* binding */ toRadians)\n/* harmony export */ });\n\r\n const locate = (lat2, lat1, lon2, lon1)=>{\r\n    console.log('formule')\r\n     const R = 6371;\r\n     const dLat = toRadians(lat2 - lat1);\r\n     const dLon = toRadians(lon2 - lon1);\r\n     const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);\r\n     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));\r\n     const locate = R * c;\r\n     const res = locate.toFixed(2)\r\n     return res;\r\n }\r\n\r\n const toRadians = (degrees)=> {\r\n     return degrees * (Math.PI/180);\r\n }\n\n//# sourceURL=webpack://td---cdc---copie/./src/modules/coordonate.mjs?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/locate.js");
/******/ 	
/******/ })()
;