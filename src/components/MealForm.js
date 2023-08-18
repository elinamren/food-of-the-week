import { useState } from "react";

const MealForm = ({ addMeal }) => {

  const [titleValue, setTitleValue] = useState("");
  const [ingredientsValue, setIngredientsValue] = useState("");
  
  function handleInputValue(event) {
    if(event.target.id === "title") {
      setTitleValue(event.target.value);
    } if (event.target.id === "ingredients") {
      setIngredientsValue(event.target.value);
    }
  }
  
  return (
    <div className="meal-form">
      <label htmlFor="title">Namn</label>
      <input 
        type="text"
        name="title"
        id="title"
        onChange={handleInputValue}
        value={titleValue}
      />
      <label htmlFor="ingredients">Ingredienser, skriv ett komma emellan</label>
      <input 
        type="text"
        name="ingredients"
        id="ingredients"
        onChange={handleInputValue}
        value={ingredientsValue}
      />
      <button        
        onClick={() => {
          addMeal(titleValue, ingredientsValue);
          setTitleValue("");
          setIngredientsValue("");
        }}>
          Lägg till maträtt
      </button>
    </div>
  );
};

export default MealForm;