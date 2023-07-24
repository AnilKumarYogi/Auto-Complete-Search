import "./card.css";
import React, { useState, useRef, useEffect } from "react";
import Pagination from "./pagination";

type user = {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
};

type Props = {
  Data: user[];
};

//item per page change here
const itemsPerPage = 3;

const defaultUser: user = {
  id: -1,
  firstName: "None",
  lastName: "",
  image: "",
};

function AutoComplete({ Data }: Props) {
  const [searchedValue, setSearchValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<user[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<user>(defaultUser);
  const startIndex = 0;
  const endIndex = Math.min(
    itemsPerPage,
    suggestions.length - itemsPerPage * (pageNo - 1)
  );

  const inputSearchRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value) {
      const value: string = event.target.value.toUpperCase();
      const filteredSuggestions = Data.filter((myUser: user) => {
        let fullName: string = myUser.firstName + " " + myUser.lastName;
        fullName = fullName.toUpperCase();
        return value && fullName.startsWith(value) && fullName !== value;
      });
      setSuggestions(filteredSuggestions);
      setSearchValue(event.target.value);
      setPageNo(1);
      setActiveSuggestion(-1);
      setSelectedSuggestion(defaultUser);
    } else {
      handleButton();
    }
  };
  const handleButton = (): void => {
    setSearchValue("");
    setSuggestions([]);
    setPageNo(1);
    setActiveSuggestion(-1);
    setSelectedSuggestion(defaultUser);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    console.log(
      `start=${startIndex} end=${endIndex} anil->${activeSuggestion}`
    );
    if (event.key === "ArrowDown" && activeSuggestion < endIndex - 1) {
      setActiveSuggestion(activeSuggestion + 1);
    }
    if (event.key === "ArrowUp" && activeSuggestion > startIndex) {
      setActiveSuggestion(activeSuggestion - 1);
    }
    if (event.key === "Enter" && activeSuggestion >= 0) {
      setSelectedSuggestion(
        suggestions[(pageNo - 1) * itemsPerPage + activeSuggestion]
      );
    }
  };

  useEffect(() => {
    if (inputSearchRef.current) {
      inputSearchRef.current.focus();
    }
  }, []);

  return (
    <div>
      <center>
        <h1>User Manual</h1>
        <input
          type="text"
          placeholder="Search Name"
          value={searchedValue}
          onChange={handleChange}
          ref={inputSearchRef}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleButton}>x</button>
        <Pagination
          suggestions={suggestions}
          itemsPerPage={itemsPerPage}
          pageNo={pageNo}
          setPageNo={setPageNo}
          activeSuggestion={activeSuggestion}
          setActiveSuggestion={setActiveSuggestion}
          selectedSuggestion={selectedSuggestion}
          setSelectedSuggestion={setSelectedSuggestion}
        />
      </center>
    </div>
  );
}

export default AutoComplete;
