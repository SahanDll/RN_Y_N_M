import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';

import { setAuthenticated, getAuthenticated } from '../AppGlobalConfig/Common';

import TopTabs from './TopTabs/TopTabs';
import ChatScreen from './Chat/ChatScreen';
import MatchScreen from './Match/MatchScreen';
import SettingsScreen from './Settings/SettingsScreen';

const iconWidth = (width * 52) / 100;
const iconImage = require('../../assets/sample.png');

let count = 0;

export default class MainAppScreen extends Component {
  moveToLogSignScreen = () => {
    if (getAuthenticated()) {
      this.matchScreen.resetItems();
      setAuthenticated(false);
    }
    count += 1;
    Actions.pop({ refresh: { test: count } });
  };

    changeSettingZindex = (i) => {
      this.settingsScreen.changeZindex(i);
    };

    changeMatchZindex = (i) => {
      this.matchScreen.changeZindex(i);
    };

    changeChatZindex = (i) => {
      this.chatScreen.changeZindex(i);
    };

    moveToMainAppScreen = () => {
      Actions.push('testMainAppScreen');
    };

    switchScreens = index => () => {
      GLOBAL.showToast(`switch to ${index}`);

      if (this.topTabs.state.currentTabIndex !== index) {
        if (index === 0) {
          this.settingsScreen.animationView.fadeInRight(600).then(this.changeSettingZindex(1));
          this.matchScreen.animationView.fadeOutLeft(1).then(this.changeMatchZindex(0));
          this.chatScreen.animationView.fadeOutRight(1).then(this.changeChatZindex(0));
        } else if (index === 1) {
          this.settingsScreen.animationView.fadeOutLeft(1).then(this.changeSettingZindex(0));
          this.matchScreen.animationView.fadeInLeft(600).then(this.changeMatchZindex(1));
          this.chatScreen.animationView.fadeOutRight(1).then(this.changeChatZindex(0));
        } else {
          this.settingsScreen.animationView.fadeOutLeft(1).then(this.changeSettingZindex(0));
          this.matchScreen.animationView.fadeOutRight(1).then(this.changeMatchZindex(0));
          this.chatScreen.animationView.fadeInRight(600).then(this.changeChatZindex(1));
          this.chatScreen.disableImage();
        }
        /* this.topTabs.state.tabsStyles.reverse(); */
        this.topTabs.clickFunction(index);
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
        backgroundColor: appMainColor, alignItems: 'center', justifyContent: 'center',
      }}
          >
            <SettingsScreen
              switch={this.switchScreens(0)}
              move={this.moveToMainAppScreen}
              ref={(ref) => { this.settingsScreen = ref; }}
            />
            <MatchScreen
              move={this.moveToMainAppScreen}
              ref={(ref) => { this.matchScreen = ref; }}
            />
            <ChatScreen
              move={this.moveToMainAppScreen}
              ref={(ref) => { this.chatScreen = ref; }}
            />

            {/*
            <Image
              source={iconImage}
              resizeMode="cover"
              style={{
            width: iconWidth,
            tintColor: mainThemeColor,
            marginTop: -height / 30,
            height: iconWidth * 0.86,
          }}
            /> */}
            <View style={{
 alignSelf: 'center',
                marginTop: height - (height / 7),
                height: height / 14,
                marginBottom: 10,
}}
            />
            {/*            <Button
              bordered
              rounded
              activeOpacity={1}
              onPress={this.moveToLogSignScreen}
              style={{
                zIndex: 2,
            backgroundColor: '#21214C',
            alignSelf: 'center',
            marginTop: height - (height / 7),
            height: height / 14,
            marginBottom: 10,
          }}
            >
              <Text
                uppercase={false}
                style={{
 color: '#eee', fontWeight: '200', fontSize: GLOBAL.totalSize(1.50), textAlign: 'center',
}}
              >{language.logOut}
              </Text>
            </Button> */}
          </View>
        </KeyboardAwareScrollView>
      );
    }
}
