import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";

import { useState, useEffect } from "react";
import { projectFirestore } from "../../firebase/config";

// styles
import "./Recipe.css";
import { unstable_batchedUpdates } from "react-dom";

export default function Recipe() {
  const { id } = useParams();
  const { mode } = useTheme();

  //change the name "data" to "recipe" to match with in the return statement
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    //GRAB each doc (recipe) from Firestore
    //ONSNAPSHOT to get Realtime Document Data
    //(for when update title, etc., it shows right away in app)
    const unsub = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("could not find the recipe");
        }
      });

    return () => unsub();
  }, [id]);

  //handleClick function, use firestore to UPDATE DOC
  //This is a quick update method, will learn a better one later
  const handleClick = (id) => {
    projectFirestore.collection("recipes").doc(id).update({
      title: "Something completely different",
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>ing</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}>Update recipe</button>
        </>
      )}
    </div>
  );
}
