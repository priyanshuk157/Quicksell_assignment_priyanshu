import React from 'react';
import './Nav.css'
import Dropdown from './DropDown'

function Nav({ grouping, setGrouping, ordering, setOrdering }) {

    return (
        <header>
            <Dropdown grouping={grouping} setGrouping={setGrouping} ordering={ordering} setOrdering={setOrdering} />
        </header>
    );
}

export default Nav;
