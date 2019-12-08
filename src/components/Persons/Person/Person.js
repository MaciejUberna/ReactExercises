import React from 'react';
import classes from './Person.module.css'

const Person = (props) => {
    let person = [];
    person.push(<p key={props.id.concat('1')}> Nazywam się {props.name} i mam {props.age} lat.</p>);
    if ( props.children ) {
        person.push(<p key={props.id.concat('2')}>A moje hobby to: {props.children} </p>);
    }
    person.push(<input key={props.id.concat('3')} type="text" onChange={props.modifyName} value={props.name}/>)
    return (
        <div className={classes.Person} onClick={props.click}>
            {person}
        </div>
    );
}

export default Person;