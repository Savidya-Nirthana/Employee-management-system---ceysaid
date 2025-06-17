import { useEffect, useRef, useState } from "react";
import { getAllData } from "../../services/salesservices";
import CustomerDetailsModal from "../Models/CustomerDetailsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const PendingSales = () => {
  const [arrayData, setArrayData] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectSale, setSelectSale] = useState(null);
  const [view, setView] = useState(false);

  const searchRef = useRef(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    const getAll = async () => {
      const response = await getAllData();
      setArrayData(response);
    };

    getAll();
  }, []);

  const handledInput = (e) => {
    e.preventDefault();
    const value = e.target.value.trim().toLowerCase();
    setType(value);
  };

  if (!arrayData) {
    return <>loading</>;
  } else {
    return (
      <div>
        <div className=" w-[100%] flex-col flex items-center  relative pt-10">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className=" absolute left-[10%] top-[53px] pl-[15px]"
          />
          <input
            type="text"
            className=" border-gray-600 border-2 w-[80%] h-[40px] rounded-2xl px-[50px]"
            placeholder="Search for a name"
            onChange={handledInput}
            ref={searchRef}
          />
          {type ? (
            <FontAwesomeIcon
              icon={faClose}
              className=" absolute top-[53px] right-[10%] pr-[15px]"
              onClick={() => {
                searchRef.current.value = null;
                // setSearch(salesArray);
              }}
            />
          ) : (
            ""
          )}
        </div>
        <table>
          <thead>
            <tr>
              <th>UserID</th>
              <th>Country</th>
              <th>Days</th>
              <th>Passangers</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {arrayData.map((elt, index) => (
              <tr
                key={index}
                onClick={() => {
                  setOpen(true);
                  setSelectSale(elt);
                }}
              >
                <td>{elt.userId}</td>
                <td>{elt.country}</td>
                <td>{elt.noDays}</td>
                <td>{`A${elt.no_pax.adult}C${elt.no_pax.child}I${elt.no_pax.infant}`}</td>
                <td>{elt.priority}</td>
                <td>{elt.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {open && selectSale && (
          <div className="absolute inset-0 flex justify-center   z-222 bg-[#ffffffd2] items-center">
            <CustomerDetailsModal
              view={view}
              selectSale={selectSale}
              setOpen={setOpen}
            />
          </div>
        )}
      </div>
    );
  }
};

export default PendingSales;
