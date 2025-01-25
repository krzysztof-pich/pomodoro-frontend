import {
    getWorkTimeInMinutes,
    getShortBreakTimeInMinutes,
    getLongBreakTimeInMinutes,
    getStageName
} from "./configuration";
import {getActivePomodoro} from "./actions";
import {triggerNotification} from "./notifications";

function getPomodoroTimeInSeconds(stage) {
    let time = 0;
    switch (stage) {
        case 'work':
            return getWorkTimeInMinutes() * 60;
        case 'long_break':
            return getLongBreakTimeInMinutes() * 60;
        case 'short_break':
            return getShortBreakTimeInMinutes() * 60;
        default:
            throw new Error('Stage is not know');
    }
}

function getLeftTimeInPomodoro(actions, pomodoroTimeSeconds) {
    const activePomodoro = getActivePomodoro(actions);

    if (activePomodoro) {
        pomodoroTimeSeconds -= activePomodoro.duration;
        pomodoroTimeSeconds = Math.round(pomodoroTimeSeconds);
    }
    return pomodoroTimeSeconds;
}

export function getTimeLeft(stage, actions) {
    let pomodoroTimeSeconds = getPomodoroTimeInSeconds(stage);
    pomodoroTimeSeconds = getLeftTimeInPomodoro(actions, pomodoroTimeSeconds);

    let sign = '';
    if (pomodoroTimeSeconds < 0) {
        sign = '-';
        pomodoroTimeSeconds = Math.abs(pomodoroTimeSeconds);
    }

    if (Math.floor(pomodoroTimeSeconds) === 0) {
        triggerNotification(getStageName(stage), 'Session finished');
    }

    const minutesLeft = Math.floor(pomodoroTimeSeconds / 60).toString();
    const secondsLeft = pomodoroTimeSeconds % 60 < 10 ? '0' + pomodoroTimeSeconds % 60 : pomodoroTimeSeconds % 60;
    return sign + minutesLeft + ':' + secondsLeft;
}

export function getProgressInPercentage(stage, actions) {
    const totalTime = getPomodoroTimeInSeconds(stage);
    const timeLeft = getLeftTimeInPomodoro(actions, totalTime);

    const progress = ((totalTime - timeLeft) / totalTime) * 100;


    // Ensure progress is between 0 and 100
    return Math.min(100, Math.max(0, Math.round(progress)));
}