import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import posed, { PoseGroup } from "react-pose";


import './Header.scss';

import profilePic from '../../res/pp.jpg';
import arrowLeft from '../../res/icons/icons8-left-50.png';

const SpanLeft = posed.p({
  enter: {
    x: 0,
    duration: 150,
    delay: 150,
  },
  exit: {
    duration: 150,
    x: '-100%',
  }
});

const SpanUp = posed.p({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    y: '-100%',
    opacity: 0,
    transition: { duration: 150 }
  }
});


const Header = ({ location }) => {
  return (
    <header className="w3-container w3-xlarge w3-padding-16 w3-card">
      <div className="header-container">
        <Switch>
          <Route path="/lights">
            <SpanLeft>
              <Link to="/">
                <img src={arrowLeft} className="icon-back" />
              </Link>
              Lights
              <img src={profilePic} className="user-icon" />
            </SpanLeft>
          </Route>
          <Route exact path="/">
            <SpanUp>
              Hello Lorenzo!
              <img src={profilePic} className="user-icon" />
            </SpanUp>
          </Route>
        </Switch>
      </div>
    </header>
)}

export default Header;
