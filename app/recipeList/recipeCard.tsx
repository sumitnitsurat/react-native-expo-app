import React, { useEffect } from 'react';

import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { RecipeIcon } from "../constant/recipeIcon";
import {CustomText} from "../common/CustomText";

export const RecipeCard = ({ item, setOverlayAction }: { item: any, setOverlayAction: (item: any) => void }) => {
  const animatedValue = new Animated.Value(0);
  let newValue = 0;

  useEffect(() => {
    animatedValue.addListener(({ value }) => newValue = value);
  }, [animatedValue]);
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg']
  });
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
  });

  const frontAnimatedStyle = {
    transform: [
      { rotateY: frontInterpolate }
    ]
  };
  const backAnimatedStyle = {
    transform: [
      { rotateY: backInterpolate }
    ]
  }

  const flipCard = () => {
    if (newValue >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }
  const type = item.type === 'veg' ? require("../images/veg.png") : require("../images/non-veg.png")
  return (
    <TouchableOpacity
      onLongPress={() => setOverlayAction(item)}
      onPress={flipCard}
      style={styles.container}
    >
      <>
        <Animated.View style={[styles.cardContainerFront, frontAnimatedStyle, styles.cardWithShadow]}>
          <Image
            style={{ width: "100%", height: 100 }}
            resizeMode='contain'
            source={RecipeIcon[item.id]}
          />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <CustomText style={{ textAlign: "center", marginTop: 8, fontSize: 15, color: "#A52A2A" }}>{item.name}</CustomText>
          </View>
          <View style={{flex: 1, flexDirection: "row", padding: 5, justifyContent: "space-around"}}>
          <Image
              style={{ width: 15, height: 15 }}
              source={type}
            />
              <CustomText style={{ textAlign: "left", fontSize: 12 }}>Unit: {item.quantity} {item.unit}</CustomText>
              <CustomText style={{ textAlign: "left", fontSize: 12 }}>Cal: {item.calories}</CustomText>
            </View>
        </Animated.View>
        <Animated.View style={[backAnimatedStyle, styles.cardContainerFront, styles.cardContainerBack]}>
          <CustomText style={{ textAlign: "center", marginTop: 8, fontSize: 15, fontWeight: '600', color: "#3090C7", fontFamily: "System" }}>{item.name} (Serving {item.quantity})</CustomText>
          <CustomText style={styles.textContainerStyle}>
            <CustomText style={{ fontWeight: '600' }}>
              Calories:
              </CustomText>
            {item.calories} cal
            </CustomText>
          <CustomText style={styles.textContainerStyle}>
            <CustomText style={{ fontWeight: '600' }}>
              Protein:
            </CustomText> {item.protein} g</CustomText>
          <CustomText style={styles.textContainerStyle}>
            <CustomText style={{ fontWeight: '600' }}>
              Total Fat:
              </CustomText> {item.fat} g
            </CustomText>
        </Animated.View>
      </>
    </TouchableOpacity>
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
  cardContainerFront: {
    flex: 1,
    marginHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    backfaceVisibility: "hidden"
  },
  cardContainerBack: {
    position: "absolute",
    top: 0,
    alignItems: "flex-start",
    alignSelf: 'stretch'
  },
  cardWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: .5 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3
  },
  textContainerStyle: { margin: 3, fontSize: 11 }
});
