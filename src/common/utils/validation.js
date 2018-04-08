const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0];

export function email(value, errorMsg) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return errorMsg || 'Invalid email address!';
  }

  return undefined;
}

export function required(value, errorMsg) {
  if (isEmpty(value)) {
    return errorMsg || 'This field is required!';
  }

  return undefined;
}

export function minLength(min, errorMsg) {
  return (value) => {
    if (!isEmpty(value) && value.length < min) {
      return errorMsg || `Must be at least ${min} characters`;
    }

    return '';
  };
}

export function maxLength(max, errorMsg) {
  return (value) => {
    if (!isEmpty(value) && value.length > max) {
      return errorMsg || `Must be no more than ${max} characters`;
    }

    return '';
  };
}

export function integer(value, errorMsg) {
  if (!Number.isInteger(Number(value))) {
    return errorMsg || 'Must be an integer';
  }

  return '';
}

export function oneOf(enumeration, errorMsg) {
  return (value) => {
    if (!~enumeration.indexOf(value)) {
      return errorMsg || `Must be one of: ${enumeration.join(', ')}`;
    }

    return '';
  };
}

export function match(field, errorMsg) {
  return (value, data) => {
    if (data && value !== data[field]) {
      return errorMsg || 'Do not match';
    }

    return '';
  };
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

export default {
  createValidator,
  match,
  oneOf,
  integer,
  maxLength,
  minLength,
  required,
  email
};


