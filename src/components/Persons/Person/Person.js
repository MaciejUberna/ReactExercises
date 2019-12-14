import React, {Component} from 'react';
import classes from './Person.module.css'

class Person extends Component {
    render () {
        console.log('[Person.js] rendering...');
        let person = [];
        person.push(<p key={this.props.id.concat('1')}> Nazywam się {this.props.name} i mam {this.props.age} lat.</p>);
        if ( this.props.children ) {
            person.push(<p key={this.props.id.concat('2')}>A moje hobby to: {this.props.children} </p>);
        }
        person.push(<input key={this.props.id.concat('3')} type="text" onChange={this.props.modifyName} value={this.props.name}/>)
        return (
            <div className={classes.Person} onClick={this.props.click}>
                {person}
            </div>
        )
    }
}

export default Person;