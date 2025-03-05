import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "10px"
};

const defaultCenter = {
    lat: 34.0522, 
    lng: -118.2437
};

const Home = () => {
    const [destination, setDestination] = useState("Los Angeles");
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const response = await axios.get("http://localhost:5000/info/all");
                if (response.data.length > 0) {
                    setDestination(response.data[0].destination);
                    const location = await getCoordinates(response.data[0].destination);
                    if (location) {
                        setMapCenter(location);
                    }
                }
            } catch (error) {
                console.error("Error fetching itineraries:", error);
            }
        };

        fetchItineraries();
    }, []);

    const getCoordinates = async (destination) => {
        try {
            const geoResponse = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json`,
                {
                    params: {
                        address: destination,
                        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                    }
                }
            );
            if (geoResponse.data.results.length > 0) {
                const { lat, lng } = geoResponse.data.results[0].geometry.location;
                return { lat, lng };
            }
        } catch (error) {
            console.error("Error getting coordinates:", error);
        }
        return null;
    };

    const handleStartPlanning = () => {
        navigate("/create"); 
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen px-4"
            style={{
                background: "linear-gradient(to right, #4A00E0, #8E2DE2)",
                height: "100vh",
                width: "100vw",
                margin: 0,
                overflow: "hidden"
            }}
        >
            <div className="text-center w-full max-w-3xl p-6 bg-gray-800 bg-opacity-90 text-white rounded-lg shadow-xl">
                <h1 className="text-4xl font-bold text-white mb-4">Destination Log</h1>
                <p className="text-lg text-gray-400 mb-6">
                    Explore the world! Start planning your next trip.
                </p>

                <button
                    onClick={handleStartPlanning} 
                    className="mb-6 px-8 py-3 bg-black text-white rounded-lg text-xl font-bold hover:bg-gray-800 transition"
                >
                    Start Planning
                </button>

                <div className="w-full bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-white mb-4">Your Destinations</h2>

                    {/* Google Map Section */}
                    <div className="mt-4">
                        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                            <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={12}>
                                <Marker position={mapCenter} />
                            </GoogleMap>
                        </LoadScript>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
