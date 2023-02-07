import { useState, useEffect } from "react";

const Ingredients = ({ meals }) => {
  const [groceryList, setGroceryList] = useState([]);
  useEffect(() => {
    meals.map((meal) => {
      setGroceryList((prevValue) => [...prevValue, ...meal.ingredients]);
    });
  }, [])

  console.log(groceryList);
  return (
    <>
      <h1>Ingredienser</h1>
      <ul>
        {groceryList.map((grocery, index) => {
          return <li key={index}>{grocery}</li>
        })}
      </ul>
    </>
  );
};

export default Ingredients;