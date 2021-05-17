import React from 'react';

function BlueBar({barWidth,ariaValue}){
    return (
        <div className="row mb-2">
            <div className="col">
                <div className = "progress d-none">
                    <div
                    
                    className = "progress-bar"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={ariaValue}
                    style={{width:`${barWidth}%`}}
                    />

                
                </div>
            </div>
        </div>
    )
}

export default BlueBar;