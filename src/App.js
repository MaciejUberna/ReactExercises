import React, { Component } from 'react';
import Persons from './Persons/Persons';

import './App.css';


class App extends Component {
  state = {
    persons: [
      {id: 'sfsdfgw', name: 'Maciek', age: 27},
      {id: '123sfdf', name: 'Max', age: 39, children: 'Rajdy'},
      {id: 'spuydse', name: 'Stefania', age: 25}
    ],
    showPersons: false,
    debugModeOptions: 'normal verbose',
    debugMode: 'verbose'
  }

  sortPersons = () => {
    const personsArr = this.state.persons.slice();
    personsArr.sort(this.sortByAge); 
    this.setState({persons: personsArr});
  }

  sortByAge = (a,b) => {
    return a.age - b.age;
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  nameChangedHandler = (id, event) => {
    const tmpArr = this.state.persons.slice();
    const tmpIndex = tmpArr.findIndex(e => e.id === id);
    if (tmpIndex === -1) {
      if(this.state.debugMode === 'verbose')
        console.log('Warning: App.js:nameChangeHandler:tmpIndex===-1,id='+id);
    } else {
      tmpArr[tmpIndex].name=event.target.value;
      this.setState({persons: tmpArr});
    }
  }

  deletePerson = id => {
    const personIndex = this.state.persons.findIndex(element => element.id === id);
    if (personIndex !== -1) {
      const newPersons = this.state.persons.slice();
      newPersons.splice(personIndex,1);
      this.setState({persons: newPersons});
    }
  }

  someOtherPersons = [{id: 'dgfgdgf', name: 'Gosia', age: 41}, {id: 'qeoird', name: 'Marek', age: 39}];
  
  render() {

    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    const displayArr = this.state.persons.concat(this.someOtherPersons);

    let multiplePersons = null;

    if (this.state.showPersons) {
      multiplePersons = (
        <div>
        <h1>"map" function test with sorting</h1>
        <Persons modifyName={this.nameChangedHandler} click={this.deletePerson} arr={displayArr.sort(this.sortByAge)}></Persons>
        <hr></hr>
        <h1>"find" function test, condition: "element.age > 25"</h1>
        <Persons modifyName={this.nameChangedHandler} click={this.deletePerson} arr={[displayArr.find(element => element.age > 25)]}></Persons>
        <hr></hr>
        <h1>"filter" function test, condition: element.age > 25</h1>
        <Persons modifyName={this.nameChangedHandler} click={this.deletePerson} arr={displayArr.filter(element => element.age > 25)}></Persons>
        <hr></hr>
      </div>
      );
    }

    return (
      <div className="App">
        <button style={style} onClick={this.togglePersonsHandler}>Pokaż ziomków</button>
        {multiplePersons}
      </div>
    );
  }
}

export default App;
