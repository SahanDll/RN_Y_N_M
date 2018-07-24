import React, { Component } from 'react';
import { Form, Item, Input } from 'native-base';
import { ScrollView, StyleSheet, TouchableOpacity, TouchableHighlight, View, Text, Image, Alert, Modal, Button, Platform, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, SearchBar } from 'react-native-elements';
import TopTabs from '../TopTabs/TopTabs';
import Email from '../InputComponents/Email';
import Password from '../InputComponents/Password';
import { getAuthenticated, getProfileId, getUserName, setAuthenticated } from '../../AppGlobalConfig/Common';


import Row from './Row';
import Images from '../Image/Images';

const load = require('../../../assets/load.png');
const bottom = require('../../../assets/bottom.gif');

const hide = { from: { opacity: 0 }, to: { opacity: 0 } };
let data = [];

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      inputs: [],
      zIndex: 0,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      showImage: false,
      search: '',
      cover: 2,
    };

    this.mColor = '#050';
    this.cColor = '#f50';
    this.fColor = '#050';
  }

  dataFill() {
    data = [
      { title: 'My chat 1', image: load },
      { title: 'My chat 2', image: load },
      { title: 'My chat 3', image: load },
      { title: 'My chat 4', image: load },
      { title: 'My chat 5', image: load },
      { title: 'My chat 6', image: load },
      { title: 'My chat 7', image: load },
      { title: 'My chat 8', image: load },
      { title: 'My chat 9', image: load },
      { title: 'My chat 10', image: load },
      { title: 'My chat 11', image: load },
      { title: 'My chat 12', image: load },
      { title: 'My chat 13', image: load },
      { title: 'My chat 14', image: load },
      { title: 'My chat 15', image: load },
      { title: 'My chat 16', image: load },
      { title: 'My chat 17', image: load },
      { title: 'My chat 18', image: load },
      { title: 'My chat 19', image: load },
      { title: 'My chat 20', image: load },
    ];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  }
  componentDidMount() {
    this.dataFill();
  }

  changeZindex(i) {
    this.setState({ zIndex: i });
  }

  changeCover(x) {
    if (x === 1) {
      this.mColor = '#f50';
      this.cColor = '#050';
      this.fColor = '#050';
    } else if (x === 2) {
      this.mColor = '#050';
      this.cColor = '#f50';
      this.fColor = '#050';
    } else {
      this.mColor = '#050';
      this.cColor = '#050';
      this.fColor = '#f50';
    }
    this.setState({ cover: x });
  }

  updateState = () => {

  };

    disableImage = () => {
      this.setState({ showImage: true });
      setTimeout(() => {
        this.setState({ showImage: false });
      }, 7800);
    };

    handleSearchChange = (text) => {
      this.dataFill();
      this.setState(state => ({ ...state, search: text || '' }));
      data = filterByTitle(text);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
      });
      GLOBAL.showToast(text);
    };

    handleSearchCancel = () => this.handleSearchChange('');
    handleSearchClear = () => this.handleSearchChange('');

    changeInputFocus = index => () => {
      if (index === 0) {
            this.state.inputs[index+1].state.inputRef._root.focus(); // eslint-disable-line
      }
    };


  /*    _renderRow(row) {
      GLOBAL.showToast(`${JSON.stringify(row)}`);
      /!* return <Row data={row} />; *!/
      return <Text key={row} style={{ padding: 4 }}>{row}</Text>;
    } */

    renderRow(rowData) {
      return (<Row
        data={rowData}
        style={{
          padding: 4,
      }}
      />);
    }

    render() {
      if (getAuthenticated()) {
        return (
          <Animatable.View
            animation={hide}
            duration={0}
            ref={(ref) => {
                        this.animationView = ref;
                    }}
            style={{
                        zIndex: this.state.zIndex,
                        position: 'absolute',
                        flex: 1,
                        backgroundColor: 'transparent',
                        width: '100%',
                        height: '100%',
                    }}
          >
            {/*          <ScrollView
                  onScroll={this.handleScroll}
                  style={{ marginTop: height / 3, marginLeft: width / 4 }}
                >
                  <Image source={load} resizeMode="contain" />
                </ScrollView> */}
            <LinearGradient
              colors={['#051937', '#960F2C']}
              style={{ flex: 1 }}
            >
              <View style={{ height: height / 1.26 }}>
                <View>
                  <SearchBar
                    round
                    clearIcon={{ color: 'red' }}
                    searchIcon={false}
                    onChangeText={this.handleSearchChange}
                    onCancel={this.handleSearchCancel}
                    onClear={this.handleSearchClear}
                    placeholder="Search..."
                    value={this.state.search}
                  />
                </View>
                {this.state.cover === 1 ?
                  <View >
                    <Text style={{ color: 'white' }}> Matched People</Text>
                  </View> : null}
                {this.state.cover === 2 ?
                  <ListView
                    style={{
                              flex: 1,
                          }}
                    dataSource={this.state.dataSource}
                    renderRow={rowData => this.renderRow(rowData)}
                  /> : null}
                {this.state.cover === 3 ?
                  <View >
                    <Text style={{ color: 'white' }}> Favariot People</Text>
                  </View> : null}
              </View>
              <View
                style={{
 marginTop: 1, marginBottom: 1, width, height: height - (height / 1.24), position: 'relative',
}}
              >
                {this.state.showImage ?
                  <Image
                    resizeMode="contain"
                    source={bottom}
                    style={{ flex: 1, width: undefined, height: undefined }}
                  /> :
                  <View>
                    <View style={{
 margin: 5, padding: 5, flex: 1, flexDirection: 'row', justifyContent: 'space-around',
}}
                    >
                      <Icon
                        raised
                        name="user"
                        type="font-awesome"
                        color={this.mColor}
                        underlayColor="#f50"
                        onPress={() => this.changeCover(1)}
                      />
                      <Icon
                        raised
                        name="comment"
                        type="font-awesome"
                        color={this.cColor}
                        underlayColor="#f50"
                        onPress={() => this.changeCover(2)}
                      />
                      <Icon
                        raised
                        name="heartbeat"
                        type="font-awesome"
                        color={this.fColor}
                        underlayColor="#f50"
                        onPress={() => this.changeCover(3)}
                      />
                    </View>
                  </View>}

              </View>
            </LinearGradient>
          </Animatable.View>
        );
      }
      return (
        <Animatable.View
          animation={hide}
          duration={0}
          ref={(ref) => {
                  this.animationView = ref;
              }}
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

function filterByTitle(title) {
  return data.filter(x => String(x.title).includes(title));
}
