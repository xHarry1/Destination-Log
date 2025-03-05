import React from "react";
import { useState } from "react";
import axios from "axios";

const CreateEntry = () => {
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [itinerary, setItinerary] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post("http://localhost:5000/info/create", {
                destination,
                startDate,
                endDate,
                activities: []
            });
            setItinerary(response.data);
        } catch (err) {
            setError("Failed to create itinerary. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(to right, #009FFD, #2A2A72)", height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="w-full max-w-2xl bg-opacity-90 bg-gray-900 text-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center mb-6">Plan a New Trip</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold">Destination</label>
                        <input
                            type="text"
                            placeholder="Enter a city (e.g., Los Angeles)"
                            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Start Date</label>
                        <input
                            type="date"
                            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">End Date</label>
                        <input
                            type="date"
                            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded text-white font-bold text-lg">
                        Start Planning
                    </button>
                </form>
                {error && <p className="mt-4 text-red-400 text-center">{error}</p>}
                {itinerary && (
                    <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                        <h2 className="text-xl font-bold">Trip Details</h2>
                        <p><strong>Destination:</strong> {itinerary.destination}</p>
                        <p><strong>Start Date:</strong> {new Date(itinerary.startDate).toDateString()}</p>
                        <p><strong>End Date:</strong> {new Date(itinerary.endDate).toDateString()}</p>
                        <h3 className="font-bold mt-3">Attractions:</h3>
                        {itinerary.activities.length > 0 ? (
                            <ul className="list-disc pl-6">
                                {itinerary.activities.map((activity, index) => (
                                    <li key={index} className="mt-2">
                                        <strong>{activity.name}</strong> - {activity.location}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No attractions found.</p>
                        )}
                        <h3 className="font-bold mt-3">Weather:</h3>
                        <p><strong>Temperature:</strong> {itinerary.weather.temperature}°C</p>
                        <p><strong>Description:</strong> {itinerary.weather.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateEntry;
