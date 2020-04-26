import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

import { RecipeList } from "./recipeList";
import { BmrCalculator } from "./bmrCalculator";
import { Settings } from "./settings";

const Tab = createBottomTabNavigator();

export const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({
                        focused,
                        color,
                        size
                    }: {
                        focused: boolean;
                        color: string;
                        size: number;
                    }) => {
                        let iconName: any;

                        if (route.name === "Home") {
                            iconName = "home";
                        } else if (route.name === "Settings") {
                            iconName = "cog";
                        } else if (route.name === "BMR") {
                            iconName = "male";
                        }

                        // You can return any component that you like here!
                        return (
                            <Icon
                                type="font-awesome"
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    }
                })}
                tabBarOptions={{
                    activeTintColor: "tomato",
                    inactiveTintColor: "gray"
                }}
            >
                <Tab.Screen name="Home" component={RecipeList} />
                <Tab.Screen name="BMR" component={BmrCalculator} />
                <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
