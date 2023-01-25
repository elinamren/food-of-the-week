import './App.css';
import { useEffect, useState } from 'react';
import Menu from './components/Menu';
import { createClient } from 'contentful';

function App() {
  const [meals, setMeals] = useState([]);
  const client = createClient({
    space: "yt0g3jbr75r4",
    accessToken: "mBCh86Qt1fGqMHmXUFN45sXbNM5GcR8q0PbBCy64gZI"
  })

  useEffect(() => {
    const getAllEntries = async () => {
      try {
        await client.getEntries().then((entries) => {
          console.log(entries);
          setMeals(entries.items)
        })
      } catch (error) {
        console.log('Error fetching meals ', error);
      }
    }
    getAllEntries();
  }, [])

  return (
    <Menu meals={meals} />
  );
}

export default App;
