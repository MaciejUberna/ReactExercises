import React, {Component} from 'react';
import Person from './Person/Person';

class Persons extends Component {
    //Warning because we do not do anything with state
    // static getDerivedStateFromProps(props,state) {
    //     console.log('[Persons.js] getDerivedStateFromProps props:',props);
    //     return state;
    // }

    //Depricated
    // componentWillReceiveProps(props) {
    //     console.log('[Persons.js] componentWillReceiveProps',props);
    // }

    // componentWillUpdate - depricated

    //doing nothing is not an option. This have to return true or false
    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons.js] shouldComponentUpdate');
        return true;
    }

    getSnapshotBeforeUpdate(prevProps,precState){
        console.log('[Persons.js getSnapshotBeforeUpdate');
        return { message: 'Snapshot!' };
    }

    render () {
    console.log('[Persons.js] rendering...');
    return (this.props.arr.map(person => {
        if (person !== undefined) {
            return <Person click={this.props.click.bind(this,person.id)} modifyName={this.props.modifyName.bind(this, person.id)} key={person.id} id={person.id} name={person.name} age={person.age}>{person.children}</Person>;
        } else return null;
    }));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate');
        console.log(snapshot);
    }
}

export default Persons;