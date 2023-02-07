import { useState } from 'react';
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


  return (
    <div className="wrapper">
      {menuOpen && <Menu meals={mealsList}/>}
      {mealsOpen && <Meals meals={mealsList}/>}
      {ingredientsOpen && <Ingredients meals={mealsList}/>}
      <Button handleClick={handleClick} title="Välj maträtter"/>
      <Button handleClick={handleClick} title="Se matsedel"/>
      <Button handleClick={handleClick} title="Se ingredienser"/>
    </div>
  );
}

export default App;
