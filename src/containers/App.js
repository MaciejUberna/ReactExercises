import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';


class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps',props);
    return state;
  }

  // Will be removed.
  // componentWillMount() {
  //   console.log('[App.js] componentWillMount')
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps,nextState) {
    console.log('[App.js] shouldComponentUpdate');
    // Updates if returns true does not if returns false
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }



  state = {
    persons: [
      {id: 'sfsdfgw', name: 'Maciek', age: 27},
      {id: '123sfdf', name: 'Max', age: 39, children: 'Rajdy'},
      {id: 'spuydse', name: 'Stefania', age: 25},
      {id: 'grspq40', name: 'Manu', age: 43, children: 'Gry planszowe'}
    ],
    personStateOptions: ['hiddenPersons','mannyPersons','lessThan3Persons'],
    personState: 'hiddenPersons',
    debugModeOptions: ['normal', 'verbose'],
    debugMode: 'verbose',
    showCockpit: true
  }

  sortByAge = (a,b) => {
    return a.age - b.age;
  }

  sortById = (a,b) => {
    return a.id - b.id;
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
    const copiedArrayReferencesOfPersons = [...this.state.persons];
    const personIndex = copiedArrayReferencesOfPersons.findIndex(e => e.id === id);
    if (personIndex === -1) {
      if(this.state.debugMode === 'verbose')
        console.warn('Warning: App.js:nameChangeHandler:personIndex===-1,id='+id);
    } else {
      const copiedPerson = {...this.state.persons[personIndex]};
      //const copiedPerson = Object.assign({},this.state.persons[personIndex]);
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
    console.log('[App.js] render');
    const multiplePersons = (
      <div>
        <h2>"map" function test with sorting</h2>
        <Persons modifyName={this.nameChangedHandler} click={this.deletePerson} arr={this.state.persons.sort(this.sortByAge)}></Persons>
        <hr></hr>
        <h2>"find" function test, condition: "element.age > 25"</h2>
        <Persons modifyName={this.nameChangedHandler} click={this.deletePerson} arr={[this.state.persons.find(element => element.age > 25)]}></Persons>
        <hr></hr>
        <h2>"filter" function test, condition: element.age > 25</h2>
        <Persons modifyName={this.nameChangedHandler} click={this.deletePerson} arr={this.state.persons.filter(element => element.age > 25)}></Persons>
        <hr></hr>
      </div>);

    return (
          <div>
            <button onClick={
              () => {this.setState({showCockpit: false})}
            }>
              Remove cockpit
            </button>
            {this.state.showCockpit ? <Cockpit 
              title={this.props.appTitle}
              personsLength={this.state.persons.length} 
              personState={this.state.personState}
              click={this.togglePersonsHandler}
            >
              {/* {multiplePersons} */}
            </Cockpit> : null }
            {this.state.personState !== 'hiddenPersons' ? [multiplePersons] : null}     
          </div>
    );
  }
}
export default App;
