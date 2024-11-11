import React, { useCallback, useEffect, useRef, useState } from 'react';
import './DropDown.css'
import down from './Assets/icons_FEtask/down.svg';
import display from './Assets/icons_FEtask/Display.svg';

function Dropdown({ grouping, setGrouping, ordering, setOrdering }) {
  const [visible, setVisible] = useState(false); // set to true if dropdown is to be shown else false.
  const componentRef = useRef(null); // refers to display-dropdown component so click locations can be known.

  const openDropdown = useCallback(() => { // called to open the dropdown.
    setVisible(true);
  }, [],);

  const handleClickOutside = useCallback((event) => { // checks if click is outside the dropdown(referenced component) and closes dropdown accordingly.
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setVisible(false);
    }
  }, []);
  
  // sets grouping according to value selected by user.
  const onGroupingChange = useCallback((e) => setGrouping(e.target.value), []);// eslint-disable-line react-hooks/exhaustive-deps
  // sets ordering according to value selected by user.
  const onOrderingChange = useCallback((e) => setOrdering(e.target.value), []);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return (
    <div className='display-dropdown' ref={componentRef}>
      <div className='dropdown-label-container' onClick={openDropdown}>
      <img src={display} alt="dislpay" />
        <div className='dropdown-label'>Display</div>
        <img src={down} alt="down-arrow" />
      </div>
      <div className={`dropdown-content-container ${visible && "visible"}`}>
        <div className='dropdown-content-row'>
          <div className='dropdown-content-label'>Grouping</div>
          <select name="grouping" id="grouping" value={grouping} onChange={onGroupingChange}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className='dropdown-content-row'>
          <div className='dropdown-content-label'>Ordering</div>
          <select name="ordering" id="ordering" value={ordering} onChange={onOrderingChange}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
