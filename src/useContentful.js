import { createClient } from "contentful";

const useContentful = () => {
  const client = createClient({
    space: 'yt0g3jbr75r4',
    accessToken: 'mBCh86Qt1fGqMHmXUFN45sXbNM5GcR8q0PbBCy64gZI',
    host: 'cdn.contentful.com'
  });

  const getMeals = () => {
    try {
      const entries = client.getEntries({
        content_type: "menu",
        // select: "fields"
      });
      return entries;
    } catch (error) {
      console.log('Error fetching menu', error);
    }
  };

  return { getMeals };
};

export default useContentful;