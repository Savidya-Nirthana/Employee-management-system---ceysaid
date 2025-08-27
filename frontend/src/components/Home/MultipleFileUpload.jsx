import { faCircleXmark, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  confirmationUpload,
  sendCofimation,
} from "../../services/salesservices";

const MultipleFileUpload = ({ data }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const submitHandlerFiles = async () => {
    const urls = [];
    for (const elt of uploadedFiles) {
      const response = await confirmationUpload(data.subject, elt);
      urls.push(response);
    }
    const response = await sendCofimation(data._id, urls);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
      "application/excel": [".xls", ".xlsx"],
    },
  });
  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed mt-20 border-blue-500 p-10  m-5 rounded-md text-center cursor-pointer bg-blue-50"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
            <FontAwesomeIcon
              icon={faFile}
              className="text-blue-500 text-9xl mb-2"
            />
            <p className="text-blue-700">Drop the files here...</p>
          </>
        ) : uploadedFiles.length == 0 ? (
          <>
            <FontAwesomeIcon
              icon={faFile}
              className="text-blue-500 text-9xl mb-2"
            />
            <p className="text-blue-700">Drop files here, or click to select</p>
          </>
        ) : (
          <div className="flex overflow-x-auto space-x-4 p-3 ">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="relative min-w-[100px] h-40 bg-gray-100 shadow items-center p-5 mr-6"
              >
                <FontAwesomeIcon
                  icon={faFile}
                  className="text-blue-500 text-8xl mb-2"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="absolute bottom-35 left-22 text-blue-400 hover:text-blue-700"
                >
                  <FontAwesomeIcon icon={faCircleXmark} className="text-3xl" />
                </button>
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-500 break-words">
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
      <div className=" flex gap-3 justify-end">
        <button
          className="m-5 hover:bg-slate-700 text-slate-700 border-[2px] border-slate-700  hover:text-white px-2.5 py-1.5  rounded cursor-pointer bg-white transition-all duration-300 ease-in-out"
          onClick={submitHandlerFiles}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default MultipleFileUpload;
