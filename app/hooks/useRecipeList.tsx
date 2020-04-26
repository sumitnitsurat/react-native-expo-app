import React, { useEffect, useState } from "react";

export const useRecipeList = () => {
    const [recipeList, setRecipeList] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {

        const fetchRecipeList = async () => {
            try {
                const recipes: any = await fetch("http://127.0.0.1:5000/api/recipes");
                console.log("recipes")
                console.log(recipes)
                setRecipeList(await recipes.json() || null);
            } catch(e) {
                setError(e.message);
            }
        }
        fetchRecipeList();
    }, []);
    
    return {recipeList, error};
}