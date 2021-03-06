import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from "react-native";

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      resultText: '',
      calculationText: '',
    }
    this.operations = ['DEL','C','+', '-', '*', '/'];
    this.nums = [[1,2,3,],[4,5,6],[7,8,9],['.',0,'=']]

  }

  calculateResult = () => {
    const text = this.state.resultText;
    this.setState({
      calculationText: eval(text)
    })
  }

  validate = () => {
    const text = this.state.resultText;

    switch(text.slice(-1)){
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
    return true
  }

  buttonPressed = (text) => {

    if(text == '='){
      return this.validate() && this.calculateResult();
    }

    this.setState({
      resultText: this.state.resultText + text
    })
  }

  operate = (operations) => {
    switch(operations) {
      case 'DEL':
        let text = this.state.resultText.split('')
        text.pop();
        this.setState({resultText: text.join('')})
        break
      case 'C':
        this.setState({resultText: '', calculationText: ''})
        break

      case '+':
      case '-':
      case '*':
      case '/':

        const lastChar = this.state.resultText.split('').pop();

        if(this.operations.indexOf(lastChar) > 0) return

        if(this.state.text == '') return
        this.setState({
          resultText: this.state.resultText + operations
        })
    }
  }

  render() {
    let rows = [];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity key={this.nums[i][j]} onPress={() => this.buttonPressed(this.nums[i][j])} style={styles.btn}>
            <Text style={styles.btnText}>{this.nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(
        <View key={this.nums[i]} style={styles.row}>{row}</View>
      )
    }

    let ops = [];
    for(let i = 0; i < this.operations.length; i++){
      ops.push(
        <TouchableOpacity key={this.operations[i]} style={styles.btn} onPress={() => this.operate(this.operations[i])}>
          <Text style={[styles.btnText, styles.white]}>{this.operations[i]}</Text >
        </TouchableOpacity>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  },
  calculationText: {
    fontSize: 30,
    color: "black"
  },
  resultText: {
    fontSize: 40,
    color: "black"
  },
  btn: {
    flex: 1,
    alignItems: "stretch",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    fontSize: 30,
    color: "white"
  },
  white: {
    color: "white"
  },
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#434343"
  },
  result: {
    flex: 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  calculation: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  buttons: {
    flexDirection: "row",
    flex: 7
  },
  numbers: {
    flex: 3,
  },
  operations: {
    backgroundColor: "#636363",
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 40
  }
});
