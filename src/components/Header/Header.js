import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import posed from "react-pose";


import './Header.scss';

import profilePic from '../../res/pp.jpg';
import arrowLeft from '../../res/icons/icons8-left-50.png';

const SpanRight = posed.p({
  enter: {
    x: 0,
    // delay: 150,
  },
  exit: {
    x: -50,
  }
});

const SpanDown = posed.p({
  enter: {
    y: 0,
    // delay: 150,
  },
  exit: {
    y: -50,
  }
});


const Header = () => {
  return (
    <header className="w3-container w3-xlarge w3-padding-16 w3-card">
      <div className="header-container">
        <Switch>
          <Route exact path="/">
            {/* <p> */}
              <SpanDown>Hello Lorenzo!</SpanDown>
              <img src={profilePic} className="user-icon" />
            {/* </p> */}
          </Route>
          <Route>
            {/* <p> */}
              <SpanRight>
                <Link to="/">
                  <img src={arrowLeft} className="icon-back" />
                </Link>
                <span>Lights</span>
              </SpanRight>
              <img src={profilePic} className="user-icon" />
            {/* </p> */}
          </Route>
        </Switch>
      </div>
    </header>
)}

export default Header;
