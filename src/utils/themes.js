import { css } from 'styled-components';

const size = {
  mobile: '425px',
  tablet: '768px',
  desktop: '2560px',
};

export const mediaQueries = (key) => (
  (style) => `@media (min-width: ${size[key]}) { ${style} }`
);

export const body = {
  light: css`
    background: #f5f5f5;
    transition: all 0.14s ease-in;
  `,
  dark: css`
    background: #222;
    color: #dddddd;
    transition: all 0.14s ease-in;
  `,
  black: '#000000',
};

export const card = {
  light: css`
    background: #ffffff;
    color: #000000;
    transition: all 0.14s ease-in;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  `,
  dark: css`
    background: #333;
    color: #dddddd;
    transition: all 0.14s ease-in;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3), 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  `,
  black: css`
    background: #121212;
    color: #dddddd;
    transition: all 0.14s ease-in;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  `,
};
