import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const CustomerBlock = ({ field, index, onChange, onFileDrop, onRemoveFile }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => onFileDrop(index, acceptedFiles),
  });

  return (
    <div className="mb-10 p-4 bg-white border rounded shadow">
      <input
        type="text"
        value={field.name}
        onChange={(e) => onChange(index, "name", e.target.value)}
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Customer Name"
      />

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-blue-500 p-10 rounded-md text-center cursor-pointer bg-blue-50"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
            <FontAwesomeIcon icon={faFile} className="text-blue-500 text-9xl mb-2" />
            <p className="text-blue-700">Drop files here...</p>
          </>
        ) : field.uploadedFiles.length === 0 ? (
          <>
            <FontAwesomeIcon icon={faFile} className="text-blue-500 text-9xl mb-2" />
            <p className="text-blue-700">Click or drag to upload documents</p>
          </>
        ) : (
          <div className="flex overflow-x-auto space-x-4 p-3">
            {field.uploadedFiles.map((file, fileIdx) => (
              <div
                key={fileIdx}
                className="relative min-w-[100px] h-40 bg-gray-100 shadow p-5 rounded"
              >
                <FontAwesomeIcon icon={faFile} className="text-blue-500 text-5xl mb-2" />
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
                    {file.name.length > 15 ? file.name.slice(0, 15) + "..." : file.name}
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

const AddCustomerDocuments = () => {
  const [fields, setFields] = useState([]);

  const handleAddField = () => {
    setFields([...fields, { name: "", uploadedFiles: [] }]);
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={handleAddField}
        className="px-4 py-2 mb-6 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        +
      </button>

      {fields.map((field, index) => (
        <CustomerBlock
          key={index}
          index={index}
          field={field}
          onChange={handleChange}
          onFileDrop={handleFileDrop}
          onRemoveFile={handleRemoveFile}
        />
      ))}
    </div>
  );
};

export default AddCustomerDocuments;
