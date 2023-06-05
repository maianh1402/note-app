import React, { useState } from "react";
import { Inter } from "next/font/google";
import { STATUS_TASK } from "@/constains";
import { listJob, defaultDate, Job } from "./api/Job";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Status from "./note/components/Status";
import Pagination from "./note/components/Pagination";
import JobItem from "./note/components/JobItem";
import AddJob from "./note/components/AddJob";
import type { NextPage } from "next";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  const [jobs, setJobs] = useState(listJob);
  const [input, setInput] = useState("");
  const [editSec, setEditSec] = useState(0);
  const [editDeadline, setEditDeadline] = useState(0);
  const [date, setDate] = useState<Date>(defaultDate);
  const [changeEdit, setChangeEdit] = useState("");
  const [active, setActive] = useState<STATUS_TASK>();
  const [currentPage, setCurrentPage] = useState(1);

  const addNewTitle = (id: number) => {
    setCurrentPage(1);
    if (!changeEdit) {
      toast.warning("Hãy nhập tiêu đề!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    setJobs((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          item.title = changeEdit;
        }
        return item;
      })
    );
    setChangeEdit("");
    setEditSec(0);
    toast.success("Sửa thành công!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const handleAll = () => {
    setActive(undefined);
  };
  const handleActive = (value: STATUS_TASK | undefined) => {
    setCurrentPage(1);
    let activeStatus = value;
    setActive(activeStatus);
  };
  const handleSetDate = (id: number) => {
    setJobs((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          item.time = date;
        }
        return item;
      })
    );
    setCurrentPage(1);
    setEditDeadline(0);
    toast.success("Sửa thành công!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const changeStatusItem = (id: number, status: STATUS_TASK | undefined) => {
    setJobs((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          item.status = status;
        }
        return item;
      })
    );
    setCurrentPage(1);
  };
  const results = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(input ? input.toLowerCase() : "") &&
      (active ? job.status === active : true)
  );

  async function create(data: Job[]) {
    try {
      fetch("http://localhost:3000/api/create", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        let id = Date.now();
        let job = {
          id: 0,
          title: "",
          status: undefined,
          time: new Date(Date.now()),
        };
        let newJobs = [...jobs, job];
        setJobs(newJobs);
      });
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = async (data: Job[]) => {
    try {
      create(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-center">
      <div className="border p-8 h-[620px] rounded-[20px] m-[auto] my-20 max-w-[70%] bg-[#FAF7F2] shadow-[#919F77] shadow-indigo-500/40">
        <h1 className="text[#519977] text-[40px]">TO-DO LIST</h1>
        <form
          className="text-2xl min-h-[450px]"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(jobs);
          }}
        >
          <AddJob
            jobs={jobs}
            input={input}
            setJobs={setJobs}
            setInput={setInput}
            setCurrentPage={setCurrentPage}
          />
          <div className="flex">
            <p
              className={`${
                active === undefined
                  ? "text-[#f5f5f5] rounded-[4px] bg-[#3b9f70]"
                  : ""
              } m-2 text-xs font-light min-w-[50px]`}
              onClick={() => handleAll()}
            >
              All
            </p>
            <Status statusProp={active} handleCheck={handleActive} />
          </div>
          <div className="h-[1px] bg-[#000] m-[10px]"></div>

          {results
            .slice((currentPage - 1) * 5, currentPage * 5)
            .map((item, index) => (
              <JobItem
                jobs={jobs}
                currentPage={currentPage}
                index={index}
                item={item}
                changeEdit={changeEdit}
                editSec={editSec}
                editDeadline={editDeadline}
                setDate={setDate}
                setEditDeadline={setEditDeadline}
                addNewTitle={addNewTitle}
                setJobs={setJobs}
                setEditSec={setEditSec}
                handleSetDate={handleSetDate}
                setChangeEdit={setChangeEdit}
                setCurrentPage={setCurrentPage}
                key={item.id}
                //Status
                changeStatusItem={changeStatusItem}
              />
            ))}
        </form>
        <Pagination
          results={results}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Home;
