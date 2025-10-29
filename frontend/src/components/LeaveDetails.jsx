import { faChartSimple, faListOl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const LeaveDetails = () => {
  const [isStat, setIsStat] = useState(false);
  const data = [
    { name: "Used", value: 5 },
    { name: "Balance", value: 45 },
    
  ];

  const COLORS = ["#219ebc","#d6d6d6"];
  return (
    <motion.div
      layout
      className="bg-slate-50 py-5 px-5 rounded-[10px] border border-slate-300 overflow-hidden h-[250px]"
    >
      <div className="">
        <div className=" flex justify-between items-center">
          <div className="text-[20px] text-[#023047] font-semibold pb-3">
            Leave Balence
          </div>
          <div
            className=" border-[1px] border-slate-300 px-2 rounded-[5px] text-[#023047] cursor-pointer hover:bg-slate-200 hover:scale-105 duration-300"
            onClick={() => setIsStat(!isStat)}
          >
            {isStat ? (
              <FontAwesomeIcon icon={faChartSimple} />
            ) : (
              <FontAwesomeIcon icon={faListOl} />
            )}
          </div>
        </div>
        <AnimatePresence mode="wait">
          {isStat ? (
            <motion.table
              key="table"
              className="w-full text-[14px] text-slate-500 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <thead>
                <tr>
                  <th className="w-[100px]">Leave type</th>
                  <th className="w-[100px]">All leave</th>
                  <th className="w-[100px]">Balance</th>
                  <th className="w-[100px]">Used</th>
                  <th className="w-[100px]">Pending</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">Lieu leave</td>
                  <td>14.00</td>
                  <td>14.00</td>
                  <td>0.00</td>
                  <td>0.00</td>
                </tr>
                <tr>
                  <td className="py-2">Annual leave</td>
                  <td>14.00</td>
                  <td>14.00</td>
                  <td>0.00</td>
                  <td>0.00</td>
                </tr>
                <tr>
                  <td className="py-2">Casual leave</td>
                  <td>14.00</td>
                  <td>14.00</td>
                  <td>0.00</td>
                  <td>0.00</td>
                </tr>
              </tbody>
            </motion.table>
          ) : (
            <motion.div
              key="nodata"
              className="text-[14px] text-slate-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-full flex flex-row justify-center">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className=" absolute w-[80px]  h-[80px] bg-white rounded-full z-[1] m-auto left-0 right-0 top-0 bottom-0">
                      <div className=" flex flex-col justify-center items-center h-full">
                        <div className=" font-semibold">14.0</div>
                        <div className=" w-[50px] h-[2px] bg-slate-400"></div>
                        <div>50</div>
                      </div>
                    </div>
                    <ResponsiveContainer width={150} height={150}>
                      <PieChart>
                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          outerRadius={50}
                          dataKey="value"
                          startAngle={90}
                          endAngle={-270}
                        >
                          {data.map((entry, index) => (
                            <Cell
                              key={`cell-1-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <span className="font-semibold">Lieu leave</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className=" absolute w-[80px]  h-[80px] bg-white rounded-full z-[10] m-auto left-0 right-0 top-0 bottom-0">
                      <div className=" flex flex-col justify-center items-center h-full">
                        <div className=" font-semibold">14.0</div>
                        <div className=" w-[50px] h-[2px] bg-slate-400"></div>
                        <div>50</div>
                      </div>
                    </div>
                    <ResponsiveContainer width={150} height={150}>
                      <PieChart>
                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          outerRadius={50}
                          dataKey="value"
                          startAngle={90}
                          endAngle={-270}
                        >
                          {data.map((entry, index) => (
                            <Cell
                              key={`cell-1-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <span className="font-semibold">Annual leave</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className=" absolute w-[80px]  h-[80px] bg-white rounded-full z-[10] m-auto left-0 right-0 top-0 bottom-0">
                      <div className=" flex flex-col justify-center items-center h-full">
                        <div className=" font-semibold">14.0</div>
                        <div className=" w-[50px] h-[2px] bg-slate-400"></div>
                        <div>50</div>
                      </div>
                    </div>
                    <ResponsiveContainer width={150} height={150}>
                      <PieChart>
                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          outerRadius={50}
                          dataKey="value"
                          startAngle={90}
                          endAngle={-270}
                        >
                          {data.map((entry, index) => (
                            <Cell
                              key={`cell-1-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <span className="font-semibold">Casual leave</span>
                </div>
                <div>
                  <div className="flex items-center gap-5">
                    <div className=" w-[10px] h-[10px] bg-[#219ebc]"></div>
                    <div>Used</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-5">
                      <div className=" w-[10px] h-[10px] bg-[#d6d6d6]"></div>
                      <div>Balance</div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="">
                <PieChart width={200} height={60}>
                  <Legend
                    layout="horizontal"
                    verticalAlign="middle"
                    align="center"
                  />
                </PieChart>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LeaveDetails;
