import {ImageSourcePropType} from "react-native";

type Icon = {
    [key: number]: ImageSourcePropType
}
export const RecipeIcon: Icon = {
    1: require("../images/poultry/gn/raw_egg.jpg"),
    2: require("../images/poultry/gn/raw_egg.jpg"),
    3: require("../images/poultry/gn/egg_white.jpg"),
    4: require("../images/poultry/gn/chicken_breast.jpg"),
}