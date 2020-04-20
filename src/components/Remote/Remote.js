import React from 'react';
import PropTypes from 'prop-types';

import './Remote.scss';

// import { crossTrice } from '../../utils';

const Remote = ({ handler }) => (
<table><tbody>
  <tr>
    <td style={{ backgroundColor: 'FF0000' }}><button onClick={() => handler('FF1AE5')}></button></td>
    <td style={{ backgroundColor: '00FF00' }}><button onClick={() => handler('FF9A65')}></button></td>
    <td style={{ backgroundColor: '0000FF' }}><button onClick={() => handler('FFA25D')}></button></td>
    <td style={{ backgroundColor: 'FFFFFF' }}><button onClick={() => handler('FF22DD')}></button></td>
  </tr>
  <tr>
    <td style={{ backgroundColor: 'E46D09' }}><button onClick={() => handler('FF2AD5')}></button></td>
    <td style={{ backgroundColor: '92D14f' }}><button onClick={() => handler('FFAA55')}></button></td>
    <td style={{ backgroundColor: '3399FE' }}><button onClick={() => handler('FF926D')}></button></td>
    <td style={{ backgroundColor: 'FF00FF' }}><button onClick={() => handler('FF12ED')}></button></td>
  </tr>
  <tr>
    <td style={{ backgroundColor: 'FFF4F4' }}><button onClick={() => handler('FF0AF5')}></button></td>
    <td style={{ backgroundColor: '009999' }}><button onClick={() => handler('FF8A75')}></button></td>
    <td style={{ backgroundColor: '7030A0' }}><button onClick={() => handler('FFB24D')}></button></td>
    <td style={{ backgroundColor: 'CC00FF' }}><button onClick={() => handler('FF32CD')}></button></td>
  </tr>
  <tr>
    <td style={{ backgroundColor: 'FF9900' }}><button onClick={() => handler('FF38C7')}></button></td>
    <td style={{ backgroundColor: '006499' }}><button onClick={() => handler('FFB847')}></button></td>
    <td style={{ backgroundColor: '6600FF' }}><button onClick={() => handler('FF7887')}></button></td>
    <td style={{ backgroundColor: '006666' }}><button onClick={() => handler('FFF807')}></button></td>
  </tr>
  <tr>
    <td style={{ backgroundColor: 'FFFF00' }}><button onClick={() => handler('FF18E7')}></button></td>
    <td style={{ backgroundColor: '003264' }}><button onClick={() => handler('FF9867')}></button></td>
    <td style={{ backgroundColor: '9A00FF' }}><button onClick={() => handler('FF58A7')}></button></td>
    <td style={{ backgroundColor: '003264' }}><button onClick={() => handler('FFD827')}></button></td>
  </tr>
  <tr>
    <td><button onClick={() => handler('FF02FD')}><i className='fas fa-power-off'></i></button></td>
    <td><button onClick={() => handler('FF02FD')}><i className='fas fa-power-off'></i></button></td>
    <td><button onClick={() => handler('FFF00F')}><img src='res/iconA.png' className='icon' /></button></td>
    <td><button onClick={() => handler('FFD02F')}><img src='res/iconS.png' className='icon' /></button></td>
  </tr>
  <tr>
    <td><button onClick={() => handler('FF3AC5')}><img src='res/iconB+.png' className='icon' /></button></td>
    <td><button onClick={() => handler('FFE817')}>QUICK</button></td>
    <td><button onClick={() => handler('FFE01F')}>FADE 7</button></td>
    <td><button onClick={() => handler('FFA05F')}>JUMP 7</button></td>
  </tr>
  <tr>
    <td><button onClick={() => handler('FFBA45')}><img src='res/iconB-.png' className='icon' /></button></td>
    <td><button onClick={() => handler('FFC837')}>SLOW</button></td>
    <td><button onClick={() => handler('FF609F')}>FADE 3</button></td>
    <td><button onClick={() => handler('FF20DF')}>JUMP 3</button></td>
  </tr>
</tbody></table>
);

Remote.propTypes = PropTypes.shape({
  handler: PropTypes.func,
}).isRequired;

export default Remote;
