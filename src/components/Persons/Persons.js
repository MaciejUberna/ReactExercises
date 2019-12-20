import React, {PureComponent} from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
    //Warning because we do not do anything with state
    // static getDerivedStateFromProps(props,state) {
    //     console.log('[Persons.js] getDerivedStateFromProps props:',props);
    //     return state;
    // }

    //Depricated
    // componentWillReceiveProps(props) {
    //     console.log('[Persons.js] componentWillReceiveProps',props);
    // }

    // componentWillUpdate - depricated not recomended to use
    // componentWillUpdate() {

    // }

    //doing nothing is not an option. This have to return true or false
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[Persons.js] shouldComponentUpdate');
    //     //it updates everythink if true
    //     if(nextProps.arr !== this.props.arr ||
    //         nextProps.modifyName !== this.props.modifyName ||
    //         nextProps.click !== this.props.click){
    //         return true;
    //       } else {
    //         console.log('nextProps.arr:'+nextProps.arr+'this.props:'+this.props.arr);
    //         return false;
    //       }
    //     //return true;
    // }

    getSnapshotBeforeUpdate(prevProps,prevState){
        console.log('[Persons.js getSnapshotBeforeUpdate');
        return { message: 'Snapshot!' };
    }

    render () {
    console.log('[Persons.js] rendering...');
    return (this.props.arr.map(person => {
        if (person !== undefined) {
            return <Person isAuth={this.props.isAuthenticated} click={this.props.click.bind(this,person.id)} modifyName={this.props.modifyName.bind(this, person.id)} key={person.id} id={person.id} name={person.name} age={person.age} focus={person.focus}>{person.children}</Person>;
        } else return null;
    }));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate');
        console.log(snapshot);
    }

    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
        //Add any code that cleans the unmounted state
    }
}

export default Persons;