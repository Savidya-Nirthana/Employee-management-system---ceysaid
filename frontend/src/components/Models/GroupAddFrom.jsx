import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faCircleXmark,
  faPersonCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  participantAdd,
  participantDocUpload,
} from "../../services/groupTourService";

const GroupAddForm = ({ setSelectGroup, selectGroup, toast }) => {
  const [formData, setFormData] = useState({
    groupId: selectGroup._id,
    fullName: "",
    contactNo: "",
    payment: "1st Payment",
    airTicket: false,
    visa: false,
    foods: "",
    remarks: "",
    uploadedFiles: [],
  });

  // handle input field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handle file drop
  const handleFileDrop = (acceptedFiles) => {
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...acceptedFiles],
    }));
  };

  // handle file removal
  const handleRemoveFile = (fileIndex) => {
    setFormData((prev) => {
      const updatedFiles = [...prev.uploadedFiles];
      updatedFiles.splice(fileIndex, 1);
      return { ...prev, uploadedFiles: updatedFiles };
    });
  };

  // dropzone setup
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileDrop,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urls = [];
    for (const file of formData.uploadedFiles) {
      const response = await participantDocUpload(
        file,
        selectGroup._id,
        formData.fullName
      );
      if (!response.error) {
        urls.push(response.path);
      }
    }

    const requestData = { ...formData, uploadedFiles: urls };
    const resfull = await participantAdd(requestData);
    if (!resfull.error) {
      toast.success("Participant added successfully");
      setSelectGroup(null);
    } else {
      toast.error("Error adding participant");
    }
  };

  return (
    <div className="rounded-[10px] my-4 shadow-md shadow-black/25 m-5 bg-slate-50 pb-6 text-[14px] relative">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className=" absolute right-[-10px] top-[-10px] text-red-500 text-[25px] bg-white rounded-full cursor-pointer"
        onClick={() => {
          setSelectGroup(null);
        }}
      />
      {/* Header */}
      <div className="rounded-t-[10px]  text-[#023047] p-3 flex  items-center gap-5 my-4">
        <h2 className="text-xl font-semibold m-1">Add Passenger Details</h2>
        <FontAwesomeIcon className=" text-[20px]" icon={faPersonCirclePlus} />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 px-6  text-gray-800"
      >
        {/* Full Name */}
        <div className=" flex felx-row gap-10">
          <div className=" w-[400px]">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="border rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                required
              />
            </div>

            {/* Contact No */}
            <div>
              <label className="block font-medium mb-1">Contact No.</label>
              <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                className="border rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                required
              />
            </div>
          </div>
          <div className=" w-[400px]">
            {/* Foods */}
            <div>
              <label className="block font-medium mb-1">Foods</label>
              <input
                type="text"
                name="foods"
                value={formData.foods}
                onChange={handleChange}
                className="border rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>

            {/* Remarks */}
            <div>
              <label className="block font-medium mb-1">Remarks</label>
              <input
                type="text"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="border rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>
          </div>
        </div>
        {/* Payment */}
        <div>
          <label className="block font-medium mb-1">Payment</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="1st Payment"
                checked={formData.payment === "1st Payment"}
                onChange={handleChange}
              />
              1st Payment
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="Full Payment"
                checked={formData.payment === "Full Payment"}
                onChange={handleChange}
              />
              Full Payment
            </label>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex gap-10">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="airTicket"
              checked={formData.airTicket}
              onChange={handleChange}
            />
            Air Ticket
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="visa"
              checked={formData.visa}
              onChange={handleChange}
            />
            Visa
          </label>
        </div>

        {/*Document Upload Section */}
        <div>
          <label className="block font-medium mb-1">Upload Document</label>
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-slate-500 p-10 rounded-md text-center cursor-pointer bg-blue-50"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <>
                <FontAwesomeIcon
                  icon={faFile}
                  className="text-slate-500 text-9xl mb-2"
                />
                <p className="text-slate-700">Drop files here...</p>
              </>
            ) : formData.uploadedFiles.length === 0 ? (
              <>
                <FontAwesomeIcon
                  icon={faFile}
                  className="text-slate-500 text-9xl mb-2"
                />
                <p className="text-slate-700">
                  Click or drag to upload documents
                </p>
              </>
            ) : (
              <div className="flex overflow-x-auto space-x-4 p-3">
                {formData.uploadedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="relative min-w-[100px] h-40 bg-gray-100 shadow p-5 rounded"
                  >
                    <FontAwesomeIcon
                      icon={faFile}
                      className="text-slate-500 text-5xl mb-2"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(idx);
                      }}
                      className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                    >
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="text-lg"
                      />
                    </button>
                    <div className="text-center">
                      <p className="text-xs font-semibold text-gray-600 break-words">
                        {file.name.length > 15
                          ? file.name.slice(0, 15) + "..."
                          : file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="text-slate-700 border-slate-700 border-[2px] hover:bg-slate-700 hover:text-white font-semibold py-2 px-8 rounded-md  transition-all cursor-pointer"
          >
            Add
          </button>
          <button
            onClick={() => setSelectGroup(null)}
            className="ml-4 bg-red-600 text-white font-semibold py-2 px-8 rounded-md hover:bg-red-700 transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default GroupAddForm;
