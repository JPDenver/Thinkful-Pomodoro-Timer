import React from 'react';

function WhenPaused({isTimerRunning}){
    if(isTimerRunning){
        return null;
    }else{
        return(
        <div className="row mb-2 d-block" id="paused">
            <div>
                <h3>PAUSED</h3>
            </div>
        </div>)
        
    }
}

export default WhenPaused;