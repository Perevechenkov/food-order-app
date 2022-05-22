import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.scss';

export default function Header(props) {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <button>Cart</button>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='table of food'></img>
      </div>
    </>
  );
}
