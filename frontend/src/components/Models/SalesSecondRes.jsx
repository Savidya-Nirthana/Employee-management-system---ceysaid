import {
  faAngleLeft,
  faAngleRight,
  faCircleXmark,
  faFile,
  faTriangleExclamation,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import {
  getOperationPersons,
  salesCompleteness,
  uploadFilesFin,
} from "../../services/salesservices";
import { toast, ToastContainer } from "react-toastify";
import LoadingModal from "./LoadingModel";

const CustomerBlock = ({
  field,
  index,
  onChange,
  onFileDrop,
  onRemoveFile,
  onRemoveField,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => onFileDrop(index, acceptedFiles),
  });

  return (
    <div className=" m-auto w-[700px] h-[300px] border-[2px] relative  border-slate-100 rounded-md flex flex-col justify-center items-center gap-5">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="absolute top-[-10px] right-[-10px] text-[25px] text-red-500 cursor-pointer"
        onClick={() => onRemoveField(index)}
      />
      <input
        type="text"
        value={field.name}
        onChange={(e) => onChange(index, "name", e.target.value)}
        className=" w-[95%] p-2 mt-2  border border-gray-300 rounded"
        placeholder="Customer Name"
      />

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-blue-500 p-10  rounded-md text-center cursor-pointer bg-blue-50 w-[600px]"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
            <FontAwesomeIcon
              icon={faFile}
              className="text-blue-500 text-9xl mb-2"
            />
            <p className="text-blue-700">Drop files here...</p>
          </>
        ) : field.uploadedFiles.length === 0 ? (
          <>
            <FontAwesomeIcon
              icon={faFile}
              className="text-blue-500 text-8xl mb-2"
            />
            <p className="text-blue-700">Click or drag to upload documents</p>
          </>
        ) : (
          <div className="flex overflow-x-auto space-x-4 p-3">
            {field.uploadedFiles.map((file, fileIdx) => (
              <div
                key={fileIdx}
                className="relative min-w-[100px] h-40 bg-gray-100 shadow p-5 rounded"
              >
                <FontAwesomeIcon
                  icon={faFile}
                  className="text-blue-500 text-5xl mb-2"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFile(index, fileIdx);
                  }}
                  className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                >
                  <FontAwesomeIcon icon={faCircleXmark} className="text-lg" />
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
  );
};

const SponserBlock = ({ uploadedFiles, setUploadedFiles }) => {
  const onDrop = (acceptedFiles) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
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
    </div>
  );
};

const SalesSecondRes = ({ setSaleResponse, selectSale }) => {
  const [isIndividual, setIsIndividual] = useState(true);
  const [files, setFiles] = useState([]);
  const [numberOfPassengers, setNumberOfPassengers] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [opUsers, setOpUsers] = useState([]);
  const [assignedUser, setAssignedUser] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const handledFiles = (select) => {
  //   const fileArray = Array.from(select);
  //   setFiles((prev) => [...prev, ...fileArray]);
  // };

  // const hadleUpload = (e) => {
  //   handledFiles(e.target.files);
  // };

  // const handledDrop = (e) => {
  //   e.preventDefault();
  //   if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
  //     hadleUpload(e.dataTransfer.files);
  //     e.dataTransfer.clearData();
  //   }
  // };

  useEffect(() => {
    const getOpPersons = async () => {
      const response = await getOperationPersons();
      setOpUsers(response.data);
    };
    getOpPersons();
  }, []);

  const [fields, setFields] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!assignedUser) {
      setIsError("Please select a user");
      setIsLoading(false);
      return;
    }

    if (isIndividual) {
      if (fields.length === 0) {
        setIsError("No fields added");
        return;
      } else {
        const urls = [];
        for (const field of fields) {
          const res = await uploadFilesFin(
            field.uploadedFiles,
            field.name,
            selectSale.subject
          );
          // urls.push(...res);

          urls.push({ name: field.name, files: res.urls });
        }
        const response = salesCompleteness(
          urls,
          selectSale._id,
          "individual",
          assignedUser
        );
        if (!response.isError) {
          setIsLoading(false);
          toast.success(response.message);
          setSaleResponse(false);
        } else {
          setIsLoading(false);
          toast.error("error on submit");
        }
      }
    } else {
      if (uploadedFiles.length === 0) {
        setIsError("No files uploaded");
        return;
      } else {
        console.log("Sponser files ready to upload");
      }
    }
  };

  const handleAddField = () => {
    setCurrentSlide(currentSlide + 1);
    setFields([...fields, { name: "", uploadedFiles: [] }]);
    console.log(`fields: ${fields.length}\ncurrentSlide: ${currentSlide}`);
  };

  const handleChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const handleFileDrop = (index, files) => {
    const updatedFields = [...fields];
    updatedFields[index].uploadedFiles.push(...files);
    setFields(updatedFields);
  };

  const handleRemoveFile = (fieldIndex, fileIndex) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].uploadedFiles.splice(fileIndex, 1);
    setFields(updatedFields);
  };

  const onRemoveField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    currentSlide > index && setCurrentSlide(currentSlide - 1);
    setFields(updatedFields);
  };

  const variants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir === 1 ? 50 : -50,
    }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({
      opacity: 0,
      x: dir === 1 ? -50 : 50,
    }),
  };

  return (
    <div className=" bg-white p-5 rounded-md shadow-md relative w-[800px] h-[550px]">
      {isLoading && <LoadingModal />}
      <div className=" flex flex-row gap-8 items-center ">
        <div
          className={`cursor-pointer font-semibold px-4 py-2 rounded-md text-slate-800 hover:text-sky-700 font-display transition-all duration-300 ease-in-out ${
            isIndividual ? "text-[30px]" : "text-[16px]"
          }`}
          onClick={() => {
            setIsIndividual(true);
            setUploadedFiles([]);
            setIsError(false);
          }}
        >
          Individual
        </div>
        <div
          className={`cursor-pointer font-semibold px-4 py-2 rounded-md text-slate-800 hover:text-sky-700 font-display transition-all duration-300 ease-in-out ${
            !isIndividual ? "text-[30px]" : "text-[16px]"
          }`}
          onClick={() => {
            setIsIndividual(false);
            setFields([]);
            setCurrentSlide(0);
            setIsError(false);
          }}
        >
          Sponser
        </div>
      </div>
      <div className="">
        {isIndividual ? (
          <>
            <div className="p-6 max-w-4xl mx-auto flex relative">
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="absolute left-[-100px] top-[170px] text-slate-50 text-[70px] cursor-pointer"
                onClick={() => {
                  setDirection(1);
                  if (currentSlide - 1 < 0) {
                    setCurrentSlide(fields.length);
                  } else {
                    setCurrentSlide(currentSlide - 1);
                  }
                }}
              />

              <AnimatePresence mode="wait" custom={direction}>
                {currentSlide !== 0 ? (
                  <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                  >
                    <CustomerBlock
                      index={currentSlide - 1}
                      field={fields[currentSlide - 1]}
                      onChange={handleChange}
                      onFileDrop={handleFileDrop}
                      onRemoveFile={handleRemoveFile}
                      onRemoveField={onRemoveField}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="add-passenger"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                    className="m-auto w-[700px] h-[300px] border-[2px] border-slate-100 rounded-md flex flex-row justify-center items-center gap-5 cursor-pointer"
                    onClick={handleAddField}
                  >
                    <div>Add passenger</div>
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      className="text-[70px] text-slate-700"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <FontAwesomeIcon
                icon={faAngleRight}
                className="absolute right-[-100px] top-[170px] text-slate-50 text-[70px] cursor-pointer"
                onClick={() => {
                  setDirection(-1);
                  if (currentSlide + 1 > fields.length) {
                    setCurrentSlide(0);
                  } else {
                    setCurrentSlide(currentSlide + 1);
                  }
                }}
              />
            </div>
            <div className="flex items-center justify-center gap-3">
              {fields.length > 0 &&
                fields.map((field, index) => (
                  <div
                    key={index}
                    className={`text-center cursor-pointer flex items-center justify-center ${
                      currentSlide - 1 === index
                        ? "bg-slate-700 w-[30px] h-[30px] rounded-full text-white"
                        : "text-gray-400"
                    } hover:bg-slate-500 hover:text-white w-[30px] h-[30px] rounded-full`}
                    onClick={() => setCurrentSlide(index + 1)}
                  >
                    <div>{index + 1}</div>
                  </div>
                ))}
              <FontAwesomeIcon
                icon={faUserPlus}
                className="text-[20px] text-slate-700 cursor-pointer hover:text-slate-500"
                onClick={handleAddField}
              />
            </div>
          </>
        ) : (
          <>
            <SponserBlock
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
            />
          </>
        )}
      </div>
      <div
        className="absolute top-[-15px] right-[-10px] cursor-pointer text-slate-700 hover:text-red-500 text-[30px]"
        onClick={() => setSaleResponse(false)}
      >
        <FontAwesomeIcon icon={faCircleXmark} />
      </div>
      <div className=" flex justify-between gap-5 my-5">
        <div className=" flex gap-10 items-center">
          <div>Assign: </div>
          <select
            className="border border-gray-300 rounded-md p-1"
            onChange={(e) => setAssignedUser(e.target.value)}
          >
            <option value="">Select User</option>
            {opUsers.map((user) => (
              <option key={user.userId} value={user.id}>
                {user.userId}
              </option>
            ))}
          </select>

          {isError && (
            <div className="text-red-500 flex items-center gap-2">
              <FontAwesomeIcon icon={faTriangleExclamation} />{" "}
              <div>{isError}</div>
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-white text-slate-900 border-[2px] border-slate-700 hover:bg-slate-700   hover:text-white text-[14px] px-4 py-2 rounded cursor-pointer"
        >
          Send
        </button>
      </div>
    </div>
  );
};

SalesSecondRes.prototype = {
  selectSale: PropTypes.object.isRequired,
  setSaleResponse: PropTypes.func.isRequired,
  setResOpen: PropTypes.func.isRequired,
  resOpen: PropTypes.bool.isRequired,
};

export default SalesSecondRes;
