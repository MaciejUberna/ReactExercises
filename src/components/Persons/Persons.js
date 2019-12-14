import React, {Component} from 'react';
import Person from './Person/Person';

class Persons extends Component {
    //Warning because we do not do anything with state
    // static getDerivedStateFromProps(props,state) {
    //     console.log('[Persons.js] getDerivedStateFromProps props:',props);
    //     return state;
    // }

    //doing nothing is not an option. This have to return true or false
    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons.js] shouldComponentUpdate');
        return true;
    }

    getSnapshotBeforeUpadte(prevProps,precState){
        console.log('[Persons.js getSnapshotBeforeUpadte')
    }

    render () {
    console.log('[Persons.js] rendering...');
    return (this.props.arr.map(person => {
        if (person !== undefined) {
            return <Person click={this.props.click.bind(this,person.id)} modifyName={this.props.modifyName.bind(this, person.id)} key={person.id} id={person.id} name={person.name} age={person.age}>{person.children}</Person>;
        } else return null;
    }));
    }

    componentDidUpdate() {
        console.log('[Persons.js] componentDidUpdate')
    }
}

export default Persons;