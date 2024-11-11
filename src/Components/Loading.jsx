import React from 'react';
import './Loading.css'

function Loading({ fullscreen = true }) {
    return (
        <div className={`loader-container ${fullscreen && "fullscreen"}`}>
            <span className='loader'>Loading...</span>
        </div>
    );
}

export default Loading;