import React, { Component } from 'react';
import { View, StatusBar, Platform, BackHandler } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Toast, { DURATION } from 'react-native-easy-toast';
import SplashScreen from 'react-native-splash-screen';
import AppGlobalConfig from './AppGlobalConfig/AppConfig';
import LogSignScreen from './LogSignScreen/LogSignScreen';
import MainAppScreen from './MainAppScreen/MainAppScreen';

import { configure, actions } from './Notification/PushNotifications';


let context;


GLOBAL.showToast = (message) => {
  context.toast.show(message, DURATION.LENGTH_LONG);
};

GLOBAL.resetAppWithNewColorOrTheme = () => {
  context.setState(context.state);
};

export default class App extends Component {
  constructor() {
    super();
    context = this;
    this.state = {
      initLoaded: false,
    };
    configure();
    actions();
    GLOBAL.AppGlobalConfig = AppGlobalConfig;
    AppGlobalConfig.init().finally(() => {
      SplashScreen.hide();
      this.setState({
        initLoaded: true,
      });
    });
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    }
  }
  onBackPressed = () => {
    if (Actions.currentScene === 'logSignScreen') {
      BackHandler.exitApp();
      return false;
    }
    Actions.pop();
    return true;
  };

  render() {
    if (this.state.initLoaded) {
      return (
        <View style={{ flex: 1, backgroundColor: appMainColor }}>
          <StatusBar barStyle="dark-content" hidden={false} />
          <Router
            backAndroidHandler={this.onBackPressed}
            style={{ backgroundColor: appMainColor }}
          >
            <Scene key="root">
              <Scene
                key="logSignScreen"
                component={LogSignScreen}
                hideNavBar
                refresh="true"
                initial
              />
              <Scene
                key="mainAppScreen"
                component={MainAppScreen}
                hideNavBar
                refresh="true"
              />
            </Scene>
          </Router>
          <Toast
            positionValue={height / 8}
            style={{ backgroundColor: mainReverseThemeColor }}
            textStyle={{ fontSize: GLOBAL.totalSize(2.34), color: mainThemeColor, fontWeight: '400' }}
            ref={(ref) => { context.toast = ref; }}
          />
        </View>
      );
    }
    return (null);
  }
}

