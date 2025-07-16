const UploadLoading = ({ uploadCount, length }) => {
  return (
    <div className="fixed inset-0 bg-[#ffffff41] bg-opacity-40 z-9999 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <p className="text-lg font-semibold">Uploading files...</p>
        <p>
          {uploadCount}/{length}
        </p>
        <div className="mt-4 animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-10 h-10 mx-auto" />
      </div>
    </div>
  );
};

export default UploadLoading;
