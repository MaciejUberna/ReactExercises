//www.styled-components.com: npm install --save styled-components got rid of radium
import styled from 'styled-components';
import React from 'react';
//import './Person.css'

const StyledDiv = styled.div`    
        width: 80%;
        margin: 3rem auto;
        border: 1px solid #eee;
        box-shadow: 0 2 3 #000;
        padding: 16px;
        text-align: center;

        @media (min-width: 500px) {
            width: 250px;
        }

`;

const Person = (props) => {
    let person = [];
    //radium style
    // const style = {
    //     '@media (min-width: 500px)': {
    //         width: '450px'
    //     }
    // }
    person.push(<p key={props.id.concat('1')}> Nazywam się {props.name} i mam {props.age} lat.</p>);
    if ( props.children ) {
        person.push(<p key={props.id.concat('2')}>A moje hobby to: {props.children} </p>);
    }
    person.push(<input key={props.id.concat('3')} type="text" onChange={props.modifyName} value={props.name}/>)
    return (
        //radium div
        // <div className="Person" style={style} onClick={props.click}>
        <StyledDiv>
            {person}
        </StyledDiv>
        // </div>
    );
}

export default Person;