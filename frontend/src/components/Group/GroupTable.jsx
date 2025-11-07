import { useEffect, useState } from "react";
import { getGroupData, groupDelete } from "../../services/groupTourService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import emptyData from "../../assets/images/messages/emptyData.png";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import ImageZoomModel from "../Models/ImageZoomModel";
import EditGroupModel from "../Models/EditGroupModel";
import BeatLoader from "react-spinners/BeatLoader";
import GroupTourParticipants from "../Models/GroupTourParticipants";

const GroupTable = ({ refresh }) => {
  const [dataArray, setDataArray] = useState([]);
  const [selectImage, setSelectImage] = useState(null);
  const [selectEdit, setSelectEdit] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [startIndex, setStartIndex] = useState(0);
  const [showParticipants, setShowParticipants] = useState(false);

  const [selectDel, setSelectDel] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (selectDel) => {
    setLoading(true);
    const response = await groupDelete(selectDel);
    setLoading(false);
    if (response.status) {
      const newData = dataArray.filter((elt) => elt._id !== selectDel._id);
      setDataArray(newData);
      setSelectDel(null);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.value.toLowerCase().trim();
    const filteredData = dataArray.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    setDataArray(filteredData);
  };

  useEffect(() => {
    const getData = async () => {
      const { data, status } = await getGroupData();
      setDataArray(data);
    };

    getData();
  }, [refresh]);
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
  return (
    <div className=" bg-slate-50 px-10 py-4  rounded-[10px]  border border-slate-300">
      <div className=" flex justify-between items-center">
        <div className="text-xl font-semibold  text-slate-600 m-2">
          Group Tour Table
        </div>
        <input
          type="text"
          placeholder="Search name..."
          className="border-[2px] border-slate-800 outline-pink-400 p-[5px] text-slate-800 text-[13px] w-[250px] rounded-md"
          onChange={handleSearch}
        />
      </div>
      <div className="h-[450px]">
        <table className="min-w-[800px] text-center">
          <thead className="h-[50px] text-slate-700 text-[14px]">
            <th>Tour name</th>
            <th>Country</th>
            <th>Available</th>
            <th>Attachments</th>
            <th>Status</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {dataArray.slice(startIndex, startIndex + itemsPerPage).length ===
              0 && (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  <img
                    src={emptyData}
                    alt="No Data"
                    className="mx-auto w-[200px]"
                  />
                  <div>No Data Available</div>
                </td>
              </tr>
            )}
            {dataArray
              .slice(startIndex, startIndex + itemsPerPage)
              .map((elt, index) => (
                <tr
                  key={index}
                  className="h-[50px] border-b-[1px] border-slate-300 hover:bg-slate-100 cursor-pointer text-[14px] text-slate-600"
                  onClick={() => {
                    setShowParticipants(elt);
                  }}
                >
                  <td className="text-center align-middle">{elt.name}</td>
                  <td className="text-center align-middle">{elt.country}</td>
                  <td className="text-center align-middle">
                    {`${elt.available}/${elt.total}`}
                  </td>
                  <td className="text-center align-middle">
                    <div className="flex gap-2 items-center justify-center">
                      <div className="border-[1px] border-dashed border-slate-400 rounded-md w-[30px] h-[30px] flex justify-center items-center">
                        <img
                          className="w-[25px] rounded-md hovrer:scale-110 duration-300"
                          src={elt.flyer}
                          alt=""
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectImage(elt.flyer);
                          }}
                        />
                      </div>
                      <a
                        className="border-[1px] border-dashed border-slate-400 rounded-md w-[30px] h-[30px] flex justify-center items-center"
                        href={elt.pdf}
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faFilePdf} />
                      </a>
                    </div>
                  </td>
                  <td className="text-center align-middle">Active</td>
                  <td className="text-center align-middle">
                    <div className="flex gap-3 items-center justify-center">
                      <button
                        className="text-green-700 bg-green-300 w-[100px] rounded-sm hover:text-white hover:bg-green-400 cursor-pointer "
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectEdit(elt);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-700 bg-red-300 w-[100px] rounded-sm hover:text-white hover:bg-red-400 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectDel(elt);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {dataArray.length > 0 && (
        <div className=" flex m-auto w-[70px] justify-around h-[40px] text-[#219ebc]  z-[0] ">
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
      )}
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
        {selectEdit && (
          <div className="fixed inset-0 flex justify-center z-[222] bg-[#00000065] items-center overflow-y-scroll">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <EditGroupModel
                setSelectEdit={setSelectEdit}
                selectEdit={selectEdit}
              />
            </motion.div>
          </div>
        )}
        {selectDel && (
          <div className="fixed inset-0 flex justify-center z-[222] bg-[#00000065] items-center overflow-y-scroll">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center w-[350px] h-[100px] justify-center">
                {!loading ? (
                  <div className=" flex flex-col items-center">
                    <div>Are you sure you want to delete this item?</div>
                    <div className="flex gap-3 mt-4">
                      <button
                        className="text-red-700 bg-red-300 w-[100px] rounded-sm cursor-pointer hover:text-white hover:bg-red-400"
                        onClick={() => handleDelete(selectDel)}
                      >
                        Delete
                      </button>
                      <button
                        className="text-gray-700 bg-gray-300 w-[100px] rounded-sm cursor-pointer hover:bg-gray-400 hover:text-white"
                        onClick={() => setSelectDel(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <BeatLoader color="#50c5ff" loading={true} size={20} />
                )}
              </div>
            </motion.div>
          </div>
        )}
        {showParticipants && (
          <div className=" fixed inset-0 flex justify-center z-[222] bg-[#00000065] items-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <GroupTourParticipants
                setShowParticipants={setShowParticipants}
                showParticipants={showParticipants}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GroupTable;
