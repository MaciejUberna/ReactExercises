import React from 'react';
import './Person.css'

const Person = (props) => {
    //style mediaquery for radium
    const style = {
        '@media (min-width: 500px)': {
            width: '450px'
        }
    }
    let person = [];
    person.push(<p key={props.id.concat('1')}> Nazywam się {props.name} i mam {props.age} lat.</p>);
    if ( props.children ) {
        person.push(<p key={props.id.concat('2')}>A moje hobby to: {props.children} </p>);
    }
    person.push(<input key={props.id.concat('3')} type="text" onChange={props.modifyName} value={props.name}/>)
    return (
        <div className="Person" style={style} onClick={props.click}>
            {person}
        </div>
    );
}

export default Person;