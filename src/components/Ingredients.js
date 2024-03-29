import { useState, useEffect } from "react";

const Ingredients = ({ meals, handleFinishItem }) => {
  const [groceryList, setGroceryList] = useState([]);
  useEffect(() => {
    meals.map((meal) => {
      return setGroceryList((prevValue) => [...prevValue, ...meal.ingredients]);
    });
  }, [meals])

  return (
    <>
      <h1>Ingredienser</h1>
      <ul>
        {groceryList.sort().map((grocery, index) => {
          return <li key={index} onClick={handleFinishItem}>{grocery}</li>
        })}
      </ul>
    </>
  );
};

export default Ingredients;