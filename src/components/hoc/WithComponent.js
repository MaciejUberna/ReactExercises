import React from 'react';

const withComponent = props => (

    <div className={props.classes}>

    {props.children}

    </div>

);

export default withComponent;