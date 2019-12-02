import React from 'react';
import Person from './Person/Person';

const Persons = (props) =>  (
    props.arr.map((person) => {
        if (person !== undefined) {
            return <Person click={props.click.bind(this,person.id)} modifyName={props.modifyName.bind(this, person.id)} key={person.id} id={person.id} name={person.name} age={person.age}>{person.children}</Person>;
        } else return null;
    })
);

export default Persons;