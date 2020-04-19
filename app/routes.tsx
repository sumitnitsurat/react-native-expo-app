import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'
import { ScrollView } from "react-native";

import {FoodList} from "./foodList";
import {BmrCalculator} from "./bmrCalculator";

const Tab = createBottomTabNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }: {focused: boolean, color: string, size: number}) => {
            let iconName: any;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Settings') {
              iconName = 'cog';
            } else if (route.name === 'BMR') {
                iconName = 'male';
              }


            // You can return any component that you like here!
            return <Icon type='font-awesome' name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={FoodList} />
        <Tab.Screen name="BMR" component={BmrCalculator} />
        <Tab.Screen name="Settings" component={FoodList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}