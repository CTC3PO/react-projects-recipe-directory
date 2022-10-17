import { useFetch } from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";
import { useState, useEffect } from "react";

import { projectFirestore } from "../../firebase/config";

// styles
import "./Home.css";

export default function Home() {
  //set States
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  //useEffect hook to load/fetch
  useEffect(() => {
    setIsPending(true);

    //GRAB RECIPES COLLECTION FROM FIRESTORE
    //use onSnapshot to catch real-time data
    //store the whole thing in a function to unsubsribe
    //from the listener (when not in Home anymore)
    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot.emtpy) {
          setError("No recipes to load");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(error.message);
        setIsPending(false);
      }
    );

    //call the unsub function to unsubsribe
    return () => unsub();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
