import React from 'react';
import Person from './Person/Person';

const Persons = (props) =>  (
    props.arr.map((value) => {
        if (value !== undefined) {
            return <Person click={props.click.bind(this,value.id)} key={value.id} id={value.id} name={value.name} age={value.age}>{value.children}</Person>;
        } else return null;
    })
);

export default Persons;