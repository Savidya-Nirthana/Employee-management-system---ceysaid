import { useState } from "react";
import CustomerDetailsModal from "./CustomerDetailsModal";

  const Progress = ({ refresh, setRefresh, showNav }) => {
  
    const [open, setOpen] = useState(false);
        return (
            <>
                <div className="">
                    <div className="flex items-center justify-center pt-2 space-x-2">
                        <input 
                            type="text" 
                            placeholder="Search by customer's name..." 
                            className="border rounded w-1/3 p-2 h-10"
                        />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded h-10">Search</button>
                    </div>
                    <table className="table-auto w-full">
                        <thead className="">
                            <tr>
                                <th className="px-4 py-3 text-center">Name</th>
                                <th className="px-4 py-3 text-center">Country</th>
                                <th className="px-4 py-3 text-center">No of Days</th>
                                <th className="px-4 py-3 text-center">Start Date</th>
                                <th className="px-4 py-3 text-center">Priority</th>
                                <th className="px-4 py-3 text-center">Active Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-50 border-t border-gray-300" onClick={() => {setOpen(!open)}}>
                                    <td className="px-4 py-3 text-center">John</td>
                                    <td className="px-4 py-3 text-center">Malaysia</td>
                                    <td className="px-4 py-3 text-center">5</td>
                                    <td className="px-4 py-3 text-center">30/03/2025</td>
                                    <td className="px-4 py-2 justify-items-center">
                                        <div className='w-[45%] text-center rounded-full bg-yellow-300 text-yellow-700 min-w-[60px]'>Medium</div>
                                    </td>
                                    <td className="px-4 py-3 justify-items-center">
                                        <div className='w-[30%] text-center rounded-full bg-purple-300 text-purple-700 min-w-[100px]'>Active</div>
                                    </td>
                            </tr>
                            <tr className="hover:bg-gray-50 border-t border-gray-300" onClick={() => {setOpen(!open)}}>
                                <td className="px-4 py-3 text-center">John</td>
                                <td className="px-4 py-3 text-center">Malaysia</td>
                                <td className="px-4 py-3 text-center">5</td>
                                <td className="px-4 py-3 text-center">30/03/2025</td>
                                <td className="px-4 py-2 justify-items-center">
                                    <div className='w-[45%] text-center rounded-full bg-green-300 text-green-700 min-w-[60px]'>Low</div>
                                </td>
                                <td className="px-4 py-2 justify-items-center">
                                    <div className='w-[30%] text-center rounded-full bg-orange-300 text-orange-700 min-w-[100px]'>Pending</div>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 border-t border-gray-300" onClick={() => {setOpen(!open)}}>
                                <td className="px-4 py-3 text-center">John</td>
                                <td className="px-4 py-3 text-center">Malaysia</td>
                                <td className="px-4 py-3 text-center">5</td>
                                <td className="px-4 py-3 text-center">30/03/2025</td>
                                <td className="px-4 py-2 justify-items-center">
                                    <div className='w-[45%] text-center rounded-full bg-red-300 text-red-700 min-w-[60px]'>High</div>
                                </td>
                                <td className="px-4 py-3 justify-items-center">
                                    <div className='w-[30%] text-center rounded-full bg-blue-300 text-blue-700 min-w-[100px]'>Complete</div>
                                </td>
                            </tr>
                        </tbody>    
                    </table>
                    {open && <CustomerDetailsModal setOpen={setOpen}/>}
                </div>
            </>
        );
  };
  
export default Progress
