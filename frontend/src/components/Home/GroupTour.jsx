import { useEffect, useState } from "react";
import { getGroupData } from "../../services/groupTourService";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageZoomModel from "../Models/ImageZoomModel";
import GroupAddForm from "../Models/GroupAddFrom";
import { data } from "react-router";
import HashLoader from "react-spinners/HashLoader";
import EmptyData from "../../assets/images/messages/emptyData.png";
import { AnimatePresence, motion } from "framer-motion";
export default function Group_Tour() {
  const [dataArray, setDataArray] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [startIndex, setStartIndex] = useState(0);
  const [selectImage, setSelectImage] = useState(null);
  const [selectGroup, setSelectGroup] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data, status } = await getGroupData();
      setDataArray(data);
    };

    getData();
  }, []);

  const nextPage = () => {
    if (startIndex + itemsPerPage < dataArray.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevPage = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };
  if (dataArray === null) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-[500px] shadow-md shadow-black/25  rounded-lg">
        <HashLoader color="#023047" size={50} speedMultiplier={1.2} />
        <h1 className="text-xl text-slate-500 font-semibold">Loading...</h1>
      </div>
    );
  }
  if (dataArray.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-[500px] shadow-md shadow-black/25  rounded-lg ">
        <img src={EmptyData} alt="No data" className="w-[300px] h-[300px]" />
        <h1 className="text-xl text-slate-500 font-semibold relative top-[-50px]">
          No group tours available
        </h1>
      </div>
    );
  }
  return (
    <div className=" flex flex-col  rounded-lg ">
      <div className=" flex flex-row justify-between items-center border-slate-300">
      <div className=" text-slate-700 font-semibold pl-5">Group Tours</div>
      <input type="text" className=" border-[1px] border-slate-300 rounded-lg p-1 px-2 ml-10 text-[14px]" placeholder="Search group tours..."/>
      </div>
      <div className="h-[760px]  m-5 w-[500px]">
        {dataArray
          .slice(startIndex, startIndex + itemsPerPage)
          .map((elt, index) => (
            <div
              key={index}
              className=" max-w-md mx-auto bg-white rounded-xl border-[1px] border-slate-300 md:max-w-2xl p-5 mb-3"
            >
              <div className=" flex flex-row">
                <div
                  className="m-3"
                  onClick={() => {
                    setSelectImage(elt.flyer);
                  }}
                >
                  <img
                    className="h-38 rounded-2xl cursor-pointer"
                    src={elt.flyer}
                    alt=""
                  />
                </div>
                <div className=" m-3">
                  <div className=" text-sm font-semibold uppercase text-slate-600">
                    {elt.name}
                  </div>
                  <div className="mt-2 w-[95px] rounded-xl text-center bg-violet-600 text-white">{elt.country}</div>
                  <div className="text-gray-700 flex gap-2">
                    {elt.mainCities.map((e, index) => (
                      <div key={index}>{e}</div>
                    ))}
                  </div>

                  <div className=" flex flex-row gap-8 mt-5">
                    <div className=" bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      Total: {elt.total}
                    </div>
                    <div className=" bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      Available: {elt.available}
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-row gap-2 justify-end">
                <a href={elt.pdf} download={`${elt.name}.pdf`} target="_blank">
                  <button className="cursor-pointer hover:bg-slate-700 hover:text-white  border-[2px] border-slate-700 text-slate-700 text-[14px] px-3 py-1 rounded transition-all duration-300 ease-in-out">
                    Download pdf
                  </button>
                </a>
                <button
                  className="cursor-pointer bg-slate-700 hover:bg-white hover:text-slate-600 border-[2px] border-slate-700 text-white px-3 py-1 text-[14px] rounded ml-2 transition-all duration-300 ease-in-out"
                  onClick={() => setSelectGroup(elt)}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className=" flex m-auto w-[70px] justify-around  text-[#219ebc] my-8 z-[0]">
        <button disabled={startIndex === 0} className=" disabled:opacity-50">
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            onClick={prevPage}
            className="cursor-pointer text-2xl"
          />
        </button>
        <button
          className="disabled:opacity-50"
          disabled={startIndex + itemsPerPage >= dataArray.length}
        >
          <FontAwesomeIcon
            icon={faChevronCircleRight}
            className=" cursor-pointer text-2xl"
            onClick={nextPage}
          />
        </button>
      </div>
      <AnimatePresence>
        {selectImage && (
          <div className="fixed inset-0 flex justify-center z-[222] bg-[#00000065] items-center overflow-y-scroll">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ImageZoomModel
                setIsOpen={setSelectImage}
                imageUrl={selectImage}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {selectGroup && (
        <div className="fixed inset-0 flex  z-222 bg-[#ffffffd2] justify-center items-center">
          <GroupAddForm setSelectGroup={setSelectGroup} />{" "}
        </div>
      )}
    </div>
  );
}
