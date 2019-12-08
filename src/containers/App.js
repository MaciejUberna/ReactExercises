import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import moduleClasses from './App.module.css';



class App extends Component {
  state = {
    persons: [
      {id: 'sfsdfgw', name: 'Maciek', age: 27},
      {id: '123sfdf', name: 'Max', age: 39, children: 'Rajdy'},
      {id: 'spuydse', name: 'Stefania', age: 25}
    ],
    personStateOptions: ['hiddenPersons','mannyPersons','lessThan3Persons'],
    personState: 'hiddenPersons',
    debugModeOptions: ['normal', 'verbose'],
    debugMode: 'verbose'
  }

  addStyleToClass = (classArray,newClassString) => {
    if(classArray.findIndex(e => e === newClassString)===-1)
      classArray.push(newClassString);
  }

  removeStyleFromClass = (classArray,stringToRemove) => {
    const index = classArray.findIndex(e => e === stringToRemove);
    if(index !== -1)
      classArray.splice(index,1);
  }

  sortPersons = () => {
    const personsArr = this.state.persons.slice();
    personsArr.sort(this.sortByAge); 
    this.setState({persons: personsArr});
  }

  sortByAge = (a,b) => {
    return a.age - b.age;
  }

  toggleActivePersonsHandler = () => {
    if(this.state.persons.length <= 2)
      this.setState({personState: 'lessThan3Persons'});
    else
      this.setState({personState: 'mannyPersons'});
  }

  togglePersonsHandler = () => {
    if (this.state.personState !== 'hiddenPersons')
      this.setState({personState: 'hiddenPersons'});
    else
      this.toggleActivePersonsHandler();
  }

  nameChangedHandler = (id, event) => {
    const copiedArrayReferencesOfPersons = this.state.persons.slice();
    const personIndex = copiedArrayReferencesOfPersons.findIndex(e => e.id === id);
    if (personIndex === -1) {
      if(this.state.debugMode === 'verbose')
        console.warn('Warning: App.js:nameChangeHandler:personIndex===-1,id='+id);
    } else {
      //const copiedPerson = {...this.state.persons[personIndex]};
      const copiedPerson = Object.assign({},this.state.persons[personIndex]);
      copiedPerson.name = event.target.value; 

      copiedArrayReferencesOfPersons[personIndex] = copiedPerson;

      this.setState({persons: copiedArrayReferencesOfPersons});
    }
  }

  deletePerson = id => {
    const personIndex = this.state.persons.findIndex(element => element.id === id);
    if (personIndex !== -1) {
      const newPersons = this.state.persons.slice();
      newPersons.splice(personIndex,1);
      this.setState({persons: newPersons});
      this.toggleActivePersonsHandler();
    }
  }

  someOtherPersons = [{id: 'dgfgdgf', name: 'Gosia', age: 41}, {id: 'qeoird', name: 'Marek', age: 39}];
  
  render() {

    let toggleButtonText = 'Pokaż ziomków';
    let toggleButtonCssClasses = '';

    let multiplePersons = null;
    let styleClasses = [];

    if(this.state.persons.length <= 2) {
      this.addStyleToClass(styleClasses,moduleClasses.red);
    }
    else 
      this.removeStyleFromClass(styleClasses,moduleClasses.red);

    if(this.state.persons.length <= 1)
      this.addStyleToClass(styleClasses,moduleClasses.bold);
    else 
      this.removeStyleFromClass(styleClasses,moduleClasses.bold);


    if (this.state.personState !== 'hiddenPersons') {
      multiplePersons = (
        <div className={styleClasses.join(' ')}>
        <h1>"map" function test with sorting</h1>
        <Persons modifyName={this.nameChangedHandler} click={this.deletePerson} arr={this.state.persons.sort(this.sortByAge)}></Persons>
        <hr></hr>
        <h1>"find" function test, condition: "element.age > 25"</h1>
        <Persons modifyName={this.nameChangedHandler} click={this.deletePerson} arr={[this.state.persons.find(element => element.age > 25)]}></Persons>
        <hr></hr>
        <h1>"filter" function test, condition: element.age > 25</h1>
        <Persons modifyName={this.nameChangedHandler} click={this.deletePerson} arr={this.state.persons.filter(element => element.age > 25)}></Persons>
        <hr></hr>
      </div>
      );
      toggleButtonText = 'Ukryj ziomków';
      if (this.state.personState === 'mannyPersons') {
        toggleButtonCssClasses = moduleClasses.Red;
      } else if (this.state.personState === 'lessThan3Persons') {
        toggleButtonCssClasses = moduleClasses.Yellow;
      } else {
        console.error("Error: App.js:render():unknown this.state.personState="+this.state.personState);
      }
    }

    return (
        <div className={moduleClasses.App}>
          <button className={toggleButtonCssClasses} onClick={this.togglePersonsHandler}>{toggleButtonText}</button>
          {multiplePersons}
        </div>
    );
  }
}
export default App;
