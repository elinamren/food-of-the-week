
import Pot from "./icons/Pot";
import Time from "./icons/Time";


function Menu({ meals }) {
  return (
    <>
      <h1>Matsedel</h1>
      <ul>
        {meals.map((meal, index) => {
          return (
            <li key={ index }>
              <span className="menu-title">{ meal.title }</span>
              { meal.lunchBox && <Pot /> }
              { meal.quickToMake && <Time /> }
            </li>
          )
        })}

      </ul>
      {meals.length < 1 && <p>Inga sparade maträtter</p>}
    </>
  );
}

export default Menu;
