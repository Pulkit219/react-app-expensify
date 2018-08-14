import React from 'react';
import {NavLink} from 'react-router-dom';

    const Header=()=>
    (
       <div>
        <h1>ExpenseCalc</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
        <NavLink to="/create" activeClassName="is-active">Add</NavLink>
        <NavLink to="/help" activeClassName="is-active">Help</NavLink>
       </div>
    )


    export default Header;