import React from 'react';
import MainFocusTotals from './MainFocusTotals';
import TimeElapsed from './TimeElapsed'
import Audio from "./Audio";
import WhenPaused from "./WhenPaused"
import BlueBar from "./BlueBar"

function FocusInfo({
    focusOn,
    focusDuration,
    breakDuration,
    focusSeconds,
    breakSeconds,
    isTimerRunning,
    barWidth,
    ariaValue,

}){


    function showFocusInfo(){
        const sessionInfo = document.querySelector("#sessionInfo");
        sessionInfo.classList.add("d-block");
        sessionInfo.classList.remove("d-none");
        const progressBar = document.querySelector(".progress");
        progressBar.classList.add("flex");
        progressBar.classList.remove("d-none");
    }

    if (isTimerRunning){
        showFocusInfo();
    }



    return (
    <div>
      {/* TODO: This area should show only when a focus or break session is running or pauses */}
      <div className="col">
        {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
        <h2 data-testid="session-title">
          <MainFocusTotals
            focusOn={focusOn}
            focusDuration={focusDuration}
            breakDuration={breakDuration}
          />
        </h2>
        {/* TODO: Update message below to include time remaining in the current session */}
        <p className="lead" data-testid="session-sub-title">
          <TimeElapsed
            focusOn={focusOn}
            focusSeconds={focusSeconds}
            breakSeconds={breakSeconds}
          />{" "}
          remaining
        </p>
        <Audio />
        <WhenPaused isTimerRunning={isTimerRunning} />
      </div>
      <BlueBar barWidth={barWidth} ariaValue={ariaValue} />
    </div>
    )
}

export default FocusInfo;

