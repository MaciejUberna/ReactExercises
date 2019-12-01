import React from 'react';

const Person = (props) => {

    let person = [];
    person.push(<p key={props.id.concat('1')}> Nazywam się {props.name} i mam {props.age} lat.</p>);
    if ( props.children ) {
        person.push(<p key={props.id.concat('2')}>A moje hobby to: {props.children} </p>);
    }
    person.push(<input key={props.id.concat('3')} type="text"/>)
    return (
        <div onClick={props.click}>
            {person}
        </div>
    );
}

export default Person;