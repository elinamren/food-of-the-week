const Meals = ({ meals }) => {
  return (
    <section className="wrapper meals">
      <h1>Matsedel</h1>
      <form>
        {meals.map((meal) => {
          return (
            <div>
              <input type="checkbox" />
              <label>{meal.fields.title}</label>
            </div>
          )
        })}
      </ul>
    </section>
  );
}

export default Meals;