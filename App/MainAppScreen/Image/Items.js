import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Image, Alert, Modal, Button, Platform } from 'react-native';
import Swipeable from 'react-native-swipeable';
import { Card } from 'react-native-elements';
import Lightbox from 'react-native-lightbox';

const data = require('../../../assets/sample.png');

import Sample from '../Data/Sample';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  MainContainer: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (Platform.OS === 'ios') ? 20 : 0,

  },

  ModalInsideView: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00BCD4',
    height: 300,
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',

  },

  TextStyle: {

    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
    padding: 20,
    textAlign: 'center',

  },
});

export default class Items extends Component {
    state = {
      currentlyOpenSwipeable: null,
      modalVisible: false,
    };

    setModalVisible(visible) {
      this.setState({ modalVisible: visible });
    }

    handleScroll = () => {
      const { currentlyOpenSwipeable } = this.state;

      if (currentlyOpenSwipeable) {
        currentlyOpenSwipeable.recenter();
      }
    };

    render() {
      const { currentlyOpenSwipeable } = this.state;
      const itemProps = {
        onOpen: (event, gestureState, swipeable) => {
          if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
            currentlyOpenSwipeable.recenter();
          }

          this.setState({ currentlyOpenSwipeable: swipeable });
        },
        onClose: () => this.setState({ currentlyOpenSwipeable: null }),
        onPressDown: () => this.setModalVisible(true),
      };

      return (
        <ScrollView onScroll={this.handleScroll} style={styles.container}>
          <View style={styles.MainContainer}>
            <Modal
              transparent={false}
              animationType="slide"
              visible={this.state.modalVisible}
              onRequestClose={() => { this.setModalVisible(!this.state.modalVisible); }}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.ModalInsideView}>
                  <Text
                    style={styles.TextStyle}
                  >Hi Im Jenny
                  </Text>
                  <Button
                    title="Close"
                    onPress={() => { this.setModalVisible(!this.state.modalVisible); }}
                  />
                  <Button
                    title="Detail"
                    onPress={() => { showAlertDialog(); }}
                  />
                </View>
              </View>
            </Modal>
          </View>
          <Example1 {...itemProps} />

          {/*          <Example2 {...itemProps} />
          <Example3 {...itemProps} /> */}
        </ScrollView>
      );
    }
}

function showAlert() {
  Alert.alert('Hi Love.....');
}

function showAlertDialog() {
  Alert.alert(
    'Hi....',
    'Do you want to chat with me?',
    [
      { text: 'Cancel', onPress: () => leftComplete(), style: 'cancel' },
      { text: 'OK', onPress: () => rightComplete(), style: 'ok' },
    ],

  );
}

function left() {
  GLOBAL.showToast('Swipe Left');
}

function right() {
  GLOBAL.showToast('Swipe Right');
}

function leftComplete() {
  GLOBAL.showToast('Rejected');
}

function rightComplete() {
  GLOBAL.showToast('Accepted');
}

function showModel(value) {
  this.setModalVisible(value);
}

function Example1({ onOpen, onClose, onPressDown }) {
  return (
    <Swipeable
      leftContent={(
        <View style={[styles.listItem, { backgroundColor: 'transparent' }]}>
          <Sample action="REJECT" color="#B91321" />
        </View>
            )}
      rightContent={(
        <View style={[styles.listItem, { backgroundColor: 'transparent' }]}>
          <Sample action="ACCEPT" color="#0ACD13" />
        </View>
      )}
/*      onLeftActionActivate={() => left()}
      onRightActionActivate={() => right()} */
      onLeftActionComplete={() => leftComplete()}
      onRightActionComplete={() => rightComplete()}
    >
      <View style={[styles.listItem, { backgroundColor: 'transparent' }]}>
        <TouchableOpacity
          onPress={onPressDown}
          style={styles.button}
        >
          <Sample action="I Like You" color="#eee" />
        </TouchableOpacity >
      </View>
    </Swipeable>
  );
}

function Example2({ onOpen, onClose }) {
  return (
    <Swipeable
      leftButtonWidth={45}
      leftButtons={[
        <TouchableOpacity style={[styles.leftSwipeItem, { backgroundColor: 'papayawhip' }]}>
          <Text>1</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.leftSwipeItem, { backgroundColor: 'olivedrab' }]}>
          <Text>2</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.leftSwipeItem, { backgroundColor: 'mistyrose' }]}>
          <Text>3</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.leftSwipeItem, { backgroundColor: 'mediumaquamarine' }]}>
          <Text>4</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.leftSwipeItem, { backgroundColor: 'lightslategray' }]}>
          <Text>5</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.leftSwipeItem, { backgroundColor: 'ivory' }]}>
          <Text>6</Text>
        </TouchableOpacity>,
            ]}
      rightContent={(
        <View style={[styles.rightSwipeItem, { backgroundColor: 'linen' }]}>
          <Text>Pull action</Text>
        </View>
            )}
      onLeftButtonsOpenRelease={onOpen}
      onLeftButtonsCloseRelease={onClose}
    >
      <View style={[styles.listItem, { backgroundColor: 'paleturquoise' }]}>
        <Text>Example 2</Text>
      </View>
    </Swipeable>
  );
}

class Example3 extends Component {
    state = {
      leftActionActivated: false,
      toggle: false,
    };

    render() {
      const { leftActionActivated, toggle } = this.state;

      return (
        <Swipeable
          leftActionActivationDistance={200}
          leftContent={(
            <View style={[styles.leftSwipeItem, { backgroundColor: leftActionActivated ? 'lightgoldenrodyellow' : 'steelblue' }]}>
              {leftActionActivated ?
                <Text>release!</Text> :
                <Text>keep pulling!</Text>}
            </View>
                )}
          onLeftActionActivate={() => this.setState({ leftActionActivated: true })}
          onLeftActionDeactivate={() => this.setState({ leftActionActivated: false })}
          onLeftActionComplete={() => this.setState({ toggle: !toggle })}
        >
          <View style={[styles.listItem, { backgroundColor: toggle ? 'thistle' : 'darkseagreen' }]}>
            <Text>Example 3</Text>
          </View>
        </Swipeable>
      );
    }
}
