import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ImageZoomModel = (props) => {
    const {imageUrl, isOpen,setIsOpen} = props;
    return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg relative w-auto">
                <button
                  className="absolute top-[0] right-[-60px] text-white w-[50px] h-[40px] rounded-md hover:bg-red-500 text-3xl bg-red-400 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                    <FontAwesomeIcon icon={faClose}/>
                </button>
    
                <img src={imageUrl} alt="Full Size" className="max-w-[90vw] max-h-[90vh] rounded-lg" />
              </div>
            </div>

    )
}

export default ImageZoomModel;