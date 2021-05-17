import React from 'react';
import { minutesToDuration} from "../utils/duration";

function FocusButtons ({
    title,
    maxTime,
    minTime,
    value,
    diff,
    onChange,
    disabled,
    testId,
    testId2,
    testId3

}){
    return (
        <div>
        <span className="input-group-text" data-testid={testId}>
              {/* TODO: Update this text to display the current focus session duration */}
              {title}: {minutesToDuration(value)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                disabled={disabled || value === minTime}
                className="btn btn-secondary"
                id = "timerButton"
                data-testid={testId2}
                onClick = {()=>
                  onChange((currentValue)=>
                      currentValue - diff >= minTime ? currentValue - diff : currentValue
                  )
                }
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                disabled={disabled || value=== maxTime}
                className="btn btn-secondary"
                id = "timerButton"
                data-testid={testId3}
                //Add an onClick function, you can do more than one thing here, should be similiar to above
                onClick= {()=>
                  onChange((currentValue)=>
                    currentValue + diff <= maxTime ? currentValue + diff : currentValue
                  
                  )
                
                }
              >
                <span className="oi oi-plus" />
              </button>
            </div>
        </div>
    )
}

export default FocusButtons;