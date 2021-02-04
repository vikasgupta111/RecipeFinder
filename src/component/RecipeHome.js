import React from 'react'
import { useState, useEffect } from 'react'
import "../App.css";

export default function RecipeHome() {
    const initialValue = "Chicken"
    const [query, setQuery] = useState(initialValue);
    const [recipes, setRecipes] = useState([]);
    const [newValue, setNewValue] = useState(query)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const APP_ID = 'f5fcd204';
    const APP_KEY = '966b4fd01c59fc7a925b6a7475b9d5bf';

    useEffect(() => {
        setLoading(true)
        setQuery("")
        fetch(`https://api.edamam.com/search?q=${newValue}&app_id=${APP_ID}&app_key=${APP_KEY}`)
            .then(res => {
                return res.json()
            })
            .then(result => {
                setLoading(false)
                result.hits.length !== 0 ?
                    setRecipes(result.hits) : setRecipes([]) && setError(true);
            }).catch(err => {
                setLoading(false)
                setError(true)
            })

    }, [newValue])


    return (
        <div className="App">
            <div className="App-header">
                    <h1>Food Recipe Finder</h1>
                <div className="InputWrapper">
                    <input placeholder="Search For Recipe" value={query} onChange={(e) => { setQuery(e.target.value) }} />
                    <button onClick={() => { setNewValue(query) }}>Search</button>
                </div>
                {loading && <p>...Loading</p>}
                <div className="Wrapper">
                    {recipes.map((item, ind) => {
                        return (
                            <div className="Ingredient" key={ind}>

                                <span>{item.recipe.label}</span>
                                <img src={item.recipe.image} alt=""></img>
                                <div className="steps">
                                    {item.recipe.ingredientLines.map((step, index) => {
                                        return <p key={index}>{step}</p>
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}



// {<div>


//     <input type = "text" placeholder = "Enter food recipe name to be Searched" onChange = { (e)=>{setQuery(e.target.value)}}></input>
//     <button onClick = {()=>{setNewValue(query)}}>Search</button>
//     <div>
//     {loading ? "...loading": 
//     <div className="recipes">
//     <ul>
//         {recipes.length !== 0 && recipes.map((item,ind)=>{
//             return (
//                 <div className ="Ingredient">
//                 <img src = {item.recipe.image} alt =""></img>
//                 <li key = {ind}>{item.recipe.label}</li>
//                 </div>
//             )
//         })}
//     </ul>
//     </div>}
//     </div>

// </div>}