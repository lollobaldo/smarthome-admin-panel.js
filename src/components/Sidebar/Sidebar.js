import PropTypes from 'prop-types';

import './Sidebar.scss';

const Sidebar = () => (
  null
);

Sidebar.propTypes = PropTypes.shape({
  name: PropTypes.string,
  location: PropTypes.string,
  lockScreen: PropTypes.func,
}).isRequired;

export default Sidebar;
