"use client";
import React, { useEffect, useState } from "react";
import CountdownTimer from "@/components/countdown";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import demoEvents from "@/data/events.json"; // ✅ import JSON

const Event = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter only future events
  useEffect(() => {
    const filteredEvents = demoEvents.filter(
      (event) => new Date(event.date) > new Date()
    );
    filteredEvents.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setUpcomingEvents(filteredEvents);
  }, []);

  const handlePrevEvent = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : upcomingEvents.length - 1
    );
  };

  const handleNextEvent = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < upcomingEvents.length - 1 ? prevIndex + 1 : 0
    );
  };

  if (upcomingEvents.length === 0)
    return <p>No upcoming events at the moment.</p>;

  const currentEvent = upcomingEvents[currentIndex];

  return (
    <div className="my-10 mx-4 sm:mx-auto border rounded-lg bg-white shadow-lg md:container xl:w-2/3">
      <div className="flex flex-col md:flex-row justify-between">
        {/* Image Section */}
        <div className="flex items-center justify-center w-full md:w-auto px-4">
          <Image
            src={currentEvent.image || "/assets/default.jpg"}
            alt={currentEvent.title}
            width={350}
            height={350}
            className="w-full md:w-80 h-auto object-cover rounded-lg"
          />
        </div>

        {/* Event Information */}
        <div className="flex flex-col w-full px-4 py-4">
          <CountdownTimer targetDate={currentEvent.date} />

          {/* Event Title and Description */}
          <div className="pt-4 border-b pb-3 border-gray-400">
            <h3 className="text-lg sm:text-xl font-bold">
              {currentEvent.title}
            </h3>
            <p className="py-2 text-sm sm:text-base text-gray-700">
              {currentEvent.description}
            </p>

            {/* Date and Location */}
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="p-2 sm:p-3 text-white bg-primary rounded-md">
                <span className="font-semibold text-sm sm:text-base">
                  {new Date(currentEvent.date).toLocaleDateString()}
                </span>
              </div>
              <div className="p-2 sm:p-3 text-white bg-primary rounded-md flex items-center space-x-2">
                <IoLocationSharp />
                <span className="font-semibold text-sm sm:text-base">
                  {currentEvent.location}
                </span>
              </div>
            </div>
          </div>

          {/* Join Button */}
          <div className="flex items-center mt-4">
            <Link
              href='/'
              className="text-primary font-bold rounded-md sm:text-base"
            >
              Join With Us
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end space-x-3 m-4">
        <button
          onClick={handlePrevEvent}
          className="p-2 border border-secondary rounded-lg"
        >
          <IoIosArrowBack className="text-secondary" size={20} />
        </button>
        <button
          onClick={handleNextEvent}
          className="p-2 border border-secondary rounded-lg"
        >
          <IoIosArrowForward className="text-secondary" size={20} />
        </button>
      </div>
    </div>
  );
};

export default Event;
