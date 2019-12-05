//www.styled-components.com: npm install --save styled-components got rid of radium
import styled from 'styled-components';
//Radium: npm install --save radium
import React, { Component } from 'react';
//import Radium from 'radium';
import Persons from './Persons/Persons';

import './App.css';

const styledButtonBackgroundColor = ['green','red','gold'];
const styledButtonHoverColor = ['lightgreen','salmon','yellow']
const StyledButton = styled.button`
     background-color: ${p => (styledButtonBackgroundColor[p.personState]) };
     color: white;
     font: inherit;
     border: 1px solid blue;
     padding: 8px;
     cursor: pointer;
     &:hover {
      background-color: ${p => (styledButtonHoverColor[p.personState])};
      color: black;
     }
`;



class App extends Component {
  state = {
    persons: [
      {id: 'sfsdfgw', name: 'Maciek', age: 27},
      {id: '123sfdf', name: 'Max', age: 39, children: 'Rajdy'},
      {id: 'spuydse', name: 'Stefania', age: 25}
    ],
    personState: 0,
    debugModeOptions: 'normal verbose',
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
      this.setState({personState: 2});
    else
      this.setState({personState: 1});
  }

  togglePersonsHandler = () => {
    if (this.state.personState > 0)
      this.setState({personState: 0});
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
  //Radium: npm install --save radium
  //Upgrade npm: npm install -g npm
  
  render() {

    //redium styles
    // const toggleButtonStyle = {
    //   backgroundColor: 'green',
    //   color: 'white',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   ':hover': {
    //     backgroundColor: 'lightgreen',
    //     color: 'black'
    //   }
    // }

    let toggleButtonText = 'Pokaż ziomków';

    const displayArr = this.state.persons.concat(this.someOtherPersons);

    let multiplePersons = null;
    let styleClasses = [];

    if(this.state.persons.length <= 2) {
      this.addStyleToClass(styleClasses,'red');
    }
    else 
      this.removeStyleFromClass(styleClasses,'red');

    if(this.state.persons.length <= 1)
      this.addStyleToClass(styleClasses,'bold');
    else 
      this.removeStyleFromClass(styleClasses,'bold');


    if (this.state.personState > 0) {
      multiplePersons = (
        <div className={styleClasses.join(' ')}>
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


      // removed radium styles formatting
      // toggleButtonStyle.backgroundColor = 'red';
      // toggleButtonStyle.color = 'white';
      // toggleButtonStyle[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // };
      toggleButtonText = 'Ukryj ziomków';
    }

    return (
        <div className="App">
          <StyledButton personState={this.state.personState} onClick={this.togglePersonsHandler}>{toggleButtonText}</StyledButton>
          {multiplePersons}
        </div>
    );
  }
}

//export default Radium(App);
export default App;
