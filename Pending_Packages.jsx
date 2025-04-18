import React, { useState } from 'react'
import canadaImg from '../assets/Canada.jpg'
import thaImg from '../assets/Thailand.jpg'

export default function Pending_Packages() {

    const des =  "Tour Package - 7 Nights/8 Days \nType:Group tour \nTravel theme: Cultural,Educational,Learning";
    const des2 = "Tour Package - 5 Nights/4 Days \nType:Group tour \nTravel theme: Cultural,Educational";

    const packages = [
        {Image: canadaImg , Discription:des, Status: "Full" ,Topic: "Canada Tour",Price:"1700$"},
        {Image: thaImg , Discription:des2, Status: "Available", Topic: "Thiland Tour",Price:"1500$"}
    ];
    const [showPopup, setShowPopup] = useState(false);
    
      return (
        <div className="float-right p-[200px] ">
          <h3 className='text-center text-[30px] p-4'>Pending Packages</h3>
          {packages.map((e)=>(
            <div className="flex p-2  h-[200px]" key = {e}>

            <div className="float-left w-[300px]">
                <img src={e.Image} alt="Canada" className="w-full h-full object-cover" />
            </div>

            <div className="float-right w-[500px] p-3 pb-0 pt-0">
                <div className="flex flex-col">
                
                        <div className=" p-1 h-[60%]">
                          <h4 className='text-[20px] font-bold' >{e.Topic}</h4>
                          <p className="whitespace-pre-line pt-2">
                            {e.Discription}
                          </p>
                        </div>

                        <div className='bg-blue-100 h-[70px]'>

                          <div className='float-right pt-5 pr-7'><button onClick={() => setShowPopup(true) } className="rounded w-[100px] h-[40px] text-[18px] bg-green-400">Review</button></div>
                            {showPopup && (
                              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                                  <h2 className="text-xl font-bold mb-4">{e.Topic}</h2>
                                  <p>{e.Discription}</p>
                                  <p>Seats Available : {e.Status}</p>
                                  <p>Price per person : {e.Price}</p>
                                  <p>Other : </p>
                                  <div>
                                  <button
                                    onClick={() => setShowPopup(false)}
                                    className="mt-4 bg-red-500 text-white px-5 py-2 rounded float-left pl-20 "
                                  >
                                    Close
                                  </button>
                                  <button
                                    onClick={() => setShowPopup(false)}
                                    className="mt-4 bg-green-500 text-white px-5 py-2 rounded float-right pr-20"
                                  >
                                    Register
                                  </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          
                          <div className='float-left p-5'>{e.Price} - per person</div>
                        </div>
                        </div>

                </div>
                </div>
          
          ))}

        </div>
  )
}

