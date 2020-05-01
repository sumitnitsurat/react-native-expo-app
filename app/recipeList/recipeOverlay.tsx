import React, { useEffect } from 'react';

import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import {RecipeIcon} from "../constant/recipeIcon";
import {CustomText} from "../common/CustomText";

export const RecipeOverlay = ({ recipe }: {recipe: any}) => {

    const type = recipe.type === 'veg' ? require("../images/veg.png") : require("../images/non-veg.png")
    return (
        <>
            <Image
              style={{width: "100%", height: 140 }}
              resizeMode='contain'
              source={RecipeIcon[recipe.id]}
            />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={{ width: 20, height: 20, marginRight: 5 }}
                source={type}
              />
              <CustomText style={{ textAlign: "center", marginTop: 8, fontSize: 15, fontWeight: '600', color: "#3090C7" }}>{recipe.name}</CustomText>
            </View>
            <CustomText style={styles.serving}>Serving {recipe.quantity} {recipe.quantity > 1  ? 'g' : 'unit'}</CustomText>
            <CustomText style={{margin: 3, fontSize: 11}}>
              <CustomText style={{ fontWeight: '600'}}>
              Calories:
              </CustomText> 
              {recipe.calories} cal
            </CustomText>
            <CustomText style={{margin: 3,fontSize: 11 }}> 
              <CustomText style={{ fontWeight: '600'}}>
              Protein: 
            </CustomText> {recipe.protein} g</CustomText>
            <CustomText style={{margin: 3,fontSize: 11 }}>
              <CustomText style={{ fontWeight: '600' }}>
                Total Fat: 
              </CustomText> {recipe.fat} g
            </CustomText>
        </>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    image: {
      width: "100%", height: 100
    },
    name: {
      fontSize: 12,
    },
    serving: {
       textAlign: "center", marginTop: 8, fontSize: 15, fontWeight: '600', color: "#3090C7", fontFamily: "System" 
    }
  });
  