import React, { useEffect } from 'react';
import moduleClasses from './Cockpit.module.css'

const addStyleToClass = (classArray,newClassString) => {
    if(classArray.findIndex(e => e === newClassString)===-1)
      classArray.push(newClassString);
}

const removeStyleFromClass = (classArray,stringToRemove) => {
    const index = classArray.findIndex(e => e === stringToRemove);
    if(index !== -1)
      classArray.splice(index,1);
}

//Cockpit name MUST begin with capital letter so is in export default in order to use useEffect hook.
const Cockpit = (props) => {

    //Runs for every update
    //Combines componentDidMount and componentDidUpdate
    useEffect(() => {
        console.log('[Cockpit.js] First useEffect');
        //Http request...
        const timer = setTimeout(()=>{
            alert('Saved data to cloud.')
        },1000)
        //It runs BEFORE the main useEffect function runs, but After the (first) render cycle.
        return () => {
            clearTimeout(timer);
            console.log('[Cockpis.js] cleanup work in first useEffect!');
        };
    },[]); //[] when component is destroyed.
    // Clean up work will be executed when component is rendered and then unMounted because of [] param


    //It is handy whenever you have operation that should be canceled when re-rendered.
    useEffect( () => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {
            console.log('[Cockpis.js] cleanup work in 2nd useEffect!');
        };
    });

    let toggleButtonText = 'Pokaż ziomków';
    let toggleButtonCssClasses = '';
    let personStyleClasses = [moduleClasses.Cockpit];
    let content = null;

    if(props.personState !== 'hiddenPersons') {
        toggleButtonText = 'Ukryj ziomków';
        content = props.children
        if (props.personState === 'mannyPersons') {
          toggleButtonCssClasses = moduleClasses.Red;
        } else if (props.personState === 'lessThan3Persons') {
          toggleButtonCssClasses = moduleClasses.Yellow;
        } else {
          console.error("Error: src/components/Cockpit/Cockpit.js:unknown props.personState=",props.personState);
        }
    }

    if(props.persons.length <= 2)
        addStyleToClass(personStyleClasses,moduleClasses.red);
    else 
        removeStyleFromClass(personStyleClasses,moduleClasses.red);
  
    if(props.persons.length <= 1)
        addStyleToClass(personStyleClasses,moduleClasses.bold);
    else 
        removeStyleFromClass(personStyleClasses,moduleClasses.bold);

    return (
        <div className={personStyleClasses.join(' ')}>
            <h1> {props.title} </h1>
            <button className={toggleButtonCssClasses} onClick={props.click}>{toggleButtonText}</button>
            {content}
        </div>
    );
};

export default Cockpit;