"use client";

import React, { useEffect, useState } from 'react';

const DayProgress = () => {
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('');
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

            const totalSeconds = (endOfDay.getTime() - startOfDay.getTime()) / 1000;
            const secondsPassed = (now.getTime() - startOfDay.getTime()) / 1000;

            const percentage = (secondsPassed / totalSeconds) * 100;
            setProgress(percentage);

            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

            const secondsLeft = totalSeconds - secondsPassed;
            const hoursLeft = Math.floor(secondsLeft / 3600);
            const minutesLeft = Math.floor((secondsLeft % 3600) / 60);
            setTimeLeft(`${hoursLeft}h ${minutesLeft}m left`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">Day Progress</h2>
            <div className="flex justify-between items-end mb-2">
                <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">{currentTime}</span>
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{timeLeft}</span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-4 overflow-hidden">
                <div
                    className="bg-orange-500 h-4 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-zinc-400">
                <span>00:00</span>
                <span>{Math.round(progress)}%</span>
                <span>23:59</span>
            </div>
        </div>
    );
};

export default DayProgress;
