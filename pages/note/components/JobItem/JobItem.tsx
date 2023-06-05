import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { Job, defaultDate } from "../../../api/Job";
import dayjs from "dayjs";
import { STATUS_TASK } from "@/constains";
import Status from "../Status";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ComponentProps {
  addNewTitle: (id: number) => void;
  setEditSec: (id: number) => void;
  handleSetDate: (id: number) => void;
  setJobs: (jobs: Job[]) => void;
  setChangeEdit: (changeEdit: string) => void;
  setCurrentPage: (currentPage: number) => void;
  setDate: (date: Date) => void;
  setEditDeadline: (editDeadline: number) => void;
  jobs: Job[];
  item: Job;
  index: number;
  editSec: number;
  changeEdit: string;
  editDeadline: number;
  currentPage: number;
  //status
  changeStatusItem: (id: number, status: STATUS_TASK | undefined) => void;
}
const ItemJob = (props: ComponentProps) => {
  const {
    jobs,
    item,
    index,
    editSec,
    changeEdit,
    editDeadline,
    currentPage,
    setDate,
    setEditDeadline,
    addNewTitle,
    setJobs,
    setEditSec,
    handleSetDate,
    setChangeEdit,
    setCurrentPage,
    changeStatusItem,
  } = props;

  const removeJob = (id: number) => {
    let updatedJobs = [...jobs].filter((job) => job.id !== id);
    setJobs(updatedJobs);
    setCurrentPage(1);
    toast.success("Xóa thành công!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    setCurrentPage(1);
  };
  const changeEditTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    let newInput = e.target.value;
    setChangeEdit(newInput);
  };

  const handleChangeDeadline = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    let changeDate = event.target.value;
    setDate(new Date(changeDate));
    setCurrentPage(1);
  };

  const handleEditId = (id: number, title: string) => {
    let editId = id;
    setEditSec(editId);
    setChangeEdit(title);
    setCurrentPage(1);
  };
  const handleEditDl = (id: number) => {
    setCurrentPage(1);
    let editDl = id;
    setEditDeadline(editDl);
  };

  return (
    <>
      <div>
        {item.id === editSec ? (
          <>
            <hr />
            <input
              className="input"
              value={changeEdit}
              onChange={(e) => changeEditTitle(e)}
            />
            <button onClick={() => addNewTitle(item.id)}>
              <p className="m-2 bg-[#298146] text-[#f5f5f5] text-[20px] rounded-[4px] min-w-[50px]">
                save
              </p>
            </button>
            <button onClick={() => setEditSec(0)}>
              <p className="bg-[#cf3030] text-[#f5f5f5] text-[20px] rounded-[4px]">
                cancel
              </p>
            </button>
            <hr />
          </>
        ) : (
          <>
            <div className="rounded cursor-pointer py-4 grid grid-cols-12 gap-5">
              <div className="col-span-1">
                {index + 1 + (currentPage - 1) * 5}
              </div>
              <div className="col-span-4">{props.item.title}</div>
              <div className="col-span-2">
                <Status
                  handleCheck={(val) => changeStatusItem(item.id, val)}
                  statusProp={item.status}
                />
              </div>
              <div className="col-span-3">
                {item.id === editDeadline ? (
                  <>
                    <input
                      defaultValue={item.time.toISOString().substring(0, 10)}
                      type="date"
                      onChange={(e) => handleChangeDeadline(e)}
                    />
                    <button
                      className="bg-[#298146] text-[#f5f5f5] text-[20px] rounded-[4px] min-w-[50px]"
                      onClick={() => handleSetDate(item.id)}
                    >
                      save
                    </button>
                  </>
                ) : (
                  <div onClick={() => handleEditDl(item.id)}>
                    <p>{dayjs(item.time).format("DD/MM/YYYY")}</p>
                  </div>
                )}
              </div>
              <div className="col-span-1">
                <button className="text-[#4828db] border-solid border border-[#4828db] p-[4px]">
                  <MdModeEditOutline
                    onClick={() => handleEditId(item.id, item.title)}
                  />
                </button>
              </div>
              <div className="col-span-1">
                <button className="border-solid border border-[#cf3030] p-[4px] text-[#cf3030]">
                  <AiOutlineDelete onClick={() => removeJob(item.id)} />
                </button>
              </div>
            </div>
            <hr />
          </>
        )}
      </div>
    </>
  );
};

export default ItemJob;
