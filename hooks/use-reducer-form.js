import { useReducer } from 'react';

const initialState = {
  values: {},
  errors: {},
};

const prepareValues = (values) => {
  for (const key in values) {
    values[key] = values[key]?.toString() || '';
  }
  return values;
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'form/updateValues':
      return {
        values: { ...state.values, ...action.values },
        errors: {},
      };
    case 'form/updateErrors':
      return {
        ...state,
        errors: { ...state.errors, ...action.errors },
      };
    case 'form/resetErrors':
      return {
        ...state,
        errors: {},
      };
    case 'form/setValue':
      return {
        values: { ...state.values, [action.name]: action.value },
        errors: { ...state.errors, [action.name]: '' },
      };
    case 'form/setError':
      return {
        ...state,
        errors: { ...state.errors, [action.name]: action.error },
      };
    default:
      throw new Error();
  }
};

const useReducerForm = (initialValues) => {
  const [state, dispatch] = useReducer(formReducer, {
    ...initialState,
    values: prepareValues(initialValues),
  });

  const setFormValues = (values) => {
    dispatch({ type: 'form/updateValues', values });
  };

  const setFormErrors = (errors) => {
    dispatch({ type: 'form/updateErrors', errors });
  };

  const resetFormErrors = () => {
    dispatch({ type: 'form/resetErrors' });
  };

  const handleInputChange = (name) => {
    return (text) => dispatch({ type: 'form/setValue', name, value: text });
  };

  const handleInputFocus = (name) => {
    return () => dispatch({ type: 'form/setError', name, error: '' });
  };

  return {
    ...state,
    setFormValues,
    setFormErrors,
    resetFormErrors,
    handleInputChange,
    handleInputFocus,
  };
};

export { useReducerForm };
