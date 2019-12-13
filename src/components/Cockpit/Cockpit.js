import React from 'react';
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

const cockpit = (props) => {

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
          console.error("Error: src/components/Cockpit/Cockpit.js:unknown props.personState="+props.personState);
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
            <h1> Kokpit </h1>
            <button className={toggleButtonCssClasses} onClick={props.click}>{toggleButtonText}</button>
            {content}
        </div>
    );
};

export default cockpit;