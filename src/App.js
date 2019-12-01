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
    otherState: 'Other state value',
    showPersons: false
  }

  sortPersons = () => {
    const personsArr = this.state.persons.slice();
    personsArr.sort(this.sortByAge);
    // console.log(personsArr);
    this.setState({persons: personsArr});
  }

  sortByAge = (a,b) => {
    return a.age - b.age;
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  nameChangedHandler = () => {
    
  }

  deletePerson = (id) => {
    const personIndex = this.state.persons.findIndex(element => element.id === id);
    if (personIndex !== -1) {
      const newPersons = this.state.persons.slice();
      newPersons.splice(personIndex,1);
      console.log('newPersons length: '+newPersons.length);
      this.setState({persons: newPersons});
    }
  }

  someOtherPersons = [{id: 'dgfgdgf', name: 'Gosia', age: 41}, {id: 'qeoird', name: 'Marek', age: 39}];
  
  render() {
    const displayArr = this.state.persons.slice();

    const iterator = displayArr.entries();
    const newDisplayArr = [];
    for(let element of iterator) {
      newDisplayArr.unshift(...element.slice(1));
    }

    return (
      <div className="App">
        <button onClick={this.togglePersonsHandler}>Show persons</button>
        { this.state.showPersons ? <div>
          <h1>"map" function test with sorting</h1>
          <Persons click={this.deletePerson} arr={displayArr.sort(this.sortByAge)}></Persons>
          <hr></hr>
          <h1>"find" function test, condition: "element.age > 25"</h1>
          <Persons click={this.deletePerson} arr={[displayArr.find(element => element.age > 25)]}></Persons>
          <hr></hr>
          <h1>"filter" function test, condition: element.age > 25</h1>
          <Persons click={this.deletePerson} arr={displayArr.filter(element => element.age > 25)}></Persons>
          <hr></hr>
          <h1>"splice" function test, adding "someOtherPersons"</h1>
          {displayArr.splice(displayArr.length,0,...this.someOtherPersons)}
          <Persons click={this.deletePerson} arr={displayArr}></Persons>
          <hr></hr>
          <h1>"entries" test</h1>
          <Persons click={this.deletePerson} arr={newDisplayArr}></Persons>
          <hr></hr>
          <h1>"concat" test</h1>
          <Persons click={this.deletePerson} arr={newDisplayArr.concat(this.someOtherPersons)}></Persons>
        </div> : null }
      </div>
    );
  }
}

export default App;
