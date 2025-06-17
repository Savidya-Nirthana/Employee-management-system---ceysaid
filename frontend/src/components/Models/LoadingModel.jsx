import BeatLoader from "react-spinners/BeatLoader";

const LoadingModal = () => {
    return (
        <>
        <div
          className={`flex items-center min-h-[calc(100vh-70px)] justify-center font duration-500 mt-[70px] w-[100%]`}
        >
          <BeatLoader color="#50c5ff" loading={true} size={20} />
        </div>
        </>
    )
}

export default LoadingModal;