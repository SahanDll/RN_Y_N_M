import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, Image, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class Row extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

    press= () => {
      GLOBAL.showToast(this.props.data.title);
    };

    render() {
      return (
        <TouchableOpacity
          onPress={this.press}
        >
          <View
            style={{
 flex: 1, flexDirection: 'row', padding: 5, borderColor: '#eee', borderTopWidth: 0.5, borderBottomWidth: 0.5,
}}
          >
            <Image
              resizeMode="center"
              source={this.props.data.image}
              style={{
 width: 50, height: 50, marginLeft: 20, padding: 5, marginTop: 5, marginBottom: 5,
}}
            />
            <Text style={{ color: '#eee', alignSelf: 'center', marginLeft: 20 }} >{this.props.data.title}</Text>
          </View>
        </TouchableOpacity>
      );
    }
}

Row.propTypes =
    {
      data: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string,
      }),
    };
Row.defaultProps =
    {
      data: {
        image: '',
        title: '',
      },
    };
