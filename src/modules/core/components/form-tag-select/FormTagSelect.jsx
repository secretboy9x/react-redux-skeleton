import React from 'react';
import PropTypes from 'prop-types';

export default class FormTagSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Handle on tag is selected
   */
  handleOnClick(value) {
    let { onChange, type } = this.props;
    if (onChange && typeof (onChange) === 'function') {
      onChange(type, value);
    }
  }

  render() {
    let { selectedValue, data, zeroData } = this.props;
    if (data.length === 0) {
      return (
        <div className={this.props.className || ''}>
          {zeroData || 'No item available!'}</div>
      );
    }

    return (
      <div>
        {data.map((item, index) => {
          return (
            <button
              key={index}
              className={`btn btn-primary${selectedValue === item.value ? ' active' : ''}`}
              onClick={this.handleOnClick.bind(this, item.value)}>
              {item.label}
            </button>
          );
        })}
        <button
          key={-1}
          className={`btn btn-primary${!selectedValue ? ' active' : ''}`}
          onClick={this.handleOnClick.bind(this, '')}>
          {'All'}
        </button>
      </div>
    );
  }
}
/**
 * Typechecking With PropTypes
 * Reference https://facebook.github.io/react/docs/typechecking-with-proptypes.html
 * Proptypes: https://github.com/facebook/prop-types
 */
FormTagSelect.propTypes = {
  actions: PropTypes.any,
  className: PropTypes.string,
  data: PropTypes.array,
  onChange: PropTypes.func,
  selectedValue: PropTypes.any,
  type: PropTypes.string,
  zeroData: PropTypes.string
};
