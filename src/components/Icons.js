import React from 'react';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const IconIonicons = ({ size = 12, name, color }) => (
  <Ionicons name={name} size={size} color={color} />
);

export const IconFeather = ({ size = 12, name, color }) => (
  <Feather name={name} size={size} color={color} />
);
