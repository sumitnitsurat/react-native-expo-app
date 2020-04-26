import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View, SafeAreaView, FlatList, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Card, ListItem, Button, Image, Overlay } from 'react-native-elements';
import {RecipeCard} from "./recipeCard";
import {RecipeOverlay} from "./recipeOverlay"
import {useRecipeList} from "../hooks/useRecipeList";
import { users } from "../demo";
import { SearchBar } from 'react-native-elements';


export const RecipeList = () => {
  const [overlayVisible, setOverlayVisibility] = useState(false);
  const [overlayData, setOverlayData] = useState(null);
  const [searchText, setSearchText] = useState("")
    const {recipeList, error} = useRecipeList();

   const setOverlay = (item: any) => { 
      setOverlayData(item)
     setOverlayVisibility(!overlayVisible);
   }

   const hideOverlay = () => {
    setOverlayData(null)
    setOverlayVisibility(!overlayVisible);
   }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={setSearchText}
        value={searchText}
        lightTheme
        round
        containerStyle={{backgroundColor: "transparent", borderBottomWidth: 0, borderTopWidth: 0, marginTop: 20, marginLeft:20, marginRight: 20 }}
      />
      <FlatList
        data={recipeList || []}
        renderItem={({ item }) => <RecipeCard item={item} setOverlayAction={setOverlay} />}
        keyExtractor={item => item.id}
        numColumns={2}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 20}}
      />
      <Overlay
      isVisible={overlayVisible}
      onBackdropPress={hideOverlay}
    > 
    <>
      {overlayData && <RecipeOverlay recipe={overlayData}></RecipeOverlay>}
      </>
    </Overlay>
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
