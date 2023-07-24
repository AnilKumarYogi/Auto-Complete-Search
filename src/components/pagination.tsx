import "./card.css";
import Display from "./Display";

type user = {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
};

type Props = {
  suggestions: user[];
  itemsPerPage: number;
  pageNo: number;
  setPageNo: React.Dispatch<React.SetStateAction<number>>;
  activeSuggestion: number;
  setActiveSuggestion: React.Dispatch<React.SetStateAction<number>>;
  selectedSuggestion: user;
  setSelectedSuggestion: React.Dispatch<React.SetStateAction<user>>;
};
const defaultUser: user = {
  id: -1,
  firstName: "None",
  lastName: "",
  image: "",
};

function Pagination(props: Props) {
  const {
    suggestions,
    itemsPerPage,
    pageNo,
    setPageNo,
    activeSuggestion,
    setActiveSuggestion,
    selectedSuggestion,
    setSelectedSuggestion,
  } = props;
  const totalPage = Math.ceil(suggestions.length / itemsPerPage);
  const startIndex = (pageNo - 1) * itemsPerPage;
  const endIndex = Math.min(pageNo * itemsPerPage, suggestions.length);
  const currentItems = suggestions.slice(startIndex, endIndex);

  const handleClickNext = (): void => {
    if (pageNo < totalPage) {
      const newPage: number = pageNo + 1;
      setPageNo(newPage);
      setActiveSuggestion(-1);
      setSelectedSuggestion(defaultUser);
    }
  };

  const handleClickPrev = (): void => {
    if (pageNo > 1) {
      const newPage: number = pageNo - 1;
      setPageNo(newPage);
      setActiveSuggestion(-1);
      setSelectedSuggestion(defaultUser);
    }
  };

  return (
    <div className="card">
      {currentItems &&
        currentItems.map((mySuggestion: user, index: number): any => {
          if (index !== activeSuggestion)
            return <Display person={mySuggestion} />;
          else
            return (
              <div className="shortcard">
                <Display person={mySuggestion} />
              </div>
            );
        })}
      <button style={{ float: "right" }} onClick={handleClickNext}>
        Next
      </button>
      <button style={{ float: "left" }} onClick={handleClickPrev}>
        Prev
      </button>
      <h3>
        {selectedSuggestion?.firstName} {selectedSuggestion?.lastName} is
        Selected
      </h3>
    </div>
  );
}

export default Pagination;
