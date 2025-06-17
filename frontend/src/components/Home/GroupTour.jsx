import { useEffect, useState } from "react";
import { getGroupData } from "../../services/groupTourService";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Group_Tour() {
  const [dataArray, setDataArray] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [startIndex, setStartIndex] = useState(0);

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

  return (
    <div className=" flex flex-col ">
      <div className=" h-[350px]  m-5 w-[500px]">
        {dataArray
          .slice(startIndex, startIndex + itemsPerPage)
          .map((elt, index) => (
            <div
              key={index}
              className=" max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-5 mb-3"
            >
              <div className=" flex flex-row">
                <div className="m-3">
                  <img className="h-38 rounded-2xl" src={elt.flyer} alt="" />
                </div>
                <div className=" m-3">
                  <h2 className=" text-md font-semibold uppercase text-slate-600">
                    {elt.name}
                  </h2>
                  <div className="mt-2 text-gray-500">{elt.country}</div>
                  <div className="text-gray-700">
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
              <div className=" flex flex-row gap-8 justify-end">
                <a href={elt.pdf} download={`${elt.name}.pdf`}>
                  <button className="bg-[#219ebc]  hover:bg-black text-white text-[14px] px-4 py-2 rounded">
                    Download pdf
                  </button>
                </a>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-[14px] rounded ml-2">
                  Add
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className=" flex m-auto w-[70px] justify-around text-[#219ebc] h-[100px] z-[0]">
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
    </div>
  );
}
