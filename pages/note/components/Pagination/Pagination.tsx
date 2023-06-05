import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { Job } from "../../../api/Job";

interface ComponentPagination {
  setCurrentPage: (currentPage: number) => void;
  currentPage: number;
  results: Job[];
}
const Pagination = (props: ComponentPagination) => {
  const { currentPage, setCurrentPage, results } = props;

  return (
    <div className="inline-flex fixed">
      <button type="button" onClick={() => setCurrentPage(currentPage - 1)}>
        {currentPage <= 1 || <HiOutlineArrowLeft />}
      </button>
      <p className="m-4">{currentPage}</p>
      <button type="button" onClick={() => setCurrentPage(currentPage + 1)}>
        {currentPage >= results.length / 5 || <HiOutlineArrowRight />}
      </button>
    </div>
  );
};

export default Pagination;
