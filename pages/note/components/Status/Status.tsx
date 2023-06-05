import { STATUS_TASK } from "@/constains";
import React, { useState, useEffect } from "react";

export const OPTION = [
  { label: "Todo", value: STATUS_TASK.TODO },
  { label: "Process", value: STATUS_TASK.PROCESS },
  { label: "Done", value: STATUS_TASK.DONE },
];
interface StatusJob {
  statusProp?: STATUS_TASK;
  handleCheck: (value: STATUS_TASK | undefined) => void;
}

const Status = (props: StatusJob) => {
  const { statusProp, handleCheck } = props;
  const [status, setStatus] = useState(statusProp);

  const onChangeStatus = (status: STATUS_TASK | undefined) => {
    setStatus(status);
    handleCheck(status);
  };
  useEffect(() => {
    setStatus(statusProp);
  }, [statusProp]);

  return (
    <>
      <div className="flex cursor-pointer">
        {OPTION.map((opp, index) => {
          return (
            <>
              <div key={index}>
                <p
                  className={`${
                    opp.value === status
                      ? "text-[#f5f5f5] rounded-[4px] bg-[#3b9f70]"
                      : ""
                  } m-2 text-xs font-light min-w-[50px]`}
                  onClick={() => onChangeStatus(opp.value)}
                >
                  {opp.label}
                </p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Status;
