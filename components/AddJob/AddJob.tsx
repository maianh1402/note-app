import { Job } from "@/pages/api/Job";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcPlus } from "react-icons/fc";

interface addType {
  jobs: Job[];
  input: string;
  setJobs: (job: Job[]) => void;
  setInput: (input: string) => void;
  setCurrentPage: (currentPage: number) => void;
}

const AddJob = ({
  jobs,
  input,
  setJobs,
  setInput,
  setCurrentPage,
}: addType) => {
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    let newInput = e.target.value;
    setInput(newInput);
  };
  const addJob = (title: string) => {
    setCurrentPage(1);
    if (!input) {
      toast.error("Hãy nhập việc công việc !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    let id = Date.now();
    let job = {
      id: id,
      title: title,
      status: undefined,
      time: new Date(Date.now()),
    };
    let newJobs = [...jobs, job];
    setJobs(newJobs);
    setInput("");
    toast.success("Thêm thành công!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  return (
    <>
      <input
        type="text"
        value={input}
        onChange={(e) => changeInput(e)}
        className="m-2 p-[10px] rounded-[20px] h-[40px] w-[300px] border outline-transparent"
        placeholder="Nhập việc cần làm..."
      ></input>
      <button
        type="submit"
        className="rounded m-[auto] text-center items-center justify-between"
        onClick={() => addJob(input)}
      >
        <FcPlus />
      </button>
      <ToastContainer />
    </>
  );
};

export default AddJob;
