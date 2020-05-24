import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Main from '../Main';

import './Screenlock.scss';

const Screenlock = ({ onUnlock, status, pin }) => {
  const black = status !== Main.screenLockStatus.INSERTING_PIN;
  return (
    <div
      className={`screen-lock--${black ? 'locked' : 'pin'}`}
      onDoubleClick={onUnlock}>
        {status === Main.screenLockStatus.INSERTING_PIN
          ? <ScreenlockPin
              onUnlock={onUnlock}
              correctPin={pin} />
          : null }
    </div>
  );
};

const ScreenlockPin = ({ onUnlock, correctPin }) => {
  const [pin, setPin] = useState('');

  const pinPressed = (v) => {
    console.log(`Pressed key ${v}`);
    console.log(pin.split(''));
    if (v === 'c') {
      setPin(pin.slice(0, -1));
    } else {
      setPin(pin + v);
    }
    if (pin + v === correctPin.toString()) {
      onUnlock();
    }
  };

  return (
    <div
      className="screen-lock-pin w3-card"
      onDoubleClick={onUnlock}>
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
