function Menu({ meals }) {
  return (
    <>
      <h1>Matsedel</h1>
      <ul>
        {meals.map((meal, index) => {
          return <li key={index}>{meal.title}</li>
        })}

      </ul>
      {meals.length < 1 && <p>Inga sparade maträtter</p>}
    </>
  );
}

export default Menu;
