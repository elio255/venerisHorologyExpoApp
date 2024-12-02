import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

const CustomDrawerContent = (props) => {
  const { user } = props; 
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;