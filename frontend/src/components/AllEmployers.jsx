import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
const items = Array.from({ length: 25 }, (_, i) => i);
const AllEmployers = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [startIndex, setStartIndex] = useState(0);
  useEffect(() => {
    const updateItemsPerPage = () => {
      const itemHeight = 85;
      const availableHeight = window.innerHeight;
      const newItemsPerPage = Math.floor(availableHeight / itemHeight);
      setItemsPerPage(newItemsPerPage);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const nextPage = () => {
    if (startIndex + itemsPerPage < items.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevPage = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };
  return (
    <>
      <div className=" h-[760px] bg-slate-50 w-auto py-5">
        <div className="w-[100%] my-1 text-[20px] text-slate-600 mb-5 pl-5">
          Employers
        </div>
        <div>
          <table className=" mx-10">
            <thead className="  text-slate-700 text-[14px]">
              <tr>
                <th className=" w-[120px] py-2">User id</th>
                <th className=" w-[120px]">Name</th>
                <th className=" w-[120px]">Email</th>
                <th className=" w-[120px]">Department</th>
              </tr>
            </thead>
            <tbody className=" text-[14px] text-slate-600">
              {items
                .slice(startIndex, startIndex + itemsPerPage)
                .map((item, i) => (
                  <>
                    <tr key={i}>
                      <td className=" text-center py-5">{item}</td>
                      <td className=" text-center">D.G.M Doe</td>
                      <td className=" text-center">john@ceysaid.lk</td>
                      <td className=" text-center">Operation</td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
          <div className=" flex m-auto w-[70px] justify-around">
            <div>
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                className=" cursor-pointer"
                onClick={prevPage}
              />
            </div>
            <div>
              <FontAwesomeIcon
                icon={faChevronCircleRight}
                className=" cursor-pointer"
                onClick={nextPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllEmployers;
