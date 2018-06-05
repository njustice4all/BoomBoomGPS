import React from 'react';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

export const IconIonicons = ({ size = 12, name, color }) => (
  <Ionicons name={name} size={size} color={color} />
);

export const IconFeather = ({ size = 12, name, color }) => (
  <Feather name={name} size={size} color={color} />
);

export const IconMaterial = ({ size = 12, name, color }) => (
  <Material name={name} size={size} color={color} />
);

export const IconEntypo = ({ size = 12, name, color }) => (
  <Entypo name={name} size={size} color={color} />
);
