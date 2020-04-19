import React, { useEffect } from 'react';

import { StyleSheet, Text, View, SafeAreaView, FlatList, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Card, ListItem, Button, Image } from 'react-native-elements';
import { users } from "./demo";

const RenderItem = ({ item }) => {
  const animatedValue = new Animated.Value(0);
  let newValue = 0;

  useEffect(() => {
    animatedValue.addListener(({ value }) => { console.log("changing value", value); newValue = value });
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
    console.log(newValue, "value")
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
  const type = item.type === 'veg' ? require("./images/veg.png") : require("./images/non-veg.png")
  console.log(item)
  return (
    <TouchableOpacity
      onPress={flipCard}
      style={styles.container}
    >
      <>

        <Animated.View style={[styles.cardContainerFront, frontAnimatedStyle]}>
          <Image
            style={{ width: "100%", height: 140 }}
            source={item.avatar}
          />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: 20, height: 20, marginRight: 5 }}
              source={type}
            />
            <Text style={{ textAlign: "center", marginTop: 8, fontSize: 15, fontWeight: '600' }}>{item.name}</Text>
          </View>
        </Animated.View>
        <Animated.View style={[backAnimatedStyle, styles.cardContainerFront, styles.cardContainerBack]}>
          <Text style={{ textAlign: "center", marginTop: 8, fontSize: 15, fontWeight: '600' }}>{item.name} ({item.nutrition.amountPerServing.value}{item.nutrition.amountPerServing.unit})</Text>
          <Text style={{marginTop: 5}}>
            <Text style={{fontSize: 6}}>{'\u2B24'}</Text>
            <Text style={{ fontWeight: '600', fontSize: 12 }}>
            {item.nutrition.calories.name}:
            </Text> 
            {item.nutrition.calories.value}{item.nutrition.calories.unit}
          </Text>
          <Text> 
            <Text style={{fontSize: 6}}>{'\u2B24'}</Text> 
            <Text style={{ fontWeight: '600', fontSize: 12 }}>
            {item.nutrition.protein.name}: 
          </Text> {item.nutrition.protein.value}{item.nutrition.protein.unit}</Text>
          <Text><Text style={{fontSize: 6}}>{'\u2B24'}</Text> <Text style={{ fontWeight: '600', fontSize: 12 }}>
            {item.nutrition.fat.name}: 
          </Text> {item.nutrition.fat.value}{item.nutrition.fat.unit}</Text>
        </Animated.View>
      </>
    </TouchableOpacity>
  );
}


export const FoodList = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Text>Open up App.tsx</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={item => item.name}
        numColumns={2}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </SafeAreaView>
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
    alignItems: "flex-start"
  }
});
