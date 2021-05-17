import React from 'react';
import { secondsToDuration } from '../utils/duration';

function TimeElapsed({focusOn, focusSeconds, breakSeconds}){
    if (focusOn){
        return secondsToDuration(focusSeconds);
    }else{
        return secondsToDuration(breakSeconds);
    }
}

export default TimeElapsed