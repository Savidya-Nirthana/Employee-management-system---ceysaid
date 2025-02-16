// import PropTypes from "prop-types";
import { useState } from "react";
import RegStepOne from "../components/RegStepOne";


// StepOne.propTypes = {
//   formData: PropTypes.shape({
//     fullname: PropTypes.string.isRequired,
//     house_no: PropTypes.string,
//     street1: PropTypes.string.isRequired,
//     street2: PropTypes.string,
//     city_town: PropTypes.string.isRequired,
//     district: PropTypes.string.isRequired,
//     postal_code: PropTypes.string.isRequired,
//     ds_division: PropTypes.string.isRequired,
//     gn_division: PropTypes.string.isRequired,
//     telephone: PropTypes.string,
//     mobile: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//   }).isRequired,
//   setFormData: PropTypes.func.isRequired,
// };
// StepTwo.propTypes = {
//   formData: PropTypes.shape({
//     dob: PropTypes.string.isRequired,
//     gender: PropTypes.string.isRequired,
//     nic: PropTypes.string.isRequired,
//     nationality: PropTypes.string,
//     religion: PropTypes.string,
//     cooperate_title: PropTypes.string.isRequired,
//     location: PropTypes.string,
//     date_joined: PropTypes.string.isRequired,
//     department: PropTypes.string.isRequired,
//     employee_type: PropTypes.string,
//     employee_image: PropTypes.string,
//     nic_image: PropTypes.string,
//     gn_certificate: PropTypes.string,
//     letter_app: PropTypes.string,
//   }).isRequired,
//   setFormData: PropTypes.func.isRequired,
// };

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
    religion: "",
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
    <>
      <RegStepOne />
    </>
  );
};

export default UserRegistration;
