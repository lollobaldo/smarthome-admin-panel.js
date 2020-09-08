import home from 'res/icons/home.svg';
import light from 'res/icons/light-lamp.svg';
import colorWheel2 from 'res/icons/color-wheel-2.svg';
import plant from 'res/icons/plant-potted.svg';
import heating from 'res/icons/heating.svg';

import constants from './_constants.scss';


const { red, yellow, purple } = constants;
const { redG, purpleG, blackG } = constants;

export const pages = [
  {
    path: '/',
    title: 'Hello Lorenzo!',
    icon: home,
  },
  {
    path: '/lights',
    icon: light,
  },
  {
    path: '/leds',
    icon: colorWheel2,
  },
  {
    path: '/plants',
    icon: plant,
  },
  {
    path: '/heating',
    icon: heating,
  },
  {
    path: '/trial',
    icon: null,
    show: false,
  },
];


export const screenLockStatus = {
  UNLOCKED: 1,
  LOCKED: 2,
  PIN_LOCKED: 3,
  INSERTING_PIN: 4,
};

export const serviceStatus = {
  OK: 1,
  WARNING: 2,
  ERROR: 3,
};

export const presets = [
  {
    name: 'Romantic',
    color: red,
    bg: redG,
    icon: 'heart',
  }, {
    name: 'Movie',
    color: purple,
    bg: purpleG,
    icon: 'film',
  }, {
    name: 'Night',
    color: yellow,
    bg: blackG,
    icon: 'moon',
  },
];
export const defState = {
  presets,
  auth: true,
  activePreset: -1,
  name: 'Lorenzo',
  pin: 2509,
  screenLocked: screenLockStatus.UNLOCKED,
  mqtt: false,
  mqttState: {
    lights: {
      floorlamp: false,
      leds: '#ffbb00',
    },
    plants: {
      p1: 0,
      p2: 0,
      p3: 0,
      p4: 0,
      p5: 0,
    },
  },
};


export default { presets };
