import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import TopTabs from './TopTabs/TopTabs';
import ChatScreen from './Chat/ChatScreen';
import MatchScreen from './Match/MatchScreen';
import SettingsScreen from './Settings/SettingsScreen';

const iconWidth = (width * 52) / 100;
const iconImage = require('../../assets/frame.png');

export default class MainAppScreen extends Component {
  moveToLogSignScreen = () => {
    Actions.pop();
  };

    moveToMainAppScreen = () => {
      Actions.push('testMainAppScreen');
    };

    switchScreens = index => () => {
      if (this.topTabs.state.currentTabIndex !== index) {
        if (index === 0) {
          this.settingsScreen.animationView.fadeInLeft(600).then(this.changeZindex);
          this.matchScreen.animationView.fadeOutRight(400);
          this.chatScreen.animationView.fadeOutRight(400);
        } else if (index === 1) {
          this.settingsScreen.animationView.fadeOutRight(400);
          this.matchScreen.animationView.fadeInLeft(600).then(this.changeZindex);
          this.chatScreen.animationView.fadeOutRight(400);
        } else {
          this.settingsScreen.animationView.fadeOutRight(400);
          this.matchScreen.animationView.fadeOutRight(400);
          this.chatScreen.animationView.fadeInLeft(600).then(this.changeZindex);
        }
        this.topTabs.state.tabsStyles.reverse();
        this.topTabs.setState({ currentTabIndex: index });
      }
    };

    render() {
      return (
        <KeyboardAwareScrollView
          {...GLOBAL.keyboardAvoidView}
          ref={(ref) => { this.keyboardAvoidView = ref; }}
        >
          <TopTabs
            ref={(ref) => { this.topTabs = ref; }}
            switch={this.switchScreens}
          />
          <View style={{
        backgroundColor: appMainColor, flex: 1, alignItems: 'center', justifyContent: 'center',
      }}
          >
            <SettingsScreen
              switch={this.switchScreens(0)}
              move={this.moveToMainAppScreen}
              ref={(ref) => { this.settingsScreen = ref; }}
            />
            <MatchScreen
              switch={this.switchScreens(1)}
              move={this.moveToMainAppScreen}
              ref={(ref) => { this.matchScreen = ref; }}
            />
            <ChatScreen
              switch={this.switchScreens(2)}
              move={this.moveToMainAppScreen}
              ref={(ref) => { this.chatScreen = ref; }}
            />


            {/*        <Image
          source={iconImage}
          resizeMode="cover"
          style={{
            width: iconWidth,
            tintColor: mainThemeColor,
            marginTop: -height / 30,
            height: iconWidth * 0.86,
          }}
        /> */}
            <Button
              onPress={this.moveToLogSignScreen}
              style={{
            backgroundColor: mainThemeColor, alignSelf: 'center', marginTop: height - (height / 8), height: height / 15,
          }}
            >
              <Text
                uppercase={false}
                style={{ color: appMainColor, fontWeight: '600', fontSize: GLOBAL.totalSize(2.35) }}
              >{language.logOut}
              </Text>
            </Button>
          </View>
        </KeyboardAwareScrollView>
      );
    }
}
