import { useLinking } from '@react-navigation/native';
import * as Linking from 'expo-linking';

export default function(containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      Root: {
        path: 'root',
        screens: {
          Home: 'home',
          Stats: 'stats',
          Vids: 'videos',
          Articles: 'articles',
          Links: 'links',
          Settings: 'settings',
        },
      },
    },
  });
}
