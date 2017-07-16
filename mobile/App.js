import React from 'react';
import { StyleSheet,
         Text,
         Image,
         Button,
         View,
         ListView,
         TouchableHighlight,
         AlertIOS } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCRCAflz7f4nifmb3uhCA5OojC7HV1lXQ4",

  authDomain: "metricality-f7392.firebaseapp.com",
  databaseURL: "https://metricality-f7392.firebaseio.com"
};
firebase.initializeApp(config);
const rootRef = firebase.database().ref();


export default class App extends React.Component {
  constructor() {  
    super();
    this.itemsRef = rootRef.child('counters');
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds
    };
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
    return (
      <Image
        source={{uri: 'https://farm9.staticflickr.com/8196/8092429866_018899bcd7_b.jpg'}}
        style={styles.container}
        blurRadius={4}>
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <Text style={styles.welcome}>
            Welcome to Metricality!
          </Text>
          <FontAwesome
            name={'mixcloud'}
            size={32}
            color="gray"
            onPress={() => { this._addItem() }}
          />
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
        />
      </Image>
    );
  }

  renderRow(rowData) {
    return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={styles.list}>{rowData.text}</Text>
          <FontAwesome
            name={'plus-circle'}
            size={32}
            color="gray"
            onPress={() => { this.itemsRef.child(rowData._key).set({ text: rowData.text, count: ++rowData.count}) }}
          />
          <Text style={{ color: "gray", fontSize: 30, padding: 10 }}>{rowData.count}</Text>
          <FontAwesome
            name={'minus-circle'}
            size={32}
            color="gray"
            onPress={() => { this.itemsRef.child(rowData._key).set({ text: rowData.text, count: --rowData.count}) }}
          />
          <FontAwesome
            name={'repeat'}
            size={32}
            color="orange"
            style={{ paddingLeft: 20 }}
            onPress={() => { this.itemsRef.child(rowData._key).set({ text: rowData.text, count: 0}) }}
          />
          <FontAwesome
            name={'trash-o'}
            size={32}
            color="red"
            style={{ paddingLeft: 20 }}
            onPress={() => { this.itemsRef.child(rowData._key).remove() }}
          />
        </View>
    )
  }


  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          text: child.val().text,
          count: child.val().count,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  _addItem() {
    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ text: text, count: 1 })
          }
        },
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      'plain-text'
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    alignItems: 'center',
  },
  welcome: {
    marginTop: 30,
    fontSize: 21,
    color: 'gray'
  },
  list: {
    width: 170,
    fontSize: 30,
    color: 'lightgray'
  }
});
