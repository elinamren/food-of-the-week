import { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';
import Ingredients from './components/Ingredients';
import Meals from './components/Meals';
import Menu from './components/Menu';
import mealsList from './mealsList';
import MealForm from './components/MealForm';

function App() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [mealsOpen, setMealsOpen] = useState(false);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [meals, setMeals] = useState([]);
  const [newMealsList, setNewMealsList] = useState([]);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);

  // Get the saved meals when site render
  useEffect(() => {
    handleMealsList();
    getLocalItems();
    // eslint-disable-next-line
  }, []);



  const handleClick = (title) => {
    console.log(title);
    console.log('innan', mealsOpen, menuOpen, ingredientsOpen);
    console.log(mealsOpen, menuOpen, ingredientsOpen);
    if (title === 'Välj maträtter') {
      setMealsOpen(true);
      setMenuOpen(false);
      setIngredientsOpen(false);
    
    } else if (title === 'Se matsedel') {
      setMealsOpen(() => false);
      setMenuOpen(() => true);
      setIngredientsOpen(() => false);

    } else if (title === 'Se ingredienser') {
      setMealsOpen(() => false);
      setMenuOpen(() => false);
      setIngredientsOpen(() => true);
    }
  }

  const handleAddMeal = (title, ingredients) => {
    const newMeal = {
      title: title,
      slug: title.replaceAll(" ", "-"),
      ingredients: ingredients.split(", ")
    }
    setMeals(prevValue => [...prevValue, newMeal]);
    console.log(meals);
  }

  function handleCheckboxes(event) {
    if (event.target.checked) {
      setCheckedCheckboxes((prevValue) => [...prevValue, event.target.id]);
    } else {
      const newMealsArray = checkedCheckboxes.filter(
        (meal) => meal !== event.target.id
      );
      setCheckedCheckboxes(newMealsArray);
    }
  }

  function handleMealsList() {
    const newMealsList = meals.filter((meal) =>
      checkedCheckboxes.includes(meal.slug)
    );
    setNewMealsList(newMealsList);
    console.log('new meals: ', newMealsList);
  }

  const mealsStorage = 'MealsLocalStorage';
  const mealsOfWeekStorage = 'MealsOfTheWeekLocalStorage';
  const checkboxStorage = 'MealsCheckboxLocalStorage';

  const saveLocalItems = () => {
    localStorage.setItem(mealsStorage, JSON.stringify(meals));
    localStorage.setItem(mealsOfWeekStorage, JSON.stringify(newMealsList));
    localStorage.setItem(checkboxStorage, JSON.stringify(checkedCheckboxes));
  };

  const getLocalItems = () => {
    if (localStorage.getItem(mealsStorage) === null) {
      localStorage.setItem(mealsStorage, JSON.stringify(""));
    } else {
      let mealsFromLocal = JSON.parse(localStorage.getItem(mealsStorage));
      setMeals(mealsFromLocal);
    }

    if (localStorage.getItem(mealsOfWeekStorage) === null) {
      localStorage.setItem(mealsOfWeekStorage, JSON.stringify(""));
    } else {
      let mealsFromLocal = JSON.parse(localStorage.getItem(mealsOfWeekStorage));
      setNewMealsList(mealsFromLocal);
    }

    if (localStorage.getItem(checkboxStorage) === null) {
      localStorage.setItem(checkboxStorage, JSON.stringify(checkedCheckboxes));
    } else {
      let checkedFromLocal = JSON.parse(localStorage.getItem(checkboxStorage));
      setCheckedCheckboxes(checkedFromLocal);
    }
  };

  useEffect(() => {
    saveLocalItems();
    // eslint-disable-next-line
  }, [
    newMealsList,
    meals,
    checkedCheckboxes,
  ]);


  return (
    <>

    <div className="wrapper">
      <MealForm addMeal={handleAddMeal}/>
      <div>
        {menuOpen && <Menu meals={newMealsList}/>}
        {mealsOpen && <Meals meals={meals} checkedCheckboxes={checkedCheckboxes} handleCheckboxes={handleCheckboxes} saveMeals={handleMealsList}/>}
        {ingredientsOpen && <Ingredients meals={newMealsList}/>}
      </div>
      <div className='button-wrapper'>
        <Button handleClick={handleClick} title="Välj maträtter"/>
        <Button handleClick={handleClick} title="Se matsedel"/>
        <Button handleClick={handleClick} title="Se ingredienser"/>
      </div>
    </div>
    <svg width="82" height="82" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M31.509 12.9296L27.6467 14.6335C26.2658 15.2428 24.6595 15.0228 23.4932 14.0648L21.5268 12.4495C19.9366 11.1432 17.6147 11.2568 16.1594 12.712L12.5835 16.288C11.2905 17.581 11.0389 19.5862 11.9725 21.1586L13.9326 24.4597C14.5519 25.5028 14.6644 26.7706 14.2385 27.9064L12.8247 31.6764C12.3443 32.9576 11.2423 33.9042 9.90343 34.1861L6.17596 34.9709C4.32498 35.3605 3 36.9935 3 38.8851V43.5914C3 45.4829 4.32498 47.1159 6.17596 47.5056L9.90343 48.2903C11.2423 48.5722 12.3443 49.5189 12.8247 50.8L14.2134 54.5033C14.6536 55.677 14.5181 56.9891 13.8474 58.048L12.0986 60.8093C11.0972 62.3904 11.3261 64.4546 12.6494 65.778L16.4445 69.573C17.7751 70.9036 19.8531 71.1269 21.436 70.1093L23.8022 68.5882C24.8104 67.94 26.0562 67.7782 27.1965 68.1471L31.1695 69.4324C32.5973 69.8944 33.6464 71.1166 33.8866 72.5979L34.3799 75.6403C34.694 77.577 36.3664 79 38.3284 79H43.2845C45.207 79 46.8575 77.6324 47.2148 75.7435L47.8253 72.5167C48.0973 71.0791 49.1323 69.9048 50.5243 69.4544L54.6367 68.124C55.736 67.7683 56.9353 67.9053 57.926 68.4998L60.8361 70.2458C62.41 71.1902 64.4246 70.9421 65.7225 69.6443L69.4261 65.9406C70.8221 64.5446 70.9908 62.3388 69.8233 60.7468L67.9738 58.2247C67.1304 57.0746 66.9631 55.5625 67.5348 54.256L69.1213 50.6296C69.6393 49.4457 70.6973 48.5849 71.9619 48.3187L75.824 47.5056C77.675 47.1159 79 45.4829 79 43.5914V38.8851C79 36.9935 77.675 35.3605 75.824 34.9709L71.9619 34.1578C70.6973 33.8915 69.6393 33.0308 69.1213 31.8468L67.5025 28.1468C66.9483 26.88 67.0876 25.4168 67.871 24.2774L69.9677 21.2277C71.0601 19.6387 70.8634 17.4966 69.4999 16.1331L65.9935 12.6267C64.5746 11.2078 62.3239 11.0598 60.7314 12.2807L58.2472 14.1853C57.0877 15.0743 55.5357 15.2603 54.1989 14.6705L50.1911 12.9024C48.9862 12.3708 48.1202 11.2803 47.8754 9.98628L47.2148 6.49465C46.8575 4.60576 45.207 3.23822 43.2845 3.23822H38.3284C36.3664 3.23822 34.694 4.66124 34.3799 6.59794L33.8428 9.91021C33.6261 11.2468 32.7478 12.383 31.509 12.9296Z" stroke="black" stroke-width="5"/>
    <circle cx="40.8809" cy="41.1191" r="14.6536" stroke="black" stroke-width="5"/>
    </svg>
    </>
  );
}

export default App;
