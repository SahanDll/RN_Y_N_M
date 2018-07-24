import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Form, Item, Icon, Input } from 'native-base';
import { ScrollView, StyleSheet, TouchableOpacity, TouchableHighlight, View, Image, Text, Alert, Modal, Button, Platform, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import TopTabs from '../TopTabs/TopTabs';
import Email from '../InputComponents/Email';
import Password from '../InputComponents/Password';
import { getUserSetting } from '../../Service/ApiCalls/Setting';
import { getAuthenticated, getProfileId, getUserName, setAuthenticated } from '../../AppGlobalConfig/Common';
import Images from '../Image/Images';

const load = require('../../../assets/load.png');
const logoff = require('../../../assets/log_off.png');

const hide = { from: { opacity: 0 }, to: { opacity: 0 } };
let count = 0;
export default class SettingsScreen extends Component {
  constructor() {
    super();
    this.state = {
      inputs: [],
      zIndex: 0,
      animating: true,
      settingsAvailable: false,
    };
  }

  changeZindex(i) {
    this.setState({ zIndex: i });
  }
    updateState = () => {

    };

    changeInputFocus = index => () => {
      if (index === 0) {
            this.state.inputs[index+1].state.inputRef._root.focus(); // eslint-disable-line
      }
    };

    press= () => {
      this.setState({ animating: true });
      getUserSetting(getProfileId())
        .then((data) => {
          setTimeout(() => {
            this.setState({ animating: false });
            if (data.status) {
              GLOBAL.showToast(data.setting.birthDay);
            } else {
              GLOBAL.showToast(data.error);
            }
          }, 3000);
        });
    };

    componentDidMount() {
      getUserSetting(getProfileId())
        .then((data) => {
          this.setState({ animating: false });
          if (data.status) {
            this.setState({ settingsAvailable: true });
            // GLOBAL.showToast(data.setting.birthDay);
          } else {
            this.setState({ settingsAvailable: false });
            // GLOBAL.showToast(data.error);
          }
        });
    }

    render() {
      if (getAuthenticated()) {
        if (this.state.settingsAvailable) {
          return (
            <Animatable.View
              animation={hide}
              duration={0}
              ref={(ref) => { this.animationView = ref; }}
              style={{
                          zIndex: this.state.zIndex,
                          position: 'absolute',
                          flex: 1,
                          backgroundColor: 'transparent',
                          width: '100%',
                          height: '100%',
                      }}
            >
              <LinearGradient
                colors={['#051937', '#960F2C']}
                style={{ flex: 1 }}
              >
                <View style={{
 flex: 1, flexDirection: 'row', justifyContent: 'space-between',
}}
                >
                  <View style={{ height: 30 }}>
                    <View
                      style={{
 marginTop: 20, marginLeft: 20,
}}
                    >
                      <Text
                        style={{
                      color: '#eee',
                            fontSize: 36,
                      }}
                      >
                        Hi {getUserName()}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => { showAlertDialog(); }}
                    >
                      <Image
                        source={logoff}
                        resizeMode="contain"
                        style={{
width: 30, height: 30, marginTop: 5, marginRight: 5,
                      }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </Animatable.View>
          );
        }
        return (
          <Animatable.View
            animation={hide}
            duration={0}
            ref={(ref) => { this.animationView = ref; }}
            style={{
                        zIndex: this.state.zIndex,
                        position: 'absolute',
                        flex: 1,
                        backgroundColor: 'transparent',
                        width: '100%',
                        height: '100%',
                    }}
          >
            <View style={{ height: height / 1.2 }}>
              <TouchableOpacity
                onPress={this.press}
              >
                <View style={{ marginTop: height / 3, marginLeft: width / 3.5 }}>
                  <Image source={load} resizeMode="contain" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ height: height / 14 }} />
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 70,
            }}
            >
              <ActivityIndicator
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 80,
              }}
                animating={this.state.animating}
                color="#bc2b78"
                size="large"
              />
            </View>
          </Animatable.View>
        );
      }
      return (
        <Animatable.View
          animation={hide}
          duration={0}
          ref={(ref) => { this.animationView = ref; }}
          style={{
              zIndex: this.state.zIndex,
              position: 'absolute',
              flex: 1,
              backgroundColor: 'transparent',
              width: '100%',
              height: '100%',
          }}
        />
      );
    }
}

function showAlertDialog() {
  Alert.alert(
    `Hi ${getUserName()}`,
    'Do you want to logout?',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => logout(), style: 'ok' },
    ],

  );
}

function logout() {
  GLOBAL.showToast('Logout');
  count += 1;
  Actions.pop({ refresh: { test: count } });
  setTimeout(() => {
    if (getAuthenticated()) {
      setAuthenticated(false);
    }
  }, 2000);
}
