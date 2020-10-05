import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

function Input({ name, ...rest }) {
  const inputRef = useRef();
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <input
        ref={inputRef}
        className={error ? 'has-error' : ''}
        name={name}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && <span className="error">{error}</span>}
    </>
  );
}

export default Input;
