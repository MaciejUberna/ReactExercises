import React, { useEffect, useRef } from 'react';
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
    const toggleBtnRef = useRef(null);
//  toggleBtnRef.current.click(); -- in here reference to the btn is not added yet so dont use it here
    //Runs for every update
    //Combines componentDidMount and componentDidUpdate
    useEffect(() => {
        console.log('[Cockpit.js] First useEffect');
        //Http request...
        // const timer = setTimeout(()=>{
        //     alert('Saved data to cloud.')
        // },1000)
        toggleBtnRef.current.click();
        //It runs BEFORE the main useEffect function runs, but After the (first) render cycle.
        return () => {
            //clearTimeout(timer);
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
        //content = props.children
        if (props.personState === 'mannyPersons') {
          toggleButtonCssClasses = moduleClasses.Red;
        } else if (props.personState === 'lessThan3Persons') {
          toggleButtonCssClasses = moduleClasses.Yellow;
        } else {
          console.error("Error: src/components/Cockpit/Cockpit.js:unknown props.personState=",props.personState);
        }
    }

    if(props.personsLength <= 2)
        addStyleToClass(personStyleClasses,moduleClasses.red);
    else 
        removeStyleFromClass(personStyleClasses,moduleClasses.red);
  
    if(props.personsLength <= 1)
        addStyleToClass(personStyleClasses,moduleClasses.bold);
    else 
        removeStyleFromClass(personStyleClasses,moduleClasses.bold);

    return (
        <div className={personStyleClasses.join(' ')}>
            <h1> {props.title} </h1>
            <button ref={toggleBtnRef} className={toggleButtonCssClasses} onClick={props.click}>{toggleButtonText}</button>
            <button onClick={props.login} >Log in</button>
            {content}
        </div>
    );
};

export default React.memo(Cockpit);