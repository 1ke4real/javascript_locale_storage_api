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

/***/ "./src/interet.js":
/*!************************!*\
  !*** ./src/interet.js ***!
  \************************/
/***/ (() => {

eval("var point = document.querySelector('#allpoint');\nsetTimeout(function () {\n  document.querySelector('.loader').classList.add('none');\n}, 1500);\nwindow.onload = function () {\n  var lskey = Object.keys(localStorage);\n  lskey.forEach(function (key) {\n    var jsonData = JSON.parse(localStorage.getItem(key));\n    var jsonPoint = JSON.parse(localStorage.getItem('point-' + jsonData.id));\n    if (jsonPoint != null) {\n      console.log(jsonPoint);\n      point.innerHTML += '<div class=\"card \">' + '<header class=\"card-header\"> <p class=\"card-header-title is-centered\">' + jsonPoint.title + '</p></header> <br>' + '<div class=\"card-content\"><span class=\"desc-interet\">Description : ' + jsonPoint.description + '</span><br> <br>' + '<span class=\"label\">Adresse</span>' + '            <span class=\"\">Label :' + jsonData.label + '</span>' + '            <span class=\"\">Nom :' + jsonData.name + '</span> <br>' + '            <span class=\"\">Ville :' + jsonData.city + '</span> <br>' + '            <span class=\"\">Code Postal :' + jsonData.postcode + '</span></div> <br>' + '        <footer class=\"card-footer\"><button class=\"suppPoint button is-danger card-footer-item\">Supprimer</button></footer> </div> <br>';\n    }\n    document.querySelectorAll('.suppPoint').forEach(function (supp) {\n      supp.addEventListener('click', function () {\n        localStorage.removeItem('point-' + jsonPoint.idadresse);\n        location.reload();\n      });\n    });\n  });\n};\n\n//# sourceURL=webpack://td---cdc---copie/./src/interet.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/interet.js"]();
/******/ 	
/******/ })()
;