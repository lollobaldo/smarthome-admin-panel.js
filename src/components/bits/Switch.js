import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import './Switch.scss';

const StyledLabel = styled.label`
  & * {
    // Needed to avoid blue box on click
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  position: relative;
  display: inline-block;
  width: 2em;
  height: 1.4em;

  /* Hide default HTML checkbox */
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.3em;
    width: 1.3em;
    left: 0.05em;
    bottom: 0.05em;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #4CAF50;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #4CAF50;
  }

  input:checked + .slider:before {
    transform: translateX(0.6em);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 100px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

const Switch = ({ state, handler }) => (
  <StyledLabel className="Switch" onClick={(e) => e.stopPropagation()}>
    <input type="checkbox"
      checked={state}
      onChange={handler} />
    <span className="slider round"></span>
  </StyledLabel>
);

Switch.propTypes = {
  state: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Switch;
