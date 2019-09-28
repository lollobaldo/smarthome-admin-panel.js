import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Header.scss';

const Header = () => {
  return (
    <header className="w3-container w3-xlarge w3-padding-24">
      <div className="header-container">
        <p>
          Hello Lorenzo!
          <FontAwesomeIcon
            icon={['far', 'user-circle']}
            size="lg"
            className="user-icon" />
        </p>
      </div>
    </header>
)}

export default Header;
