import React, { useEffect } from 'react';

import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import { Image, Divider } from 'react-native-elements';
import {RecipeIcon} from "../constant/recipeIcon";
import {CustomText} from "../common/CustomText";
import YouTube from 'react-native-youtube';

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
                style={{ width: 15, height: 15, marginRight: 5 }}
                source={type}
              />
              <CustomText style={{ textAlign: "center", marginTop: 8, fontSize: 15, fontWeight: '500', color: "#A52A2A" }}>{recipe.name}</CustomText>
            </View>
            <View style={styles.nutritionContainer}>
              <View style={styles.valueBox}>
                <CustomText style={styles.serving}>Serving: {recipe.quantity} {recipe.unit}</CustomText>
              </View>
              <View style={styles.valueBox}>
              <CustomText style={{margin: 3, fontSize: 11}}>
                <CustomText style={{ fontWeight: '600'}}>
                Calories:
                </CustomText> 
                <CustomText>
                {recipe.calories} cal
                </CustomText>
              </CustomText>
              </View>
              <View style={styles.valueBox}>
              <CustomText style={{margin: 3,fontSize: 11 }}> 
                <CustomText style={{ fontWeight: '600'}}>
                Protein: 
              </CustomText> {recipe.protein} g</CustomText>
              </View>
              <View style={styles.valueBox}>
              <CustomText style={{margin: 3,fontSize: 11 }}>
                <CustomText style={{ fontWeight: '600' }}>
                  Total Fat: 
                </CustomText> {recipe.fat} g
              </CustomText>
              </View>
              <View style={styles.valueBox}>
                <CustomText style={{margin: 3,fontSize: 11 }}>
                  <CustomText style={{ fontWeight: '600' }}>
                    Carbohydrate: 
                  </CustomText> {recipe.carbohydrate} g
                </CustomText>
              </View>
              { recipe.calcium !== "NULL" && <View style={styles.valueBox}>
                <CustomText style={{margin: 3,fontSize: 11 }}>
                  <CustomText style={{ fontWeight: '600' }}>
                    Calcium: 
                  </CustomText> {recipe.calcium} g
                </CustomText>
              </View>}
              { recipe.cholesterol !== "NULL" && <View style={styles.valueBox}>
                <CustomText style={{margin: 3,fontSize: 11 }}>
                  <CustomText style={{ fontWeight: '600' }}>
                    Cholesterol: 
                  </CustomText> {recipe.cholesterol} g
                </CustomText>
              </View>}
            </View>
            {recipe.youtube !== "NULL" && <View style={{margin: 5}}>
              <CustomText style={{marginTop: 10, marginBottom: 10}}>How to prepare at home:</CustomText>
              <YouTube
                videoId={recipe.youtube} // The YouTube video ID
                play={false} // control playback of video with true/false
                style={{ alignSelf: 'stretch', height: 300 }}
              />
            </View>}
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
       textAlign: "center", marginTop: 8, fontSize: 15 
    },
    nutritionContainer: {
      borderWidth: 1,
      flexDirection: "column",
      marginTop: 20
    },
    valueBox: {borderBottomWidth: .5, padding: 5}
  });
  