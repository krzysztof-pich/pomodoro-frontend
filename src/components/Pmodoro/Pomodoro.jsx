const Pomodoro = () => {
    return (
        <>
            <div id="timer-type">
                <button>Work</button>
                <button>Short break</button>
                <button>Long break</button>
            </div>
            <p>25:00</p>
            <div id="timer-operations">
                <button>start</button>
                <button>pause</button>
                <button>stop</button>
            </div>
        </>
    )
}

export default Pomodoro