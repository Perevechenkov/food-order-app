import React from 'react';

import classes from './Input.module.scss';

export default React.forwardRef(function Input(props, ref) {
  return (
    <div className={props.classes ? props.classes : classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input}></input>
      {props.hasError && <p className={props.errClasses}>{props.errorText}</p>}
    </div>
  );
});
