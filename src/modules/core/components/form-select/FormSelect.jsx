/**
 * React / Redux dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Highlighter from 'react-highlight-words';

import 'react-select/dist/react-select.css';
import './styles.scss';

/**
 * Using react select for this customization
 * Reference to: https://github.com/JedWatson/react-select#usage
 */
export class FormSelect extends React.Component {
  constructor(props) {
    super(props);
    this.performLoadOptions = this.performLoadOptions.bind(this);
  }

  /**
   * Handle when this option value is changed
   */
  handleSelectChange(value) {
    // Get props from Field Redux Form
    const { input, onOptionChange } = this.props;
    const onChange = (input || {}).onChange;

    if (typeof onChange === 'function') {
      onChange(value.value);

      if (typeof onOptionChange === 'function') {
        onOptionChange(value);
      }
    }

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(value);
    }
  }

  /**
   * Handle when the input is changed
   */
  handleOnInputChange(value) {
    this.inputValue = value;

    if (typeof this.props.onInputChange === 'function') {
      this.props.onInputChange(value);
    }
  }

  /**
   * Handle options renderer
   */
  optionRenderer(option) {
    // If this.props.enableHighligh value is true then return Highligher
    if (this.props.enableHighlight) {
      return (
        <Highlighter
          highlightClassName='highlight-select'
          searchWords={[this.inputValue]}
          textToHighlight={option.label} />
      );
    }

    return option.label;
  }

  /**
   * Manual call loadOptions
   * This function just works with async option
   */
  performLoadOptions() {
    if (this.select && this.props.async) {
      this.select.loadOptions();
    }
  }

  handleOnBlur() {
    const { input } = this.props;

    if (input) {
      input.onBlur(input.value);
    }
  }

  /**
   * Render select component that load async options
   */
  renderAsyncSelectComponent() {
    let { props } = this;

    return (
      <Select.Async
        ref={(select) => { this.select = select; }}
        onInputChange={this.handleOnInputChange.bind(this)}
        className={this.props.className || ''}
        value={props.value || (this.props.input || {}).value}
        clearable={props.clearable || false}
        loadOptions={props.loadOptions}
        onChange={this.handleSelectChange.bind(this)}
        optionRenderer={props.optionRenderer || this.optionRenderer.bind(this)}
        valueRenderer={props.valueRenderer}
        placeholder={props.placeholder}
        onBlur={this.handleOnBlur.bind(this)}
        disabled={props.disabled}
        searchable={props.searchable} />
    );
  }

  /**
   * Render select component that load sync options
   */
  renderSyncSelectComponent() {
    let { props } = this;

    return (
      <Select
        onInputChange={this.handleOnInputChange.bind(this)}
        className={this.props.className || ''}
        value={props.value || (this.props.input || {}).value}
        clearable={props.clearable || false}
        options={props.options}
        onChange={this.handleSelectChange.bind(this)}
        optionRenderer={props.optionRenderer || this.optionRenderer.bind(this)}
        valueRenderer={props.valueRenderer}
        placeholder={props.placeholder}
        disabled={props.disabled}
        onBlur={this.handleOnBlur.bind(this)}
        searchable={props.searchable} />
    );
  }

  render() {
    const meta = this.props.meta || {};
    const { touched, error } = meta;

    return (
      <div className={`form-select ${touched && error ? ' has-error' : ''}`}>
        {
          this.props.async ?
            this.renderAsyncSelectComponent() :
            this.renderSyncSelectComponent()
        }
        {touched && (error && <span className='text-danger-tooltip'>{error}</span>)}
      </div>
    );
  }
}

/**
 * Typechecking With PropTypes
 * Reference https://facebook.github.io/react/docs/typechecking-with-proptypes.html
 * Proptypes: https://github.com/facebook/prop-types
 */
FormSelect.propTypes = {
  async: PropTypes.bool,
  className: PropTypes.string, // Customize css for this form select
  clearable: PropTypes.bool, // Should it be possible to reset value. Default is false
  enableHighlight: PropTypes.bool, // Enable the highlight on search. Default is false
  input: PropTypes.object, // The props under the input key are what connects your input component to Redux
  loadOptions: PropTypes.func, // Required if async is True, provide callback(err, data) in a Object { options: [] }
  meta: PropTypes.object,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func, // Function is involved when input text value is changed
  onOptionChange: PropTypes.func, // This function is the same with onChange, but just work if form-select is wrapped by ReduxForm Field
  optionRenderer: PropTypes.func, // Render options
  options: PropTypes.array, // Required if async is False, should be provided as an Array of Objects, each with a value and label property for rendering and searching., // Render value options
  placeholder: PropTypes.string,
  value: PropTypes.any,
  valueRenderer: PropTypes.func
};
