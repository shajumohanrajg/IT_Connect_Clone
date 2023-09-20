import { useEffect, useState } from 'react';

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    const hour = time.getHours() % 12 || 12;
    const minute = time.getMinutes();
    const second = time.getSeconds();
    const ampm = time.getHours() >= 12 ? 'PM' : 'AM';

    return (
        <div>
            <h1>Current Time:</h1>
            <h2>
                {hour}:{minute < 10 ? `0${minute}` : minute}:{second < 10 ? `0${second}` : second} {ampm}
            </h2>
        </div>
    );
}

export default Clock;
