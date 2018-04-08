/**
 * React / Redux dependencies
 */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

/**
 * The assets such as css, images
 */
import './styles.scss';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      const submitter = this.props.handleSubmit(this.props.authorize);
      submitter(); // submits
    }
  }

  renderField({ input, type, options, meta: { touched, error } }) {
    return (
      <div className={`input-form${touched && error ? ' has-error' : ''}`}>
        <input
          {...input}
          {...options}
          type={type} />
        {touched && (error && <span className='text-danger-tooltip'>{error}</span>)}
      </div>
    );
  }

  /**
   * Render form input (user name and password) based on login type
   */
  renderFormInput() {
    return (
      <div className='form-container'>
        <FormattedMessage id='Login.PlaceholderUserName'>
          {ph =>
            <Field
              name='username'
              options={{
                id: 'username',
                className: 'input-username i-alKeyboard',
                placeholder: ph,
                autoComplete: 'off'
              }}
              type='email'
              component={this.renderField} />
          }
        </FormattedMessage>
        <FormattedMessage id='Login.PlaceholderPassword'>
          {ph =>
            <Field
              name='password'
              options={{
                id: 'password',
                className: 'input-password i-alKeyboard i-password',
                placeholder: ph,
                autoComplete: 'off'
              }}
              type='password'
              component={this.renderField} />
          }
        </FormattedMessage>
      </div>
    );
  }

  render() {
    const { handleSubmit, invalid } = this.props;
    return (
      <form className='login-form' onSubmit={handleSubmit(this.props.authorize)} autoComplete='off'>
        <input className='fake-input' type='text' name='fakename' />
        <input className='fake-input' type='password' name='fakepass' />
        <div className='header-login'>
          <p className='title'><FormattedMessage id='General.AppName'/></p>
        </div>
        {this.renderFormInput()}
        <div className='col-2'>
          <button disabled={invalid} className='btn button-login-studio'>
            <FormattedMessage id='Login.SignInBtn' />
          </button>
        </div>
      </form>
    );
  }
}

/**
 * Typechecking With PropTypes
 * Reference https://facebook.github.io/react/docs/typechecking-with-proptypes.html
 * Proptypes: https://github.com/facebook/prop-types
 */
LoginForm.propTypes = {
  actions: PropTypes.any,
  authorize: PropTypes.func,
  change: PropTypes.func,
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  reset: PropTypes.func,
  touch: PropTypes.func // Marks the given fields as "touched" to show errors
};

let loginForm = reduxForm({
  form: 'loginForm' // A unique identifier for this form
})(LoginForm);

export default loginForm;
