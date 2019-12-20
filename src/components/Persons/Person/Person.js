import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classes from './Person.module.css'
import Auxiliary from "../../hoc/Auxliary";
import withClass from '../../hoc/withClass';

class Person extends Component {

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    componentDidMount() {
        //query selector is a general browser feature
        //document.querySelector('input').focus();

        //this.inputElement.focus();

        //this.inputElementRef.current.focus();

        if(this.props.focus) this.inputElementRef.current.focus();
    }

    render () {
        console.log('[Person.js] rendering...');
        let person = [];
        person.push(<p key={this.props.id.concat('1')}> Nazywam się {this.props.name} i mam {this.props.age} lat.</p>);
        if ( this.props.children ) {
            person.push(<p key={this.props.id.concat('2')}>A moje hobby to: {this.props.children} </p>);
        }
        person.push(<input key={this.props.id.concat('3')} 
        /*ref={(inputEl) => {this.inputElement = inputEl}}*/ 
        ref={this.inputElementRef}
        type="text" 
        onChange={this.props.modifyName} 
        value={this.props.name}/>);
        console.log(this.props.focus);
        
        return (
            <div onClick={this.props.click}>
                <Auxiliary key={this.props.id.concat('11')}>{person}</Auxiliary>
            </div>
        )
    }

    getSnapshotBeforeUpdate() {
        return {message: 'Snapshot: Person.js!'};
    }

    componentDidUpdate() {
        console.log('[Person.js] componentDidUpdate')
    }
}
//propTypes are special property that you add to any javascript object 
Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    focus: PropTypes.bool,
    changed: PropTypes.func
};

export default withClass(Person,classes.Person);