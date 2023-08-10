import { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';
import Ingredients from './components/Ingredients';
import Meals from './components/Meals';
import Menu from './components/Menu';
import mealsList from './mealsList';

function App() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [mealsOpen, setMealsOpen] = useState(false);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [newMeals, setNewMeals] = useState([]);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);

  // Get the saved meals when site render
  useEffect(() => {
    handleNewMeals();
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

  function handleNewMeals() {
    const newMeals = mealsList.filter((meal) =>
      checkedCheckboxes.includes(meal.slug)
    );
    setNewMeals(newMeals);
    console.log('new meals: ', newMeals);
  }

  const mealsStorage = 'MealsLocalStorage';
  const checkboxStorage = 'MealsCheckboxLocalStorage';

  const saveLocalItems = () => {
    localStorage.setItem(mealsStorage, JSON.stringify(newMeals));
    localStorage.setItem(checkboxStorage, JSON.stringify(checkedCheckboxes));
  };

  const getLocalItems = () => {
    if (localStorage.getItem(mealsStorage) === null) {
      localStorage.setItem(mealsStorage, JSON.stringify(""));
    } else {
      let mealsFromLocal = JSON.parse(localStorage.getItem(mealsStorage));
      setNewMeals(mealsFromLocal);
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
    newMeals,
    checkedCheckboxes,
  ]);


  return (
    <div className="wrapper">
      <div>
        {menuOpen && <Menu meals={newMeals}/>}
        {mealsOpen && <Meals meals={mealsList} checkedCheckboxes={checkedCheckboxes} handleCheckboxes={handleCheckboxes} saveMeals={handleNewMeals}/>}
        {ingredientsOpen && <Ingredients meals={newMeals}/>}
      </div>
      <div className='button-wrapper'>
        <Button handleClick={handleClick} title="Välj maträtter"/>
        <Button handleClick={handleClick} title="Se matsedel"/>
        <Button handleClick={handleClick} title="Se ingredienser"/>
      </div>
    </div>
  );
}

export default App;
