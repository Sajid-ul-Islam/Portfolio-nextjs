import React from 'react';
import DayProgress from '../components/time-tracker/DayProgress';
import FocusTasks from '../components/time-tracker/FocusTasks';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function TimeTrackerPage() {
    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
            <NavBar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500 inline-block mb-2">
                        Time Tracker
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Maximize your productivity by tracking your day and managing focus tasks.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Progress */}
                    <div className="lg:col-span-1 space-y-6">
                        <DayProgress />

                        {/* Summary Widget or Quote could go here */}
                        <div className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-2xl">
                            <h3 className="font-bold text-orange-600 dark:text-orange-400 mb-2">Tip of the day</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300 italic">
                                &quot;Productivity is being able to do things that you were never able to do before.&quot;
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Tasks */}
                    <div className="lg:col-span-2 h-[600px]">
                        <FocusTasks />
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
