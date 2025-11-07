import { faCircleXmark, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  confirmationUpload,
  sendCofimation,
} from "../../services/salesservices";
import API from "../../services/axiosinstant";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";

const MultipleFileUpload = ({ data, onConfirm }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [confirmedFiles, setConfirmedFiles] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showUploadBox, setShowUploadBox] = useState(true);
  const isAlreadyConfirmed = data.status === "confirm";
  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    const fetchConfirmedFiles = async () => {
      try {
        const res = await API.get(`/api/v1/sales/getConfirmedFiles`, {
          params: { saleId: data._id },
        });
        console.log(res);
        if (res.data && Array.isArray(res.data.files)) {
          const filesWithNames = res.data.files.map((file) => ({
            url: file.url || file.path,
            name:
              file.name || (file.path ? file.path.split("/").pop() : "Unknown"),
          }));
          setConfirmedFiles(filesWithNames);

          if (filesWithNames.length > 0) {
            setShowUploadBox(false);
          }
        }
      } catch (error) {
        console.error("Error fetching confirmed files:", error);
      }
    };
    fetchConfirmedFiles();
  }, [data._id]);

  const onDrop = (acceptedFiles) => {
    if (isAlreadyConfirmed || !showUploadBox) return;
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const submitHandlerFiles = async () => {
    setIsUploading(true);
    if (uploadedFiles.length === 0) return;

    try {
      const urlsWithNames = [];
      for (const file of uploadedFiles) {
        const response = await confirmationUpload(data.subject, file);
        const url = response.path || response;
        urlsWithNames.push({ url, name: file.name });
      }

      await sendCofimation(data._id, urlsWithNames);

      setConfirmedFiles((prev) => [...prev, ...urlsWithNames]);
      setUploadedFiles([]);
      setIsConfirmed(true);
      setShowUploadBox(false);

      if (onConfirm) {
        onConfirm({
          files: urlsWithNames,
          status: "confirm",
        });
      }
      toast("Successfully Confirmed");
    } catch (error) {
      console.error("Error confirming files:", error);
      toast.error("Error confirming files");
    }
    setIsUploading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
      "application/excel": [".xls", ".xlsx"],
    },
    disabled: isAlreadyConfirmed || !showUploadBox,
  });
  return (
    <div>
      <ToastContainer />
      {isUploading ? (
        <div
          className="
    fixed inset-0 z-50 
    flex items-center justify-center 
  "
        >
          <ClipLoader color="oklch(0.673 0.182 276.935)" size={50} />
        </div>
      ) : (
        <>
          {(confirmedFiles.length > 0 || isConfirmed || isAlreadyConfirmed) && (
            <div className="border-2 border-dashed mt-10 border-blue-500 p-10 m-5 rounded-md text-center bg-blue-50">
              {confirmedFiles.length > 0 ? (
                <div className="flex overflow-x-auto space-x-4 p-2">
                  {confirmedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="min-w-[100px] h-40 bg-gray-100 shadow p-5"
                    >
                      <FontAwesomeIcon
                        icon={faFile}
                        className="text-blue-500 text-8xl mb-2"
                      />
                      <div className="text-center">
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-gray-500 break-words"
                        >
                          <p className="text-xs font-semibold text-gray-500 break-words">
                            {file.name.length > 15
                              ? file.name.slice(0, 15) + "..."
                              : file.name}
                          </p>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 font-medium text-3xl m-5">
                  Confirmed
                </div>
              )}
            </div>
          )}
          {!isAlreadyConfirmed && !isConfirmed && (
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
                  <p className="text-blue-700">
                    Drop files here, or click to select
                  </p>
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
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          className="text-3xl"
                        />
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
          )}
          {!isAlreadyConfirmed && showUploadBox && uploadedFiles.length > 0 && (
            <div className=" flex gap-3 justify-end">
              <button
                className="m-5 hover:bg-slate-700 text-slate-700 border-[2px] border-slate-700  hover:text-white px-2.5 py-1.5  rounded cursor-pointer bg-white transition-all duration-300 ease-in-out"
                onClick={submitHandlerFiles}
              >
                Confirm
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MultipleFileUpload;
