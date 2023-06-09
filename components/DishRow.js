import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  checkRestaurant,
  removeFromBasket,
  selectBasketItemsWithId,
} from "../features/basketSlice";
import Dialog, { DialogButton, DialogContent, DialogTitle, ScaleAnimation } from "react-native-popup-dialog";

const DishRow = ({ id, name, description, price, image, restaurant }) => {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const Restaurant = useSelector((state) => checkRestaurant(state, restaurant));
  const [scaleAnimationDialog, setScaleAnimationDialog] = useState(false);
  console.log("Restaurant",Restaurant);
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    if (Restaurant.length === 0)
      dispatch(addToBasket({ id, name, description, price, image, restaurant }));
    else if (Restaurant.includes(restaurant))
      dispatch(addToBasket({ id, name, description, price, image, restaurant }));
    else
      setScaleAnimationDialog(true);
  };

  const removeItemFromBasket = () => {
    if (items.length > 0) {
      dispatch(removeFromBasket({ id }));
    } else return;
  };


  
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">₹ {price}</Text>
          </View>
          <View>
            <Image
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>
      <Dialog
          onTouchOutside={() => {
            setScaleAnimationDialog(false);
          }}
          width={0.9}
          visible={scaleAnimationDialog}
          dialogAnimation={new ScaleAnimation()}
          onHardwareBackPress={() => {
            setScaleAnimationDialog(false);
            console.log('onHardwareBackPress');
            return true;
          }}
          dialogTitle={
            <DialogTitle
              title="Cannot Select"
              hasTitleBar={false}
              className="font-bold text-center"
            />
          }
          actions={[
            <DialogButton
              text="DISMISS"
              onPress={() => {
                setScaleAnimationDialog(false);
              }}
              key="button-1"
            />,
          ]}>
          <DialogContent>
            <View>
              <Text className="text-sm pb-6">
              You cannot select items from different restaurants. Please  
              remove the items from the cart to add items from this restaurant.
              </Text>
              <Button
                title="Close"
                onPress={() => {
                  setScaleAnimationDialog(false);
                }}
                key="button-1"
              />
            </View>
          </DialogContent>
        </Dialog>
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity onPress={removeItemFromBasket} disabled={!items.length>0}>
              <MinusCircleIcon size={40} color={items.length>0?"#00ccbb":"gray"} />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon size={40} color={"#00ccbb"} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
