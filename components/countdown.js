import { useEffect, useState, useCallback } from "react";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    let timeLeft;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hr: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        Min: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        Sec: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else {
      timeLeft = { days: 0, Hr: 0, Min: 0, Sec: 0 };
    }

    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div>
      <div className="flex space-x-4 w-80 m-auto p-2">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit}>
            <div className="text-sm text-center">
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </div>
            <div className="text-xl flex items-center p-2 bg-secondary rounded-lg">
              {String(value).padStart(2, "0")}
            </div>
          </div>
        ))}
        <div className="flex items-end font-bold">Remaining</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
