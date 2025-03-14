import React from 'react'
import '../Styles/group_tour.css'

export default function Group_Tour() {
  
  const tours = [
    { name: "Beach Adventure", total: 20, booked: 15 },
    { name: "Mountain Hike", total: 20, booked: 10 },
    { name: "City Tour", total: 20, booked: 20 },
    { name: "Jungle Safari", total: 20, booked: 5 },
  ];
  
  
  
  return (
    <div>
      <div className="tour-box">
      <h4>Group Tour Status</h4>
      <table>
        <thead>
          <tr>
            <th>Tour Name</th>
            <th>Booked</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour, index) => {
            const available = tour.total - tour.booked;
            return (
              <tr key={index}>
                <td>{tour.name}</td>
                <td className="booked">{tour.booked}</td>
                <td className={available === 0 ? "full" : "available"}>
                {available === 0 ? "Full" : available}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  )
}
