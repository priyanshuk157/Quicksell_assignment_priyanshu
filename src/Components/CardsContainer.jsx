import React, { useMemo } from 'react';
import CamCards from './CamCards';
import "./CardsContainer.css";
import add from './Assets/icons_FEtask/add.svg';
import menu from './Assets/icons_FEtask/3 dot menu.svg';
import { getPriorityIcon, getStatusIcon } from '../getIcons';
import UserIcon from './UserIcon';


function CardsContainer({ tickets, grouping, groupBy, userData }) {

    const title = useMemo(() => { // extract the title from given information.
        if (grouping === "status")
            return groupBy;
        if (grouping === "priority")
            return groupBy;
        if (grouping === "user")
            return userData[groupBy].name;
    }, [grouping, groupBy]);// eslint-disable-line react-hooks/exhaustive-deps

    const icon = useMemo(() => { // extract the icon from given information.
        if (grouping === "status")
            return getStatusIcon(groupBy);            
        if (grouping === "priority")
            return getPriorityIcon(groupBy);
        if (grouping === "user")
            return <UserIcon name={userData[groupBy].name} available={userData[groupBy].available} />
    }, [grouping, groupBy]);// eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className='column'>
            <div className='column-header'>
                <div className='column-header-left-container'>
                    {icon}
                    <div className='column-title'>
                        {title}
                        <span className='count'>{tickets.length}</span>
                    </div>
                </div>
                <div className='column-header-right-container'>
                    <img src={add} alt="addIcon" size = {12}/>
                    <img src={menu} alt="menuIcon" size = {14}/>
                </div>
            </div>
            <div className='cards-container'>
                {tickets.map((ticket) => <CamCards key={ticket.id} ticket={ticket} userData={userData[ticket.userId]} hideStatusIcon={grouping === "status"} hideProfileIcon={grouping === "user"} hidePriorityIcon={grouping === "priority"}/>)}
            </div>
        </div>
    );
}

export default CardsContainer;
