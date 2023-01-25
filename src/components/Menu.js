function Menu({ meals }) {
  return (
    <section className="wrapper menu">
      <h1>Matsedel</h1>
      <ul>
        {meals.map((meal) => {
          return (
            <li>{meal.fields.title}</li>
          )
        })}
      </ul>
    </section>
  );
}

export default Menu;
