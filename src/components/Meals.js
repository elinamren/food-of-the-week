const Meals = ({meals}) => {
  return (
    <>
      <h1>Maträtter</h1>
      <ul>
        {meals.map((meal, index) => {
          return <li key={index}>{meal.title}</li>
        })}
      </ul>
    </>
  );
};

export default Meals;