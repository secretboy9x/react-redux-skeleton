import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { DemoRoute } from 'modules/demo/router';
import './styles.scss';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='demo' className='app-background'>
        <div className={`app-container ${this.props.currentUser ? 'auth' : ''}`}>
          {
            (this.props.currentUser) &&
            (
              <div className='header'>
                {'Header'}
              </div>
            )
          }
          <DemoRoute {...this.props}/>
        </div>
      </div>
    );
  }
}

/**
 * Typechecking With PropTypes
 * Reference https://facebook.github.io/react/docs/typechecking-with-proptypes.html
 * Proptypes: https://github.com/facebook/prop-types
 */
Container.propTypes = {
  currentUser: PropTypes.any,
  history: PropTypes.any
};


export default connect(state => ({
  currentUser: state.auth_users.currentUser
}))(Container);
