const CustomerDetailsModal = ({ setOpen }) => {
    return (
      <div className="fixed inset-0 flex justify-center bg-[#ffffffd2] items-center">
        <div className="bg-white p-5 rounded-lg shadow-lg max-w-[1200px]">
          <h2 className="text-md font-bold pb-2">Customer Details</h2>  
          <div>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="p-2 pr-30">Name</td>
                  <td className="p-2">John Simons</td>
                </tr> 
                <tr className="border-t border-gray-300">
                  <td className="p-2 w-[40%]">Telephone No</td>
                  <td className="p-2">+94717878789</td>
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="p-2">Email</td>
                  <td className="p-2">johnsimons@gmail.com</td>
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="p-2">Lead</td>
                  <td className="p-2">Fb</td>
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="p-2">Subject</td>
                  <td className="p-2">N/A</td> 
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="p-2">Country</td>
                  <td className="p-2">Malaysia</td> 
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="p-2">Main Cities</td>
                  <td className="p-2">c1, c2, c3</td> 
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="pl-2 pt-2">Number of:</td>
                </tr>
                <tr>
                  <td className="p-1 pl-10">Adults</td>
                  <td className="pl-2">4</td>
                </tr>
                <tr>
                  <td className=" pl-10">
                    <div className="border-b border-t border-gray-300">Child</div>
                  </td>
                  <td className="pr-40">
                    <div className="border-b border-t border-gray-300 indent-2">2</div>
                  </td>
                </tr>
                <tr>
                  <td className="p-1 pb-2 pl-10">Infant</td>
                  <td className="pl-2">2</td>
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="p-2">No of Days</td>
                  <td className="p-2">8</td> 
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="p-2">Starting Day</td>
                  <td className="p-2">3/04/2025</td> 
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="p-2">Additional Details</td>
                  <td className="p-2">ID</td> 
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-10 pt-2">
            <button
              className="bg-[#2fa4c2] text-white px-2.5 py-1.5 rounded cursor-pointer hover:bg-black"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CustomerDetailsModal;  