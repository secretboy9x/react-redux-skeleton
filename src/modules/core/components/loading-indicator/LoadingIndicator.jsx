import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.scss';

export class LoadingIndicator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {
          this.props.loading ?
            (
              <div className='sk-overlay'>
                <div className='sk-circle'>
                  <div className='sk-circle1 sk-child' />
                  <div className='sk-circle2 sk-child' />
                  <div className='sk-circle3 sk-child' />
                  <div className='sk-circle4 sk-child' />
                  <div className='sk-circle5 sk-child' />
                  <div className='sk-circle6 sk-child' />
                  <div className='sk-circle7 sk-child' />
                  <div className='sk-circle8 sk-child' />
                  <div className='sk-circle9 sk-child' />
                  <div className='sk-circle10 sk-child' />
                  <div className='sk-circle11 sk-child' />
                  <div className='sk-circle12 sk-child' />
                </div>
              </div>
            )
            : ''
        }
      </div>
    );
  }
}

/**
 * Typechecking With PropTypes
 * Reference https://facebook.github.io/react/docs/typechecking-with-proptypes.html
 * Proptypes: https://github.com/facebook/prop-types
 */
LoadingIndicator.propTypes = {
  loading: PropTypes.bool
};

export default connect(state => ({
  loading: state.core_loading.isLoading
}))(LoadingIndicator);
