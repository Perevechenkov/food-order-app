import useInput from '../hooks/use-input';
import Input from '../UI/Input';
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

    props.onConfirm({
      name: nameValue,
      street: streetValue,
      postalCode: postalValue,
      city: cityValue,
    });

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
      <Input
        classes={firstNameInputClasses}
        errClasses={classes['error-text']}
        label='Your Name'
        input={{
          type: 'text',
          id: 'name',
          value: nameValue,
          onChange: nameChangeHandler,
          onBlur: nameBlurHandler,
        }}
        hasError={nameHasError}
        errorText='Name must not be empty'
      />
      <Input
        classes={secondNameInputClasses}
        errClasses={classes['error-text']}
        label='Street'
        input={{
          type: 'text',
          id: 'street',
          value: streetValue,
          onChange: streetChangeHandler,
          onBlur: streetBlurHandler,
        }}
        hasError={streetHasError}
        errorText='Street must not be empty'
      />
      <Input
        classes={emailInputClasses}
        errClasses={classes['error-text']}
        label='Postal Code'
        input={{
          type: 'text',
          id: 'postal',
          value: postalValue,
          onChange: postalChangeHandler,
          onBlur: postalBlurHandler,
        }}
        hasError={postalHasError}
        errorText='Postal code must not be empty and not contain letters'
      />
      <Input
        classes={cityInputClasses}
        errClasses={classes['error-text']}
        label='City'
        input={{
          type: 'text',
          id: 'city',
          value: cityValue,
          onChange: cityChangeHandler,
          onBlur: cityBlurHandler,
        }}
        hasError={cityHasError}
        errorText='City must not be empty'
      />
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
