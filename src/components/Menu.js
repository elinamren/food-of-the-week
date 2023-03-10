function Menu({ meals }) {
  return (
    <>
      <h1>Matsedel</h1>
      <ul>
        {meals.map((meal, index) => {
          return <li key={index}>{meal.title}</li>
        })}
      </ul>
    </>
  );
}

export default Menu;
