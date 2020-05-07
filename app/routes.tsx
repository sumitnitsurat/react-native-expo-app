import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from "react-native-elements";

import { RecipeList } from "./recipeList";
import { BmrCalculatorView } from "./bmrCalculator";
import { Settings } from "./settings";

const HomeStack = createStackNavigator();
const HomeStackScreen = () => { 
    return (
    <HomeStack.Navigator> 
        <HomeStack.Screen name="Food Nutrition" component={RecipeList} /> 
        </HomeStack.Navigator>
        );
}
const BmrStack = createStackNavigator();
const BmrStackScreen = () => { 
    return (
    <BmrStack.Navigator> 
        <BmrStack.Screen name="Calculate BMR" component={BmrCalculatorView} /> 
        </BmrStack.Navigator>
        );
    }
const SettingsStack = createStackNavigator();
const SettingsStackScreen = () => { return (
<SettingsStack.Navigator> 
    <SettingsStack.Screen name="Settings" component={Settings} /> 
    </SettingsStack.Navigator>);
}

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
                    activeTintColor: "#072F49",
                    inactiveTintColor: "gray"
                }}
            >
                <Tab.Screen name="Home" component={HomeStackScreen} />
                <Tab.Screen name="BMR" component={BmrStackScreen} />
                <Tab.Screen name="Settings" component={SettingsStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
