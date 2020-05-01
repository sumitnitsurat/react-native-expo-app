import React, { useEffect, useState } from "react";
import {FILTER_TYPE} from "../recipeList";
type Recipe =  {
    id: number,
    name: "string",
    calories: number,
    protein: number,
    category: string
}

export const useFilteredRecipeList = ({filter, type, recipeList}: {filter: string, type: FILTER_TYPE, recipeList: Recipe[]}) => {
    console.log("here", filter, type)
    if(type === FILTER_TYPE.SEARCH) {
        const filteredRecipeList = !!filter ? recipeList.filter(recipe => recipe.name.toLowerCase().search(filter.toLowerCase()) >= 0) : recipeList; 
        return { filteredRecipeList };
    } else if(type === FILTER_TYPE.BADGE) {
        const filteredRecipeList = filter === "all" ? recipeList : recipeList.filter(recipe => recipe.category.toLowerCase().search(filter.toLowerCase()) >= 0); 
        return { filteredRecipeList };
    } else {
        return { filteredRecipeList: recipeList};
    }

}