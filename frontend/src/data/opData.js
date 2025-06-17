const data = {
  reference: "000172 urgent",
  client: {
    name: "Mahima Devmi",
    adults: 4,
    dates: "11th Jan - 15th Jan",
    destination: "Bangkok",
    additional_trip: {
      destination: "Dubai",
      dates: "April 15-20th",
      adults: 4,
    },
  },
  flight_details: [
    {
      flight: "FZ580",
      departure: {
        date: "Tue 15 Apr",
        time: "09:10",
        from: "Bandaranaike Intl Arpt (CMB)",
        to: "Dubai Intl Arpt (DXB)",
      },
      arrival: {
        time: "12:30",
      },
    },
    {
      flight: "FZ569",
      departure: {
        date: "Sat 19 Apr",
        time: "18:55",
        from: "Dubai Intl Arpt (DXB)",
        to: "Bandaranaike Intl Arpt (CMB)",
      },
      arrival: {
        time: "01:05",
      },
    },
  ],
  hotel_details: {
    name: "City Avenue Hotel",
  },
  tour_itinerary: [
    "Day 01 - Arrival + Dhow Cruise Dinner – Creek",
    "Day 02 - Desert Safari with BBQ dinner",
    "Day 03 - Burj Khalifa Level 124 + Dubai Aquarium tickets",
    "Day 04 - Free Day",
    "Day 05 - Departure",
  ],
  package_included: [
    "Economy class return Air Ticket (FLY DUBAI) + 30 kg + 07 kg Baggage",
    "04 Nights hotel in Dubai including breakfast",
    "Dubai return airport transfer on PVT Basis",
    "Dhow Cruise Dinner – Creek on SIC Basis",
    "Desert Safari with BBQ dinner on SIC Basis",
    "Burj Khalifa Level 124 + Dubai Aquarium tickets on SIC Basis",
    "All tours and transfers as mentioned above",
    "All taxes included except Tourism Dirham",
    "Dubai Visa",
  ],
};

export default data;
