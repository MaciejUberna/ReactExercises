import React from 'react';
import Person from './Person/Person';

const Persons = (props) =>  (
    props.arr.map((value) => {
        return <Person key={value.id} id={value.id} name={value.name} age={value.age}>{value.children}</Person>;
    })
);

export default Persons;