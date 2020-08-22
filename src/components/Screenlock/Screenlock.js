import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { screenLockStatus } from 'utils/constants';

import './Screenlock.scss';

const Screenlock = ({
  onLock, onUnlock, status, pin,
}) => {
  const black = status !== screenLockStatus.INSERTING_PIN;
  const pinNeeded = status === screenLockStatus.INSERTING_PIN;

  let screenlockTimeoutID = useRef(null);
  let locked = useRef(true);

  const resetLockTimer = () => {
    clearTimeout(screenlockTimeoutID);
    if (locked) {
      screenlockTimeoutID = setTimeout(() => onLock(), 5000);
    }
  };

  if (pinNeeded) {
    resetLockTimer();
  }

  return (
    <div
      className={`screen-lock--${black ? 'locked' : 'pin'}`}
      onDoubleClick={() => (black && onUnlock())}>
        {pinNeeded
          ? <ScreenlockPin
              onClick={resetLockTimer}
              onUnlock={() => {
                locked = false;
                onUnlock();
              }}
              correctPin={pin} />
          : null }
    </div>
  );
};

const ScreenlockPin = ({ onClick, onUnlock, correctPin }) => {
  const [pin, setPin] = useState('');

  const pinPressed = (v) => {
    if (v === 'c') {
      setPin(pin.slice(0, -1));
    } else {
      setPin(pin + v);
      if (pin + v === correctPin.toString()) {
        onUnlock();
      }
    }
  };

  return (
    <div
      className="screen-lock-pin w3-card-4"
      onClick={onClick}>
        <div className="dots">
          {pin.split('').map((_, i) => (
            <span key={i}>•</span>
          ))}
        </div>
        <input type="button" value="1" onClick={() => pinPressed('1')} />
        <input type="button" value="2" onClick={() => pinPressed('2')} />
        <input type="button" value="3" onClick={() => pinPressed('3')} />
        <input type="button" value="4" onClick={() => pinPressed('4')} />
        <input type="button" value="5" onClick={() => pinPressed('5')} />
        <input type="button" value="6" onClick={() => pinPressed('6')} />
        <input type="button" value="7" onClick={() => pinPressed('7')} />
        <input type="button" value="8" onClick={() => pinPressed('8')} />
        <input type="button" value="9" onClick={() => pinPressed('9')} />
        <input type="button" value="n" onClick={() => pinPressed('n')} />
        <input type="button" value="0" onClick={() => pinPressed('0')} />
        <input type="button" value="c" onClick={() => pinPressed('c')} />
    </div>
  );
};

Screenlock.propTypes = PropTypes.shape({
  onUnlock: PropTypes.func.isRequired,
  status: PropTypes.any,
  pin: PropTypes.number.isRequired,
}).isRequired;


ScreenlockPin.propTypes = PropTypes.shape({
  onUnlock: PropTypes.func.isRequired,
  locked: PropTypes.any,
  pin: PropTypes.number.isRequired,
}).isRequired;

export default Screenlock;
