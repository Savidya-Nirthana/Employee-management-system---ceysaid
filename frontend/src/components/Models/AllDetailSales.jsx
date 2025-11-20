import { faClose } from "@fortawesome/free-solid-svg-icons";
import { setComplete } from "../../services/salesservices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFileExcel,
  faFileWord,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const AllDetailSales = ({ open, setOpen, setRefresh, type }) => {
  // const [openResponse, setOpenResponse] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    if (typeof dateStr === "string") return dateStr.split("T")[0];
    return "";
  };

  const acceptanceDocs = open?.logs?.acceptance?.[0]?.attachements ?? [];
  const processingGroups = open?.logs?.processing?.[0]?.attachements ?? [];

  const handleComplete = async () => {
    const response = await setComplete(open._id);
    if (!response.isError) {
      setRefresh((prev) => !prev);
      setOpen(null);
    }
  };
  return (
    <div className=" bg-white  p-10  m-auto mt-[230px] relative w-[1000px]">
      {/* PAGE TITLE */}

      <div
        onClick={() => setOpen(null)}
        className=" w-[40px] h-[40px] absolute bg-red-500 hover:bg-red-600 rounded-full text-[20px] text-white transition-all duration-300 flex justify-center items-center top-[-10px] right-[-10px] cursor-pointer"
      >
        <FontAwesomeIcon icon={faClose} />
      </div>
      <h1 className="text-3xl font-bold mb-6">Sale Details</h1>

      <div className="grid grid-cols-2 gap-10">
        <div>
          <table className="w-full text-[16px]">
            <tbody>
              <tr>
                <td className="p-2 font-semibold">Customer Name</td>
                <td className="p-2">{open?.customerDetails.name ?? "—"}</td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold">Contact Method</td>
                <td className="p-2">
                  {open?.customerDetails?.contactMethod ?? "—"}
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold">Contact Details</td>
                <td className="p-2">
                  {open?.customerDetails?.contactDetails ?? "—"}
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold">Lead Source</td>
                <td className="p-2">{open?.customerDetails?.lead ?? "—"}</td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold">Subject</td>
                <td className="p-2">{open?.subject ?? "—"}</td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold">Country</td>
                <td className="p-2">{open?.country ?? "—"}</td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold">Main Cities</td>
                <td className="p-2">{open?.mainCities?.join(", ") ?? "—"}</td>
              </tr>
              <tr className="border-t">
                <td className="pl-2 pt-2 font-semibold">Number of:</td>
              </tr>
              <tr>
                <td className="pl-10 p-1">Adults</td>
                <td>{open?.no_pax?.adult ?? 0}</td>
              </tr>
              <tr>
                <td className="pl-10 p-1">Children</td>
                <td>{open?.no_pax?.child ?? 0}</td>
              </tr>
              <tr>
                <td className="pl-10 p-1 pb-2">Infants</td>
                <td>{open?.no_pax?.infant ?? 0}</td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold">Status</td>
                <td className="p-2 capitalize">{open?.status ?? "—"}</td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold">Priority</td>
                <td className="p-2 capitalize">{open?.priority ?? "—"}</td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold">Approved By</td>
                <td className="p-2">{open?.approvedBy ?? "—"}</td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold">Created At</td>
                <td className="p-2">{formatDate(open?.createdAt)}</td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold">Updated At</td>
                <td className="p-2">{formatDate(open?.updatedAt)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* RIGHT SECTION */}
        <div>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="p-2 font-semibold">No. of Days</td>
                <td className="p-2">{open?.noDays ?? "—"}</td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold">Start Date</td>
                <td className="p-2">{formatDate(open?.startDate)}</td>
              </tr>
              <tr className="border-t">
                <td className="p-2 font-semibold">Additional Info</td>
                <td className="p-2 whitespace-pre-line">
                  {open?.additionalInfo ?? "—"}
                </td>
              </tr>

              {/* ACCEPTANCE DOCUMENTS */}
              <tr className="border-t">
                <td className="p-2 font-semibold">Acceptance Documents</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div className="border p-3 h-[240px] overflow-y-auto flex flex-wrap gap-3">
                    {acceptanceDocs.length > 0 ? (
                      acceptanceDocs.map((file, i) => {
                        const ext = file.split(".").pop().split("?")[0];
                        return (
                          <a
                            key={i}
                            href={file}
                            target="_blank"
                            className="w-24 h-24 border rounded flex items-center justify-center text-sm font-semibold hover:scale-105 transition-all"
                          >
                            {ext === "pdf" && (
                              <span className="text-red-600">PDF</span>
                            )}
                            {["xls", "xlsx"].includes(ext) && (
                              <span className="text-green-600">XLS</span>
                            )}
                            {!["pdf", "xls", "xlsx"].includes(ext) && (
                              <span className="text-blue-600">DOC</span>
                            )}
                          </a>
                        );
                      })
                    ) : (
                      <p className="text-gray-400 text-sm">
                        No acceptance docs
                      </p>
                    )}
                  </div>
                </td>
              </tr>

              {/* PROCESSING DOCUMENTS WITH DROPDOWN */}
              <tr>
                <td className="p-2 font-semibold">Processing Documents</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div className="mb-3">
                    <label className="font-semibold mr-2">
                      Select Customer/Group:
                    </label>
                    <select
                      className="border p-1 rounded"
                      value={selectedGroup}
                      onChange={(e) => setSelectedGroup(e.target.value)}
                    >
                      <option value="">-- Select --</option>
                      {processingGroups.map((group, idx) => (
                        <option key={idx} value={group.name}>
                          {group.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="border p-3 h-[250px] overflow-y-auto flex flex-wrap gap-3">
                    {open ? (
                      processingGroups.find((grp) => grp.name === selectedGroup)
                        ?.files?.length > 0 ? (
                        processingGroups
                          .find((grp) => grp.name === selectedGroup)
                          .files.map((file, i) => {
                            const ext = file.split(".").pop().split("?")[0];
                            return (
                              <a
                                key={i}
                                href={file}
                                target="_blank"
                                className="w-24 h-24 border rounded flex items-center justify-center text-sm font-semibold hover:scale-105 transition-all"
                              >
                                {ext === "pdf" && (
                                  <span className="text-red-600">PDF</span>
                                )}
                                {["xls", "xlsx"].includes(ext) && (
                                  <span className="text-green-600">XLS</span>
                                )}
                                {!["pdf", "xls", "xlsx"].includes(ext) && (
                                  <span className="text-blue-600">DOC</span>
                                )}
                              </a>
                            );
                          })
                      ) : (
                        <p className="text-gray-400">
                          No documents for this group
                        </p>
                      )
                    ) : (
                      <p className="text-gray-400">
                        Select a group to view documents
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Response Modal */}
      {/* {openResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg w-[400px]">
            <p className="text-xl font-semibold text-center">
              Action in Progress...
            </p>
            <button
              className="mt-5 w-full bg-blue-600 text-white py-2 rounded"
              onClick={() => setOpenResponse(false)}
            >
              Close
            </button>
          </div>
        </div>
      )} */}

      {type !== "allsales" && (
        <button
          className=" bg-green-500 text-white hover:bg-green-600 px-[10px] py-[3px] transition-all duration-300 cursor-pointer rounded-sm float-end mt-5"
          onClick={handleComplete}
        >
          Completed
        </button>
      )}

      {type === "allsales" && (
        <button
          className=" bg-red-500 py-2 px-2 text-white float-end mt-5 w-[100px] rounded-sm transition-all hover:bg-red-700 cursor-pointer"
          onClick={() => setOpen(null)}
        >
          Close
        </button>
      )}
      <div className=" mt-10"></div>
    </div>
  );
};

export default AllDetailSales;
