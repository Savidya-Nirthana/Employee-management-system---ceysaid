import {
  faCircleCheck,
  faFile,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const SalesSecondRes = ({ setSaleResponse, selectSale }) => {
  const [isIndividual, setIsIndividual] = useState(true);
  const [files, setFiles] = useState([]);
  const [numberOfPassengers, setNumberOfPassengers] = useState(1);
  // const handledFiles = (select) => {
  //   const fileArray = Array.from(select);
  //   setFiles((prev) => [...prev, ...fileArray]);
  // };

  // const hadleUpload = (e) => {
  //   handledFiles(e.target.files);
  // };

  // const handledDrop = (e) => {
  //   e.preventDefault();
  //   if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
  //     hadleUpload(e.dataTransfer.files);
  //     e.dataTransfer.clearData();
  //   }
  // };

  return (
    <div className=" bg-white p-5 rounded-md shadow-md ">
      <div className=" flex flex-row gap-8">
        <div
          onClick={() => {
            setIsIndividual(true);
          }}
        >
          Individual
        </div>
        <div
          onClick={() => {
            setIsIndividual(false);
          }}
        >
          Sponser
        </div>
      </div>
      {isIndividual ? (
        <>
          <div>
            <div>
              <div>
                <button className="flex items-center justify-center gap-10 bg-blue-500 text-white px-2.5 py-1.5 rounded cursor-pointer hover:bg-black mr-3 my-5">
                  <span className=" text-white ">Add Passanger</span>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className=" bg-blue-600 text-white rounded-full p-1"
                  />
                </button>
              </div>
              <div className=" flex flex-col gap-3">
                <input
                  type="text"
                  className=" outline-none border-2 border-blue-500 rounded-md py-1.5 px-2 w-[400px] bg-white"
                  placeholder=" Passanger name"
                />
                <div className=" w-[400px] h-[200px] bg-blue-50 rounded-md border-blue-500 border-2"></div>
                <div className=" flex items-left gap-5 justify-end">
                  <button className=" bg-green-500  flex items-center gap-5 w-[100px] px-2.5 py-1.5 rounded cursor-pointer hover:bg-black">
                    <span className=" text-white">Add</span>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-green-600 bg-white rounded-full "
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex justify-end gap-5 my-5">
            <button className="bg-[#219ebc]  hover:bg-black text-white text-[14px] px-4 py-2 rounded cursor-pointer">
              Send
            </button>
            <button
              onClick={() => {
                setSaleResponse(false);
              }}
              className=" bg-red-500 px-4 py-2 text-white rounded text-[14px] hover:bg-black cursor-pointer"
            >
              Close
            </button>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div
            className=" w-[800px] h-[400px] bg-slate-200 flex justify-center items-center"
            // onDrop={handledDrop}
          >
            <div>
              <FontAwesomeIcon
                icon={faFile}
                className=" text-blue-600 text-6xl"
              />
              <div>Drag files here</div>
              <div>
                Or{" "}
                <label htmlFor="uploadContent" className=" text-blue-600">
                  choose your files
                </label>
              </div>
            </div>
            <input
              id="uploadContent"
              type="file"
              multiple
              hidden
              // onChange={hadleUpload}
            />
          </div>
          <ul>
            {files.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
          <textarea name="" id="" placeholder="Special note"></textarea>
          <div className=" flex justify-end gap-10">
            <button className="bg-[#219ebc]  hover:bg-black text-white text-[14px] px-4 py-2 rounded cursor-pointer">
              Send
            </button>
            <button
              onClick={() => {
                setSaleResponse(false);
              }}
              className=" bg-red-500 px-4 py-2 text-white rounded text-[14px] hover:bg-black cursor-pointer"
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesSecondRes;
