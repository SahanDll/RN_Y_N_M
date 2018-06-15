import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from 'native-base';
import { View } from 'react-native-animatable';

export default class TopTabs extends Component {
  constructor() {
    super();
    this.state = {
      currentTabIndex: 0, // eslint-disable-line
      tabsStyles: [GLOBAL.mainTopTabsStyle.topTabButtonOn,
        GLOBAL.mainTopTabsStyle.topTabButtonOff, GLOBAL.mainTopTabsStyle.topTabButtonOff],
    };
  }

  clickFunction(index) {
    this.props.switch(index);
    if (index === 0) {
      this.state.tabsStyles = [GLOBAL.mainTopTabsStyle.topTabButtonOn,
        GLOBAL.mainTopTabsStyle.topTabButtonOff, GLOBAL.mainTopTabsStyle.topTabButtonOff];
    } else if (index === 1) {
      this.state.tabsStyles = [GLOBAL.mainTopTabsStyle.topTabButtonOff,
        GLOBAL.mainTopTabsStyle.topTabButtonOn, GLOBAL.mainTopTabsStyle.topTabButtonOff];
    } else {
      this.state.tabsStyles = [GLOBAL.mainTopTabsStyle.topTabButtonOff,
        GLOBAL.mainTopTabsStyle.topTabButtonOff, GLOBAL.mainTopTabsStyle.topTabButtonOn];
    }
  }

  render() {
    return (
      <View animation="fadeInLeft" delay={750} duration={700} style={GLOBAL.mainTopTabsStyle.view}>
        <Button
          full
          activeOpacity={1}
          style={this.state.tabsStyles[0]}
          onPress={this.clickFunction(0)}
        >
          <Text style={GLOBAL.topTabsStyle.text} uppercase={false}>Settings</Text>
        </Button>
        <Button
          full
          activeOpacity={1}
          style={this.state.tabsStyles[1]}
          onPress={this.clickFunction(1)}
        >
          <Text style={GLOBAL.topTabsStyle.text} uppercase={false}>Match</Text>
        </Button>
        <Button
          full
          activeOpacity={1}
          style={this.state.tabsStyles[2]}
          onPress={this.clickFunction(2)}
        >
          <Text style={GLOBAL.topTabsStyle.text} uppercase={false}>Chat</Text>
        </Button>
      </View>
    );
  }
}

TopTabs.propTypes = {
  switch: PropTypes.func.isRequired,
};
