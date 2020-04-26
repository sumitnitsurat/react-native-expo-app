import React, { useEffect } from 'react';

import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { RecipeIcon } from "../constant/recipeIcon";

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
            style={{ width: "100%", height: 140 }}
            resizeMode='contain'
            source={RecipeIcon[item.id]}
          />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: 20, height: 20, marginRight: 5 }}
              source={type}
            />
            <Text style={{ textAlign: "center", marginTop: 8, fontSize: 15, fontWeight: '600', color: "#3090C7" }}>{item.name}</Text>
          </View>
        </Animated.View>
        <Animated.View style={[backAnimatedStyle, styles.cardContainerFront, styles.cardContainerBack]}>
          <Text style={{ textAlign: "center", marginTop: 8, fontSize: 15, fontWeight: '600', color: "#3090C7", fontFamily: "System" }}>{item.name} (Serving {item.quantity})</Text>
          <Text style={{ margin: 3, fontSize: 11 }}>
            <Text style={{ fontWeight: '600' }}>
              Calories:
              </Text>
            {item.calories} cal
            </Text>
          <Text style={{ margin: 3, fontSize: 11 }}>
            <Text style={{ fontWeight: '600' }}>
              Protein:
            </Text> {item.protein} g</Text>
          <Text style={{ margin: 3, fontSize: 11 }}>
            <Text style={{ fontWeight: '600' }}>
              Total Fat:
              </Text> {item.fat} g
            </Text>
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
    marginHorizontal: 20,
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
  }
});
