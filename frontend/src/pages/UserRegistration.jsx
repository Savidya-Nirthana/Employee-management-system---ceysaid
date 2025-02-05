import PropTypes from "prop-types";
import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

const StepOne = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" text-3xl ml-[180px] my-[30px] font-semibold">
        Register new employee
      </div>
      <div className=" flex flex-row justify-around items-center">
        <button
          className=" bg-pink-600 text-white px-4 rounded-sm py-1 hover:text-pink-600 hover:bg-white border-[1.5px] hover:border-pink-500 duration-200 cursor-pointer "
          disabled
        >
          Previous
        </button>
        <div>1/2</div>
        <button
          className="bg-pink-600 text-white px-4 rounded-sm py-1 hover:text-pink-600 hover:bg-white border-[1.5px] hover:border-pink-500 duration-200 cursor-pointer"
          onClick={() => navigate("/step2")}
        >
          Next
        </button>
      </div>
      <form className=" w-[85%] m-auto">
        <div className=" m-10">
          <label htmlFor="">Full name:</label>
          <input
            className=" bg-slate-100 outline-pink-600 border-[1px] border-slate-400 rounded-sm ml-5 w-[500px] p-[1px]"
            type="text"
            name=""
            id=""
            onChange={(e) => setFormData({...formData, fullname: e.target.value})}
            required
          />
        </div>
        <div className=" w-[100%] bg-pink-600 text-white pl-10 rounded-sm py-1">
          Address
        </div>
        <div className=" m-10">
          <div>
            <label htmlFor="">House no:</label>
            <input
              className=" bg-slate-100 outline-pink-600 border-[1px] border-slate-400 rounded-sm ml-5 w-[300px] p-[1px]"
              type="text"
              name=""
              id=""
              onChange={(e) => setFormData({...formData, house_no: e.target.value})}
            />
          </div>
          <div className=" flex flex-row gap-[200px] my-5">
            <div>
              <label htmlFor="">Street 1:</label>
              <input
                className=" bg-slate-100 outline-pink-600 border-[1px] border-slate-400 rounded-sm ml-5 w-[300px] p-[1px]"
                type="text"
                name=""
                id=""
                onChange={(e) => setFormData({...formData, street1: e.target.value})}
                required
              />
            </div>
            <div>
              <label htmlFor="">Street 2:</label>
              <input
                className=" bg-slate-100 outline-pink-600 border-[1px] border-slate-400 rounded-sm ml-5 w-[300px] p-[1px]"
                type="text"
                name=""
                id=""
                onChange={(e) => setFormData({...formData, street2: e.target.value})}
              />
            </div>
          </div>
          <div className=" flex flex-row gap-[100px] my-5">
            <div>
              <label htmlFor="">City/Town</label>
              <input
                className=" bg-slate-100 outline-pink-600 border-[1px] border-slate-400 rounded-sm ml-5 w-[200px] p-[1px]"
                type="text"
                name=""
                id=""
                onChange={(e) => setFormData({...formData, city_town: e.target.value})}
                required
              />
            </div>
            <div>
              <label htmlFor="">District</label>
              <input
                className=" bg-slate-100 outline-pink-600 border-[1px] border-slate-400 rounded-sm ml-5 w-[200px] p-[1px]"
                type="text"
                name=""
                id=""
                
              />
            </div>
            <div>
              <label htmlFor="">Postal Code</label>
              <input
                className=" bg-slate-100 outline-pink-600 border-[1px] border-slate-400 rounded-sm ml-5 w-[200px] p-[1px]"
                type="text"
                name=""
                id=""
              />
            </div>
          </div>
          <div className=" flex flex-row my-5 gap-[200px]">
            <div>
              <label htmlFor="">GS Division</label>
              <input
                className=" bg-slate-100 outline-pink-600 border-[1px] border-slate-400 rounded-sm ml-5 w-[200px] p-[1px]"
                type="text"
                name=""
                id=""
              />
            </div>
            <div>
              <label htmlFor="">GN Divisoin</label>
              <input
                className=" bg-slate-100 outline-pink-600 border-[1px] border-slate-400 rounded-sm ml-5 w-[200px] p-[1px]"
                type="text"
                name=""
                id=""
              />
            </div>
            <div></div>
          </div>
        </div>

        <div className=" w-[100%] bg-pink-600 text-white pl-10 rounded-sm py-1">
          Contact details
        </div>
        <div className=" flex flex-row mt-10 mx-10 mb-5 gap-[200px]">
          <div>
            <label htmlFor="">Telephone</label>
            <input
              type="text"
              className=" bg-slate-100 outline-pink-600 border-[1px] border-slate-400 rounded-sm ml-5 w-[200px] p-[1px]"
              name=""
              id=""
            />
          </div>

          <div>
            <label htmlFor="">Mobile</label>
            <input
              className=" bg-slate-100 outline-pink-600 border-[1px] border-slate-400 rounded-sm ml-5 w-[200px] p-[1px]"
              type="text"
              name=""
              id=""
            />
          </div>
        </div>
        <div className=" mb-10 ml-10">
          <label htmlFor="">Email</label>
          <input
            className=" bg-slate-100 outline-pink-600 border-[1px] border-slate-400 rounded-sm ml-5 w-[200px] p-[1px]"
            type="text"
          />
        </div>
      </form>
      <div className=" flex flex-row justify-around items-center">
        <button
          className=" bg-pink-600 text-white px-4 rounded-sm py-1 hover:text-pink-600 hover:bg-white border-[1.5px] hover:border-pink-500 duration-200 cursor-pointer"
          disabled
        >
          Previous
        </button>
        <div>1/2</div>
        <button
          className="bg-pink-600 text-white px-4 rounded-sm py-1 hover:text-pink-600 hover:bg-white border-[1.5px] hover:border-pink-500 duration-200 cursor-pointer"
          onClick={() => navigate("/step2")}
        >
          Next
        </button>
      </div>
    </>
  );
};

const StepTwo = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" text-3xl ml-[180px] my-[30px] font-semibold">
        Register new employee
      </div>
      <div className=" flex flex-row justify-around items-center">
        <button
          className=" bg-pink-600 text-white px-4 rounded-sm py-1 hover:text-pink-600 hover:bg-white border-[1.5px] hover:border-pink-500 duration-200 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Previous
        </button>
        <div>1/2</div>
        <button className="bg-pink-600 text-white px-4 rounded-sm py-1 hover:text-pink-600 hover:bg-white border-[1.5px] hover:border-pink-500 duration-200 cursor-pointer">
          Finish
        </button>
      </div>
      <form className=" w-[85%] m-auto mt-10">
        <div className=" w-[100%] bg-pink-600 text-white pl-10 rounded-sm py-1">
          Other informations
        </div>
        <div className=" mt-10 mx-10">
          <div className=" flex flex-row gap-[200px] my-5">
            <div>
              <label htmlFor="">Dob: </label>
              <input
                className=" bg-slate-100 outline-pink-600 border-[1px] border-slate-400 rounded-sm ml-5 w-[300px] p-[1px]"
                type="date"
                name=""
                id=""
              />
            </div>

            <div>
              <label htmlFor="">Gender: </label>
              <select
                name=""
                id=""
                className=" w-[150px] outline-pink-600 border-[1px] border-slate-400 rounded-sm"
              >
                <option value="">Male</option>
                <option value="">Female</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="">NIC: </label>
            <input
              className=" bg-slate-100 outline-pink-600 border-[1px] border-slate-400 rounded-sm ml-5 w-[300px] p-[1px]"
              type="text"
              name=""
              id=""
            />
          </div>
        </div>
        <div className=" flex flex-row gap-[100px] mt-5 my-10 ml-10">
          <div>
            <label htmlFor="">Nationality: </label>
            <select className=" w-[150px] outline-pink-600 border-[1px] border-slate-400 rounded-sm">
              <option value="">Sinhala</option>
              <option value="">Tamil</option>
              <option value="">Muslim</option>
              <option value="">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Region: </label>
            <input
              className=" bg-slate-100 outline-pink-600 border-[1px] border-slate-400 rounded-sm ml-5 w-[200px] p-[1px]"
              type="text"
              name=""
              id=""
            />
          </div>
        </div>

        <div className=" w-[100%] bg-pink-600 text-white pl-10 rounded-sm py-1">
          Current assignment
        </div>

        <div className=" mt-10 ml-10">
          <label htmlFor="">Cooperate title: </label>
          <input
            type="text"
            className=" bg-slate-100 outline-pink-600 border-[1px] border-slate-400 rounded-sm ml-5 w-[200px] p-[1px]"
            name=""
            id=""
          />
        </div>
        <div className=" flex flex-row my-5 mx-10 gap-[200px]">
          <div>
            <label htmlFor="">Location: </label>
            <input
              className=" bg-slate-100 outline-pink-600 border-[1px] border-slate-400 rounded-sm ml-5 w-[200px] p-[1px]"
              type="text"
              name=""
              id=""
            />
          </div>

          <div className=" ml-10">
            <label htmlFor="">Join date:</label>
            <input
              className=" bg-slate-100 outline-pink-600 border-[1px] border-slate-400 rounded-sm ml-5 w-[200px] p-[1px]"
              type="date"
            />
          </div>
        </div>
        <div className=" flex flex-row mx-10  mb-10 gap-[200px]">
          <div>
            <label htmlFor="">Department: </label>
            <select
              name=""
              id=""
              className=" w-[200px] border-[1px] border-slate-400 outline-pink-600 py-[0.5px] rounded-sm"
            >
              <option value="">Accounts</option>
              <option value="">Sales</option>
              <option value="">Operation</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Employee type: </label>
            <input
              className=" bg-slate-100 outline-pink-600 border-[1px] border-slate-400 rounded-sm ml-5 w-[200px] p-[1px]"
              type="text"
              name=""
              id=""
            />
          </div>
        </div>
        <div className=" w-[100%] bg-pink-600 text-white pl-10 rounded-sm py-1">
          Attachments
        </div>
        <table className=" w-[100%]">
          <tr className="">
            <td className=" p-5">
              <label htmlFor="">Employee image: </label>
              <input
                type="file"
                name=""
                id=""
                className=" border-slate-400 border-[1px] pl-2 bg-slate-100 rounded-sm w-[250px]"
              />
            </td>
            <td className=" p-5">
              <label htmlFor="">NIC image: </label>
              <input
                type="file"
                name=""
                id=""
                className=" border-slate-400 border-[1px] pl-2 bg-slate-100 rounded-sm w-[250px]"
              />
            </td>
          </tr>
          <tr className="">
            <td className=" p-5">
              <label htmlFor="">Gramaniladari certificate: </label>
              <input
                type="file"
                name=""
                id=""
                className=" border-slate-400 border-[1px] pl-2 bg-slate-100 rounded-sm w-[250px]"
              />
            </td>
            <td className=" p-5">
              <label htmlFor="">Letter of appointment: </label>
              <input
                type="file"
                name=""
                id=""
                className=" border-slate-400 border-[1px] pl-2 bg-slate-100 rounded-sm w-[250px]"
              />
            </td>
          </tr>
        </table>
      </form>
      <div className=" flex flex-row justify-around items-center my-10">
        <button
          className=" bg-pink-600 text-white px-4 rounded-sm py-1 hover:text-pink-600 hover:bg-white border-[1.5px] hover:border-pink-500 duration-200 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Previous
        </button>
        <div>1/2</div>
        <button className="bg-pink-600 text-white px-4 rounded-sm py-1 hover:text-pink-600 hover:bg-white border-[1.5px] hover:border-pink-500 duration-200 cursor-pointer">
          Finish
        </button>
      </div>
    </>
  );
};
StepOne.propTypes = {
    formData: PropTypes.shape({
        fullname: PropTypes.string.isRequired,
        house_no: PropTypes.string,
        street1: PropTypes.string.isRequired,
        street2: PropTypes.string,
        city_town: PropTypes.string.isRequired,
        district: PropTypes.string.isRequired,
        postal_code: PropTypes.string.isRequired,
        ds_division: PropTypes.string.isRequired,
        gn_division: PropTypes.string.isRequired,
        telephone: PropTypes.string,
        mobile: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        
    }).isRequired,
    setFormData: PropTypes.func.isRequired
}
StepTwo.propTypes = {
    formData: PropTypes.shape({
        dob: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        nic: PropTypes.string.isRequired,
        nationality: PropTypes.string,
        region: PropTypes.string,
        cooperate_title: PropTypes.string.isRequired,
        location: PropTypes.string,
        date_joined: PropTypes.string.isRequired,
        department: PropTypes.string.isRequired,
        employee_type: PropTypes.string,
        employee_image: PropTypes.string,
        nic_image: PropTypes.string,
        gn_certificate: PropTypes.string,
        letter_app: PropTypes.string
    }).isRequired,
    setFormData: PropTypes.func.isRequired
}

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    house_no: "",
    street1: "",
    street2: "",
    city_town: "",
    district: "",
    postal_code: "",
    ds_division: "",
    gn_division: "",
    telephone: "",
    mobile: "",
    email: "",
    dob: "",
    gender: "",
    nic: "",
    nationality: "",
    region: "",
    cooperate_title: "",
    location: "",
    date_joined: "",
    department: "",
    employee_type: "",
    employee_image: "",
    nic_image: "",
    gn_certificate: "",
    letter_app: "",
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<StepOne formData={formData} setFormData={setFormData} />}
        />
        <Route
          path="/step2"
          element={<StepTwo formData={formData} setFormData={setFormData} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default UserRegistration;
