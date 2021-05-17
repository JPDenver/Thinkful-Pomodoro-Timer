import React, { useEffect, useState } from "react";
import classNames from "../utils/class-names";
import { minutesToDuration, secondsToDuration } from "../utils/duration";
import useInterval from "../utils/useInterval";
import FocusButtons from "./FocusButtons"
import FocusInfo from "./FocusInfo"

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  //Set Focus Duration, still needs implementation of !<5 and !>60
  const [focusDuration,setFocusDuration] = useState(25);
  const [focusSeconds, setFocusSeconds] = useState(focusDuration *60)
  const [focusOn, setFocusOn] = useState(true);


  //Set Break Duration, !<1 !>15
  const [breakDuration, setBreakDuration] = useState(5)
  const [breakSeconds, setBreakSeconds] = useState(breakDuration*60)

  //Set Elapsed Time
  const [elapsedTime, setElapsedTime] = useState(0);


  //Blue Progress Bar
  let barWidth = 0;
  let ariaValue = 0;



  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      // console.log({elapsedTime})
      // setElapsedTime(elapsedTime + 1);
      timerRun();

    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
    if (focusSeconds === focusDuration *60 && isTimerRunning===false){
      setFocusSeconds(focusDuration *60);
    }
    if (breakSeconds===breakDuration * 60 && isTimerRunning===false){
      setBreakSeconds(breakDuration *60)
    } 
    if(isTimerRunning===true){
      console.log("paused");
      disableTimerBtns();
    }else if(isTimerRunning===false){
      console.log("timer is running")
      disableTimerBtns();
      enableStopButton();
    }
  }

  const timerRun = ()=>{
    runFocusSession();
    if(focusSeconds === 0 && breakSeconds === breakDuration * 60) playAudio();
    if(breakSeconds === 0 ) playAudio();

  }


  //ONSTOP
  const onStop = ()=>{
    console.log("stop");
    setIsTimerRunning(false);
    setFocusOn(true);
    setFocusSeconds(focusDuration*60)
    setBreakSeconds(breakDuration*60)
    disableStopButton();
    enableTimerButns();


    //SessionInfo
    
    const sessionInfo = document.querySelector("#sessionInfo");
    sessionInfo.classList.add("d-none");
    sessionInfo.classList.remove("d-block");
    const progressBar = document.querySelector(".progress");
    progressBar.classList.add("d-none");
    progressBar.classList.remove("flex");

  }

  function runFocusSession(){
    if(focusSeconds > 0){
      setFocusSeconds((count)=> count -1 )
    }else{
      setFocusOn(false);
      if (breakSeconds > 0){
        setBreakSeconds((count)=> count -1 )
      }else{
        console.log("Starting over");
        setFocusOn(true);
        setFocusSeconds(focusDuration *60 )
        setBreakSeconds(breakDuration * 60 )

      }
    }
    //Progress Bar
    if(focusOn){
      const focusTimeElapsed = focusDuration * 60 - focusSeconds;
      let focusBarPercent = (focusTimeElapsed/(focusDuration*60))*100;
      const bar = document.querySelector(".progress-bar");
      bar.style.width = `${focusBarPercent}%`;
      bar.setAttribute("aria-valuenow", focusBarPercent.toFixed(2));
    }else{
      const breakTimeElapsed = breakDuration * 60 - breakSeconds;
      let breakBarPercent = (breakTimeElapsed/(breakDuration*60))*100;
      const bar = document.querySelector(".progress-bar");
      bar.style.width = `${breakBarPercent}%`;
      bar.setAttribute("aria-valuenow", breakBarPercent.toFixed(2));
    }
  }





  //Helper Functions

  function enableStopButton(){
    const stopBtn = document.querySelector("#stopBtn");
    stopBtn.classList.remove("disabled");
  }
  function disableStopButton(){
    const stopBtn = document.querySelector("#stopBtn");
    stopBtn.classList.add("disabled");
    stopBtn.getAttribute("disabled",true);
  }

  function enableTimerButns(){
    const timerBtns = document.querySelectorAll("#timerButton");
    for (let btn of timerBtns){
      btn.removeAttribute("disabled");
    }
  }
  function disableTimerBtns(){
    const timerBtns = document.querySelectorAll("#timerButton");
    for (let btn of timerBtns) {
      btn.setAttribute("disabled", true)
    }
  }

  const audioElement = document.getElementsByClassName("audio")[0];

  function playAudio(){
    audioElement.play();
  }

  //Handler
  useEffect(()=>{
    if(!isTimerRunning){
      setFocusSeconds(focusDuration *60 )
      setBreakSeconds(breakDuration *60 )
    }
  },[focusDuration,breakDuration])

  

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <FocusButtons
            title="Focus Duration"
            maxTime = {60}
            minTime = {5}
            diff = {5}
            value ={focusDuration}
            onChange = {setFocusDuration}
            disabled = {isTimerRunning}
            testId="duration-focus"
            testId2="decrease-focus"
            testId3="increase-focus"
            />
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
            <FocusButtons
            title = "Break Duration"
            maxTime ={15}
            minTime = {1}
            diff = {1}
            value = {breakDuration}
            onChange = {setBreakDuration}
            disabled = {isTimerRunning}
            testId="duration-break"
            testId2="decrease-break"
            testId3="increase-break"

            />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary disabled"
              id = "stopBtn"
              title="Stop the session"
              onClick = {onStop}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2 d-none" id="sessionInfo">

        <FocusInfo
        focusOn={focusOn}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        focusSeconds={focusSeconds}
        breakSeconds={breakSeconds}
        isTimerRunning={isTimerRunning}
        barWidth={barWidth}
        ariaValue={ariaValue}
        
        />
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
