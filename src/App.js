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

  const handleFinishItem = (event) => {
    console.log(event.target);
    event.target.classList.toggle('line-through');
  }

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
    // const newMealsList = meals.filter((meal) =>
    const newMealsList = mealsList.filter((meal) =>
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
      {/* <MealForm addMeal={handleAddMeal}/> */}
      <div>
        {menuOpen && <Menu meals={newMealsList} handleFinishItem={handleFinishItem} />}
        {/* Change meals to "meals" for the added ones */}
        {mealsOpen && <Meals meals={mealsList} checkedCheckboxes={checkedCheckboxes} handleCheckboxes={handleCheckboxes} saveMeals={handleMealsList}/>}
        {ingredientsOpen && <Ingredients meals={newMealsList} handleFinishItem={handleFinishItem} />}
      </div>
      <div className='button-wrapper'>
        <Button handleClick={handleClick} title="Välj maträtter"/>
        <Button handleClick={handleClick} title="Se matsedel"/>
        <Button handleClick={handleClick} title="Se ingredienser"/>
      </div>
    </div>
    <svg className="settings-icon" width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.1014 12.2149L25.8787 13.6367C24.4978 14.2459 22.8915 14.0259 21.7252 13.0679L20.2855 11.8853C18.6952 10.579 16.3733 10.6925 14.9181 12.1477L12.0004 15.0654C10.7074 16.3584 10.4558 18.3637 11.3894 19.936L12.9921 22.6353C13.6114 23.6784 13.724 24.9461 13.298 26.0819L12.11 29.2501C11.6295 30.5312 10.5276 31.4779 9.1887 31.7598L6.17596 32.3941C4.32498 32.7837 3 34.4167 3 36.3083V40.1306C3 42.0221 4.32498 43.6551 6.17596 44.0448L9.1887 44.679C10.5276 44.9609 11.6295 45.9076 12.11 47.1888L13.273 50.2902C13.7131 51.4638 13.5776 52.7759 12.907 53.8349L11.5155 56.0319C10.5141 57.613 10.743 59.6771 12.0664 61.0005L15.2031 64.1373C16.5337 65.4679 18.6118 65.6911 20.1946 64.6736L22.0342 63.491C23.0424 62.8428 24.2881 62.681 25.4285 63.0499L28.7619 64.1284C30.1897 64.5903 31.2389 65.8126 31.4791 67.2939L31.8596 69.6403C32.1736 71.577 33.846 73 35.808 73H39.8425C41.7649 73 43.4155 71.6324 43.7728 69.7436L44.2517 67.2126C44.5236 65.7751 45.5587 64.6007 46.9507 64.1504L50.4236 63.0268C51.5228 62.6712 52.7221 62.8082 53.7128 63.4026L56.0586 64.8101C57.6325 65.7544 59.6472 65.5064 60.945 64.2085L63.9904 61.1632C65.3864 59.7672 65.5551 57.5614 64.3876 55.9693L62.9518 54.0115C62.1085 52.8615 61.9412 51.3494 62.5128 50.0428L63.836 47.0183C64.354 45.8344 65.412 44.9736 66.6766 44.7074L69.824 44.0448C71.675 43.6551 73 42.0221 73 40.1306V36.3083C73 34.4167 71.675 32.7837 69.824 32.3941L66.6766 31.7314C65.412 31.4652 64.354 30.6045 63.836 29.4205L62.4806 26.3224C61.9264 25.0556 62.0657 23.5924 62.849 22.453L64.5319 20.0051C65.6243 18.4162 65.4277 16.274 64.0642 14.9106L61.2161 12.0625C59.7972 10.6435 57.5465 10.4955 55.9539 11.7165L54.034 13.1884C52.8745 14.0774 51.3225 14.2634 49.9857 13.6737L46.6175 12.1877C45.4126 11.6561 44.5465 10.5655 44.3017 9.27156L43.7728 6.47586C43.4155 4.58696 41.7649 3.21942 39.8425 3.21942H35.808C33.846 3.21942 32.1736 4.64244 31.8596 6.57913L31.4353 9.19548C31.2185 10.5321 30.3403 11.6683 29.1014 12.2149Z" stroke="black" stroke-width="5"/>
      <circle cx="37.8903" cy="38.1097" r="13.2994" stroke="black" stroke-width="5"/>
    </svg>
    </>
  );
}

export default App;
