const GroupAddForm = ({ setSelectGroup }) => {
  return (
    <>
      Group add form
      <button className="bg-[#c80000] text-white px-2.5 py-1.5 rounded cursor-pointer hover:bg-black" onClick={() => setSelectGroup(null)}>Close</button>
    </>
  );
};

export default GroupAddForm;
