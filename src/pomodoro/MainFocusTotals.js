import React from 'react';
import {minutesToDuration} from "../utils/duration";

function MainFocusTotals({focusOn,focusDuration,breakDuration}){
    if(focusOn){
        return `Focusing for ${minutesToDuration(focusDuration)} minutes`;
    }else{
        return `On Break for ${minutesToDuration(breakDuration)} minutes`;
    }
}

export default MainFocusTotals;