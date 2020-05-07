import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View, SafeAreaView, FlatList, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Card, ListItem, Button, Image, Overlay, Badge } from 'react-native-elements';
import {RecipeCard} from "./recipeCard";
import {RecipeOverlay} from "./recipeOverlay"
import {useRecipeList} from "../hooks/useRecipeList";
import {useFilteredRecipeList} from "../hooks/useFilteredRecipeList";
import { users } from "../demo";
import { SearchBar } from 'react-native-elements';

export enum FILTER_TYPE {
  "SEARCH",
  "BADGE"
}

export const RecipeList = () => {
  const [overlayVisible, setOverlayVisibility] = useState(false);
  const [overlayData, setOverlayData] = useState(null);
  const [filterType, setFilterType] = useState(FILTER_TYPE.BADGE);
  const [searchText, setSearchText] = useState("");
  const [selectedBadge, setSelectedBadge] = useState("all");
  const {recipeList, error} = useRecipeList();
  const {filteredRecipeList} = useFilteredRecipeList({ filter: searchText || selectedBadge, type: filterType, recipeList });

   const setOverlay = (item: any) => { 
      setOverlayData(item)
     setOverlayVisibility(!overlayVisible);
   }

   const hideOverlay = () => {
    setOverlayData(null)
    setOverlayVisibility(!overlayVisible);
   }

   const onSearchFilter = (val: string) => {
    setSearchText(val); 
    setFilterType(!!val ? FILTER_TYPE.SEARCH : FILTER_TYPE.BADGE);
   }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search recipe Here..."
        inputContainerStyle={{backgroundColor: "transparent"}}
        onChangeText={onSearchFilter}
        value={searchText}
        lightTheme
        round
        containerStyle={{ backgroundColor: "transparent", borderBottomWidth: 0, borderTopWidth: 0, margin: 10 }}
      />
      <View style={{flexDirection: "row", justifyContent: "space-around"}}>
        <Badge 
          value="Show All" 
          onPress={() => { setSelectedBadge("all"); setFilterType(FILTER_TYPE.BADGE)}}
          containerStyle={selectedBadge === "all" ? styles.badgeSelected : styles.badgeContainer} 
          badgeStyle={styles.badge} 
          textStyle={selectedBadge === "all" ? styles.badgeTextSelected : styles.badgeText} />
        <Badge 
          value="Recipe" 
          onPress={() => { setSelectedBadge("recipe"); setFilterType(FILTER_TYPE.BADGE)}}
          containerStyle={selectedBadge === "recipe" ? styles.badgeSelected : styles.badgeContainer}
          badgeStyle={styles.badge}  
          textStyle={selectedBadge === "recipe" ? styles.badgeTextSelected : styles.badgeText} />
        <Badge 
          value="Drinks" 
          onPress={() => { setSelectedBadge("drinks"); setFilterType(FILTER_TYPE.BADGE)}}
          containerStyle={selectedBadge === "drinks" ? styles.badgeSelected : styles.badgeContainer}
          badgeStyle={styles.badge}  
          textStyle={selectedBadge === "drinks" ? styles.badgeTextSelected : styles.badgeText} />
        <Badge
         value="Raw Food"
         onPress={() => { setSelectedBadge("poultry, plants"); setFilterType(FILTER_TYPE.BADGE)}}
         containerStyle={selectedBadge === "poultry, plants" ? styles.badgeSelected : styles.badgeContainer}
         badgeStyle={styles.badge}  
         textStyle={selectedBadge === "poultry, plants" ? styles.badgeTextSelected : styles.badgeText} />
      </View>
      <FlatList
        data={filteredRecipeList || []}
        renderItem={({ item }) => <RecipeCard item={item} setOverlayAction={setOverlay} />}
        keyExtractor={item => item.name}
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
  },
  badgeContainer: {borderWidth: 1, borderRadius: 20, backgroundColor: "#ffffff", borderColor: "#072F49", padding: 3, margin: 10},
  badge: {backgroundColor: "transparent", borderWidth: 0 },
  badgeSelected: {borderWidth: 1, borderRadius: 20, backgroundColor: "#072F49", borderColor: "#072F49", padding: 3, margin: 10},
  badgeText: {color: "#072F49"},
  badgeTextSelected: {color: "#BFBF06", fontWeight: "500"}
});
