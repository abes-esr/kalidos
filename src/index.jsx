import $ from 'jquery';
import './style.css';
window.jQuery = window.$ = $;
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'startbootstrap-sb-admin-2/css/sb-admin-2.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'dropzone';

Dropzone.autoDiscover = false;


import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from "react-router-dom";
import TopBar from './Components/TopBar/TopBar';
import TopBarEmpty from './Components/TopBar/TopBarEmpty';
import AppRouter from './Components/Router/Router';
import store from './store/index';
import { Provider } from 'react-redux';
import { addErrorTest, cleanResult } from './actions/index';

window.store = store;
window.addErrorTest = addErrorTest;
window.cleanResult = cleanResult;

import PageDeSaisie from './Components/PageDeSaisie/PageDeSaisie';
import ExamplePage2 from './Components/ExamplePage/ExamplePage2';
import ExamplePage3 from './Components/ExamplePage/ExamplePage3';
import InterfaceVerif from './Components/InterfaceVerif/InterfaceVerif';
// import TempInterfaceVerif from './Components/InterfaceVerif/TempInterfaceVerif';
// import TempInterfaceVerif2 from './Components/InterfaceVerif/TempInterfaceVerif2';
import PageDeRegles from './Components/PageDeRegles/PageDeRegles';

const Content = () => (
    <div>
        <Route
            render={({ location }) => location.pathname !== "/interfaceVerif"
                ? <TopBarEmpty />
                : <TopBar />
            }
        />
        <div className="container">

            <Route exact path="/" component={PageDeSaisie} />
            <Route path="/examplePage2" component={ExamplePage2} />
            <Route path="/examplePage3" component={ExamplePage3} />
            <Route path="/interfaceVerif" component={InterfaceVerif} />
            {/* <Route path="/tempInterfaceVerif" component={TempInterfaceVerif} />
            <Route path="/tempInterfaceVerif2" component={TempInterfaceVerif2} /> */}
            <Route path="/interfaceRegles" component={PageDeRegles} />


        </div>
    </div>
);

const Wrapper = () => (
    <div id="wrapper">
        <Router>

            <AppRouter />

            <div id="content-wrapper" className="d-flex flex-column">


                <Content />


                <footer className="sticky-footer bg-white"
                    style={{
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        zIndex: 0,
                    }}>
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; BiblioDev 2021</span>
                        </div>
                    </div>
                </footer>

            </div>
        </Router>
    </div>
);

ReactDOM.render(<Provider store={store}><Wrapper /></Provider>, document.getElementById('wrapperContent'));
