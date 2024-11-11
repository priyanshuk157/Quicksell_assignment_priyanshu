import React, { useMemo } from 'react';
import './DashBoard.css'
import CardsContainer from './CardsContainer';

function DashBoard({ gridData, grouping, userData }) {
    const keys = useMemo(() => Object.keys(gridData), [gridData]); // creates a map -> column name of gridData as key and the actual gridData as the value.

    return (
        <div className='grid'>
            {keys.map((k) => <CardsContainer key={k} tickets={gridData[k]} grouping={grouping} groupBy={k} userData={userData} />)}
        </div>
    );
}

export default DashBoard;
