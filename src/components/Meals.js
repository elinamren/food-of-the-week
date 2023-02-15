const Meals = ({meals}) => {
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
              />
              <label for={meal.slug}>{meal.title}</label>
            </div>
          )
        })}
        <button>Spara</button>
    </>
  );
};

export default Meals;