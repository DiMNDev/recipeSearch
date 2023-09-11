import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./recipe";
import EdamamBadge from "./Edamam_Badge.svg";

const App = () => {
  //Enviornment data
  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;

  //State GET and SET
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  //API query URLs
  const v1Req = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const v2Req = `https://api.edamam.com/api/recipes/v2/q=chicken?app_id=${APP_ID}&app_key=${APP_KEY}&type=public`;
  const dummyData = require("./chickenData.json");

  //Effect COMPUTE and RENDER
  useEffect(() => {
    getRecipes();
    // getDummyData();
  }, [query]);

  //Load dummy data
  const getDummyData = async () => {
    setRecipes(dummyData);
  };

  //Function
  const getRecipes = async () => {
    const response = await fetch(v1Req);
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <div className="App">
      <h1 className="searchHeading">Whatcha Cookin'?</h1>
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {recipes.map((recipe, index) => (
        <Recipe
          key={index}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      <img
        id="edamam-badge"
        src={EdamamBadge}
        alt="edamam badge"
        height={100}
      />
    </div>
  );
};

export default App;
