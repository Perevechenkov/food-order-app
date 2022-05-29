import useInput from '../hooks/use-input';
import classes from './Checkout.module.scss';

const isNotEmpty = value => value.trim().length !== 0;
const isPostalCode = enteredCode => !/[a-zA-Z]/.test(enteredCode);

const getInputClasses = hasError =>
  `${classes.control} ${hasError ? classes.invalid : ''}`;

export default function Checkout(props) {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useInput(isNotEmpty);

  const {
    value: postalValue,
    isValid: postalIsValid,
    hasError: postalHasError,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    reset: resetPostal,
  } = useInput(
    enteredCode => isNotEmpty(enteredCode) && isPostalCode(enteredCode)
  );
  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (nameIsValid && streetIsValid && postalIsValid && cityIsValid) {
    formIsValid = true;
  }

  const confirmHandler = event => {
    event.preventDefault();

    resetName();
    resetStreet();
    resetPostal();
    resetCity();
  };

  const firstNameInputClasses = getInputClasses(nameHasError);
  const secondNameInputClasses = getInputClasses(streetHasError);
  const emailInputClasses = getInputClasses(postalHasError);
  const cityInputClasses = getInputClasses(cityHasError);

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={firstNameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        ></input>
        {nameHasError && (
          <p className={classes['error-text']}>Name must not be empty</p>
        )}
      </div>
      <div className={secondNameInputClasses}>
        <label htmlFor='street'>Street</label>
        <input
          type='text'
          id='street'
          value={streetValue}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        ></input>
        {streetHasError && (
          <p className={classes['error-text']}>Street must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input
          type='text'
          id='postal'
          value={postalValue}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        ></input>
        {postalHasError && (
          <p className={classes['error-text']}>
            Postal code must not be empty and not contain letters
          </p>
        )}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          value={cityValue}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        ></input>
        {cityHasError && (
          <p className={classes['error-text']}>City must not be empty</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes['actions--submit']} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
}
