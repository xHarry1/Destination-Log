const API_BASE_URL = import.meta.env.VITE_API_URL || "https://destination-log-backend.onrender.com"; 

export const createItinerary = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/info/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to create itinerary: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating itinerary:", error);
    return null;
  }
};

export const fetchItineraries = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/info/all`);

    if (!response.ok) {
      throw new Error("Failed to fetch itineraries");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching itineraries:", error);
    return [];
  }
};
