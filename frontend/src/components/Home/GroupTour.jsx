export default function Group_Tour() {
  const tours = [
    { name: "Beach Adventure", total: 20, booked: 15 },
    { name: "Mountain Hike", total: 20, booked: 10 },
    { name: "City Tour", total: 20, booked: 20 },
    { name: "Jungle Safari", total: 20, booked: 5 },
  ];

  return (
    <div className="p-4 rounded-lg shadow-lg flex-1 overflow-y-auto m-5 bg-slate-50">
      <h4 className="text-xl font-semibold  text-slate-600 m-2">Group Tour Status</h4>
      <table className="w-full border-collapse">
        <thead>
          <tr className="">
            <th className="text-left p-2 text-sm">Tour Name</th>
            <th className="text-left p-2 text-sm">Booked</th>
            <th className="text-left p-2 text-sm">Available</th> 
          </tr>
        </thead>
        <tbody>
          {tours.map((tour, index) => {
            const available = tour.total - tour.booked;
            return (
              <tr key={index} className=" hover:bg-gray-50 border-t border-gray-300 cursor-pointer ">
                <td className="p-2 text-sm">{tour.name}</td>
                <td className="p-2 text-sm font-bold text-red-600">{tour.booked}</td>
                <td className={`p-2 text-sm font-bold ${available === 0 ? "text-blue-700" : "text-green-600"}`}>
                  {available === 0 ? "Full" : available}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}