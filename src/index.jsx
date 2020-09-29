import $ from 'jquery';
import './style.css';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'startbootstrap-sb-admin-2/js/sb-admin-2'
import 'startbootstrap-sb-admin-2/css/sb-admin-2.min.css'


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TopBar from './Components/TopBar/TopBar';
import AppRouter from './Components/Router/Router';

import ExamplePage1 from './Components/ExamplePage/ExamplePage1';
import ExamplePage2 from './Components/ExamplePage/ExamplePage2';
import ExamplePage3 from './Components/ExamplePage/ExamplePage3';



const Content = () => (
    <div>
        <TopBar />

        <div className="container">

            <Route exact path="/" component={ExamplePage1} />
            <Route path="/examplePage2" component={ExamplePage2} />
            <Route path="/examplePage3" component={ExamplePage3} />
        </div>
    </div>
);

const Wrapper = () => (
    <div id="wrapper">
        <Router>

            <AppRouter />

            <div id="content-wrapper" className="d-flex flex-column">


                <Content />


                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; Your Website 2020</span>
                        </div>
                    </div>
                </footer>

            </div>
        </Router>
    </div>
);

ReactDOM.render(<Wrapper />, document.getElementById('wrapperContent'));


// function hide (name) {
//     var x = document.getElementById(name);
//     x.style.display = "none";
// }

// function show(name) {
//     var x = document.getElementById(name);
//     if (x.style.display === "none") {
//         x.style.display = "block";
//     }
// }


// $('#myform input').on('change', function() {
//     var option = $('input[name=optionsRadios]:checked', '#myform').val();
//     if(option === "option1") {
//         hide("cible")
//         show("charRegexExclusion")
//     } else if(option === "option2"){
//         hide("cible")
//         hide("charRegexExclusion")
//     }else if(option === "option3"){
//         show("cible")
//         hide("charRegexExclusion")
//     }
// });


// var ruleData = [
//     {
//         "Number": 200,
//         "Code" : "",
//         "Rule": {
//             "regex" : "(.*)",
//             "type" : "matching",
//             "message" : "valeur présente"
//         }
//     },
//     {
//         "Number": 201,
//         "Code" : "c",
//         "Rule": {
//             "regex" :"^(.*$.*)",
//             "type" : "matching",
//             "message" : "caractères interdits : $"
//         }
//     },
//     {
//         "Number": 203,
//         "Code" : 4,
//         "Rule": {
//             "regex" : "204 c",
//             "type" : "dependance",
//             "message" :"dépendance champ : 204-c"
//         }
//     },
//         {
//         "Number": 204,
//         "Code": "c",
//         "Rule": {
//             "regex" : "203 4",
//             "type" : "dependance",
//             "message" :"dépendance champ : 203-4"
//         }
//     },
//     {
//         "Number": 204,
//         "Code": "f",
//         "Rule": {
//             "regex" : "(.*)",
//             "type" : "matching",
//             "message" : "valeur présente"
//         }
//     }
// ];

// function addDataToTbody(nl, data) {
//     data.forEach((d, i) => {
//         var tr = nl.insertRow(i);
//         Object.keys(d).forEach((k, j) => {
//             var cell = tr.insertCell(j);
//             if(k === "Rule") {
//                 cell.innerHTML = d[k].message;
//             } else {
//                 cell.innerHTML = d[k];
//             }
//         });
//         nl.appendChild(tr);
//     })
// }

// var rulesTbody = document.querySelector("#rules tbody");

// addDataToTbody(rulesTbody, ruleData);

