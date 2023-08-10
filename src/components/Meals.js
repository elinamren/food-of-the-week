const Meals = ({meals, handleCheckboxes, checkedCheckboxes, saveMeals}) => {
  console.log('checked checkboxes: ', checkedCheckboxes);

  return (
    <>
      <h1>Maträtter</h1>
      <p>Välj veckans maträtter</p>
        {meals.map((meal, index) => {
          return (
            <div key={index}>
              <input 
                className="checkbox"
                type="checkbox"
                name={meal.title}
                value={meal.title}
                id={meal.slug}
                onChange={handleCheckboxes}
                checked={checkedCheckboxes.includes(meal.slug) ? true : false}
              />
              <label htmlFor={meal.slug}>{meal.title}</label>
            </div>
          )
        })}
        <button onClick={saveMeals}>Spara</button>
    </>
  );
};

export default Meals;