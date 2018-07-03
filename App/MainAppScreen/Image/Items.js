import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Image, Alert, Modal, Button, Platform } from 'react-native';
import Swipeable from 'react-native-swipeable';
import { Card } from 'react-native-elements';
import Lightbox from 'react-native-lightbox';

import Sample from '../Data/Sample';

const data = require('../../../assets/sample.png');
const data1 = require('../../../assets/sample1.png');
const data2 = require('../../../assets/sample2.png');
const data3 = require('../../../assets/sample3.png');
const data4 = require('../../../assets/sample4.png');
const load = require('../../../assets/load.png');

let imageItem = 0;
let render = true;
let images = [];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
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
    backgroundColor: '#13B9AB',
    height: '80%',
    width: '80%',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#00BCD4',

  },

  TextStyle: {

    fontSize: 20,
    marginBottom: 20,
    color: '#405FA6',
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
      if (render) {
        this.setState({ modalVisible: visible });
      } else {
        images = [data, data1, data2, data3, data4];
        render = true;
        imageItem = 0;
        this.setState(this.state);
        GLOBAL.showToast('Data Refreshing');
      }
    }

    resetImages = () => {
      images = [data, data1, data2, data3, data4];
      render = true;
      imageItem = 0;
      this.setState(this.state);
      GLOBAL.showToast('Data Reset');
    };

    handleScroll = () => {
      const { currentlyOpenSwipeable } = this.state;

      if (currentlyOpenSwipeable) {
        currentlyOpenSwipeable.recenter();
      }
    };

    render() {
      images = [data, data1, data2, data3, data4];
      const { currentlyOpenSwipeable } = this.state;
      // noinspection JSAnnotator
      const itemProps = {
        onOpen: (event, gestureState, swipeable) => {
          if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
            currentlyOpenSwipeable.recenter();
          }

          this.setState({ currentlyOpenSwipeable: swipeable });
        },
        onClose: () => this.setState({ currentlyOpenSwipeable: null }),
        onPressDown: () => this.setModalVisible(true),
        onChange: () => { this.setState(this.state); },
      };

      return (
        <ScrollView onScroll={this.handleScroll} style={styles.container}>
          <View style={styles.MainContainer}>
            <Modal
              transparent
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
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ margin: 5 }}>
                      <Button
                        title="Close"
                        onPress={() => { this.setModalVisible(!this.state.modalVisible); }}
                      />
                    </View>
                    <View style={{ margin: 5 }}>
                      <Button
                        title="Detail"
                        style={{ margin: 5 }}
                        onPress={() => { showAlertDialog(); }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <Example1 {...itemProps} ref={(ref) => { this.example1 = ref; }} />

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
  imageItem += 1;
  if (images.length <= imageItem) {
    render = false;
  }
  GLOBAL.showToast(`Rejected ${imageItem} ${render}`);
}

function rightComplete() {
  imageItem += 1;
  if (images.length <= imageItem) {
    render = false;
  }
  GLOBAL.showToast(`Accepted ${imageItem} ${render}`);
}

function showModel(value) {
  this.setModalVisible(value);
}

function Example1({
  onOpen, onClose, onPressDown, onChange,
}) {
  if (render) {
    return (
      <Swipeable
        leftContent={(
          <View style={[styles.listItem, { backgroundColor: 'transparent' }]}>
            <Sample action="REJECT" color="#B91321" image={images[imageItem]} ref={(ref) => { this.sampleL = ref; }} />
          </View>
                )}
        rightContent={(
          <View style={[styles.listItem, { backgroundColor: 'transparent' }]}>
            <Sample action="ACCEPT" color="#0ACD13" image={images[imageItem]} ref={(ref) => { this.sampleR = ref; }} />
          </View>
                )}

                /*      onLeftActionActivate={() => left()}
                      onRightActionActivate={() => right()} */
        onLeftActionRelease={() => leftComplete()}
        onRightActionRelease={() => rightComplete()}
        onLeftActionComplete={onChange}
        onRightActionComplete={onChange}
        // onSwipeComplete={onChange}
      >
        <View style={[styles.listItem, { backgroundColor: 'transparent' }]}>
          <TouchableOpacity
            onPress={onPressDown}
            style={styles.button}
          >
            <Sample
              action="I Like You"
              color="#eee"
              image={images[imageItem]}
              ref={(ref) => { this.sample = ref; }}
            />
          </TouchableOpacity >
        </View>
      </Swipeable>
    );
  }
  return (
    <View style={[styles.listItem, { backgroundColor: 'transparent' }]}>
      <Text style={{
                  backgroundColor: 'transparent',
                  textAlign: 'center',
          marginTop: 10,
          color: '#eee',
              }}
      >Click to refresh
      </Text>
      <View style={[styles.listItem, { backgroundColor: 'transparent' }]}>
        <TouchableOpacity
          onPress={onPressDown}
          style={styles.button}
        >
          <Sample
            action="No Matching Profiles Found Near by"
            color="#eee"
            image={load}
            ref={(ref) => { this.sampleL = ref; }}
          />
        </TouchableOpacity >
      </View>
    </View>
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
