import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.scss';
import { RootActions as actions } from 'common';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Log out function
   */
  logout() {
    actions.auth_users.logout();
  }

  render() {
    return (
      <div className='home-container'>
        <input type='button' onClick={this.logout.bind(this)} value='LOGOUT'/>
      </div>
    );
  }
}

/**
 * Typechecking With PropTypes
 * Reference https://facebook.github.io/react/docs/typechecking-with-proptypes.html
 * Proptypes: https://github.com/facebook/prop-types
 */
Home.propTypes = {
  actions: PropTypes.any,
  children: PropTypes.any,
  currentUser: PropTypes.any
};


export default connect(state => ({
  currentUser: state.auth_users.currentUser
}))(Home);
