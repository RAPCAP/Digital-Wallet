import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import { Settings, Dashboard } from 'src/modules';

import { Routes } from './routes';
import { TabBar } from 'src/ui';

const renderScene = SceneMap({
  [Routes.Dashboard]: Dashboard,
  [Routes.Settings]: Settings,
});

export const Tabs = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: Routes.Dashboard, title: Routes.Dashboard },
    { key: Routes.Settings, title: Routes.Settings },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      tabBarPosition={'bottom'}
      renderScene={renderScene}
      renderTabBar={props => <TabBar {...props} />}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};
