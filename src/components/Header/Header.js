import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'styled-theming';

import { path2title } from 'src/utils';

import { card } from 'utils/themes';

// import profilePic from 'res/pp.jpg';
import arrowLeft from 'res/icons/icons8-left-50.png';
import day from 'res/icons/day.svg';
import night from 'res/icons/night.svg';

const StyledHeader = styled.header`
  ${theme('mode', card)}
  z-index: 10;
  height: 70px;

  @media only screen and (orientation: landscape) {
    display: none;
  }

  & p {
    margin: 0;
  }

  & .icon-back {
    height: 1.5em;
    margin-right: 16px;
  }

  & span {
    vertical-align: middle;
  }
`;

const NightModeButton = styled.button`
  float: right;
  width: 1.5em;
  border: 0;
  padding: 0;
  background: none;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const themeIcons = { light: day, dark: night };

const Header = ({ page, selectedTheme, changeTheme }) => (
  <StyledHeader className="w3-container w3-xlarge w3-padding-16 w3-card">
    <div className="header-container">
      <p>
        {page.path !== '/'
          ? (<Link to='/'>
              <img src={arrowLeft}
                className="icon-back" />
            </Link>)
          : null}
        {page.title || path2title(page.path)}
        <NightModeButton onClick={changeTheme}>
          <img src={themeIcons[selectedTheme]}
            alt="Change theme" />
        </NightModeButton>
      </p>
    </div>
  </StyledHeader>
);

Header.propTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  page: PropTypes.shape({
    path: PropTypes.string.isRequired,
    label: PropTypes.string,
  }).isRequired,
}).isRequired;

export default Header;
