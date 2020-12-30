import React from 'react';
import moment from 'moment';

import {
  AsyncStorage
} from 'react-native';

import DEFAULTS from "../default.json";

export const DebugMode = () => {
  const isDebug = DEFAULTS.debug_mode
  return { isDebug }
}
