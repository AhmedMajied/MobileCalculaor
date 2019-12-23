/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      calculation: "",
      result:""
    }

    this.operations = ['Del', '*', '/', '+', '-'];
  }

  pressButton(button) {
    
    if(button == '='){
      if(this.validate())
        this.setState({result: eval(this.state.calculation)})
      return;
    }
    
    this.setState({
      calculation: this.state.calculation + button
    })
  }

  validate(){
    if(this.operations.indexOf(this.state.calculation.slice(-1)) != -1)
      return false;
    return true;
  }

  pressOperation(operation) {
    switch (operation) {
      case 'Del':
        let text = this.state.calculation.split('');
        text.pop();
        this.setState({
          calculation: text.join('')
        })
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        let lastChar = this.state.calculation.slice(-1);
        if(this.operations.indexOf(lastChar) > 0) return;
        if(this.state.calculation == "") return;
        this.setState({ calculation: this.state.calculation + operation})
    }
  }

  render() {
    let buttons = [[1,2,3],[4,5,6],[7,8,9],['.',0,'=']]
    let nums = [];
    for (let i = 0; i < buttons.length; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(<TouchableOpacity key={buttons[i][j]} onPress={() => this.pressButton(buttons[i][j])} style={styles.btn}>
          <Text style={styles.btnText}>{buttons[i][j]}</Text>
        </TouchableOpacity>);
      }
      nums.push(<View style={styles.row}>{row}</View>);
    }

    let col = [];
    for (let i = 0; i < this.operations.length; i++) {
      col.push(<TouchableOpacity key={this.operations[i]} onPress={() => this.pressOperation(this.operations[i])} style={styles.btn}>
        <Text style={styles.btnText}>{this.operations[i]}</Text>
      </TouchableOpacity>)
    }

    return (
      <View style={styles.container}>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculation}</Text>
        </View>
        <View style={styles.result}><Text style={styles.resultText}>{this.state.result}</Text></View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{nums}</View>
          <View style={styles.operations}>{col}</View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  calculation: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculationText: {
    fontSize: 70,
    color: 'black'
  },
  resultText: {
    fontSize: 50,
    color: 'red'
  },
  result: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons: {
    flex: 7,
    flexDirection: 'row'
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: 'white',
    fontSize: 25
  },
  row: {
    flexDirection: 'row',
    flex: 1
  },
  numbers: {
    flex: 3,
    backgroundColor: '#434343',
    justifyContent: 'center',

  },
  operations: {
    flex: 1,
    backgroundColor: '#636363'
  }
});

export default App;
