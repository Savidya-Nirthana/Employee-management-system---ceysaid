import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ImageZoomModel = (props) => {
  const { imageUrl, setIsOpen } = props;
  console.log(imageUrl);
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-100">
      <div className="bg-white bg-opacity-50 p-4 rounded-lg shadow-lg relative w-auto">
        <button
          className="absolute top-[0] right-[-60px] text-white w-[50px] h-[40px] rounded-md hover:bg-red-500 text-3xl bg-red-400 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        {imageUrl.split(".")[imageUrl.split(".").length - 1].split("?")[0] ===
        "pdf" ? (
          <iframe src={imageUrl}></iframe>
        ) : (
          <img
            src={imageUrl}
            alt="Full Size"
            className="max-w-[80vw] max-h-[80vh] rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default ImageZoomModel;
