import React from 'react';
import PropTypes from 'prop-types';

import './panel.scss';

export default class PanelContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='separate-container'>
        <div className='left-container col-sm-5 col-md-4 col-lg-3 custom-scrollbar'>
          {this.props.leftPanel}
        </div>
        <div className='right-container col-sm-7 col-md-8 col-lg-9'>
          {this.props.rightPanel}
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
PanelContainer.propTypes = {
  actions: PropTypes.any,
  leftPanel: PropTypes.any,
  rightPanel: PropTypes.any
};
