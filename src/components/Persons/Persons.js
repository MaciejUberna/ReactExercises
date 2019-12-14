import React, {Component} from 'react';
import Person from './Person/Person';

class Persons extends Component {
    render () {
    console.log('[Persons.js] rendering...');
    return (this.props.arr.map(person => {
        if (person !== undefined) {
            return <Person click={this.props.click.bind(this,person.id)} modifyName={this.props.modifyName.bind(this, person.id)} key={person.id} id={person.id} name={person.name} age={person.age}>{person.children}</Person>;
        } else return null;
    }));
    }
}

export default Persons;