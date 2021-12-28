import React, { useEffect, useState } from 'react';

function Timer({ taskName, isComplete, deadline }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(`${deadline}`) - +new Date();
    let timeLeft = {};

    if (difference > 0 && !isComplete) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [popup, setPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    if (
      timeLeft.seconds + timeLeft.days + timeLeft.hours + timeLeft.minutes ===
      0
    ) {
      if (popup) {
        alert(`"${taskName}" has expired!`);
        setPopup(!popup);
        return clearTimeout(timer);
      }
    }
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={Math.floor(Math.random() * 10000).toString()}>
        {timeLeft[interval]} {interval}{' '}
      </span>
    );
  });

  return (
    <span>{timerComponents.length ? timerComponents : <>Time's up!</>}</span>
  );
}

export default Timer;
