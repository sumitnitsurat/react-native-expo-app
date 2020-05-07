import React, { useEffect, useState } from "react";

export const useRecipeList = () => {
    const [recipeList, setRecipeList] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {

        const fetchRecipeList = async () => {
            try {
                const recipes: any = await fetch("http://localhost:5000/api/recipes");
                console.log("recipes")
                console.log(recipes)
                setRecipeList(await recipes.json() || []);
            } catch(e) {
                setError(e.message);
            }
        }
        fetchRecipeList();
    }, []);
    
    return {recipeList, error};
}