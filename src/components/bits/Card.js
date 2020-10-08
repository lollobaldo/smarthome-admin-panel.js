import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 16px 8px;
  width: 100px;
  // width: 100px;
  height: 100px;
  // flex-basis: 30%;
  border-radius: 20%;
  background: white;
  padding: 10px;

  &.cardicon {
    display: flex;
  }

  & .cardicon-icon {
    margin: auto;
    width: 75%;
    height: 75%;
  }

  h4 {
    width: 100%;
    margin: 0;
    font-size: 1em;
    display: flex;
    justify-content: space-between;

    span.value {
      margin: 0;
      color: #888;
    }
  }

  & p{
    margin: 0;
    color: #888;
  }
`;

const StyledIcon = styled.img`
  width: 50px;
  flex-basis: 80%;
`;

const Card = ({
  onClick, name, icon, value,
}) => (
  <StyledCard onClick={onClick} className="card">
    <StyledIcon src={icon} />
    <h4><span>{name}: </span><span className="value">{value}</span></h4>
  </StyledCard>
);

const CardIcon = ({
  isActive, onClick, icon, color, bg,
}) => (
  <StyledCard
    className="card"
    style={isActive ? { background: bg } : null}
    onClick={onClick}>
    <FontAwesomeIcon
      icon={icon}
      size="3x"
      color={isActive ? 'white' : color}
      className="cardicon-icon" />
  </StyledCard>
);

Card.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.any.isRequired,
  color: PropTypes.string,
  value: PropTypes.any.isRequired,
};

CardIcon.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  icon: PropTypes.any.isRequired,
  color: PropTypes.string,
  bg: PropTypes.string,
};

export default { Card, CardIcon };
