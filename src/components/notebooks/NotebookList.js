import React, { useContext, useEffect, useState } from "react";
import { NotebookContext } from "./NotebookProvider";
import { useHistory } from "react-router-dom";
import "./Notebook.css";
import { NotebookDetail } from "./NotebookDetail";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { TextField } from "@material-ui/core";
import { Footer } from ".././nav/Footer";
import { NavBar } from ".././nav/NavBar";

export const NotebookList = () => {
  const { notebooks, getNotebooks, searchTerms, setSearchTerms } = useContext(
    NotebookContext
  );

  const [filteredNotebooks, setFiltered] = useState([]);

  const history = useHistory();

  useEffect(() => {
    getNotebooks();
  }, []);

  useEffect(() => {
    const currentUserId = parseInt(localStorage.getItem("wwi__user"));
    // if searchbar contains a character
    if (searchTerms !== "") {
      // filter notebooks by title
      const notebookFilter = notebooks.filter((notebook) =>
        notebook.title.toLowerCase().includes(searchTerms.toLowerCase())
      );
      // then match local user to userId key on the notebook object
      const userNotebooks = notebookFilter.filter((notebook) => {
        return currentUserId === notebook.userId;
      });
      // then update the filteredNotebooks variable
      setFiltered(userNotebooks);
    } else {
      // if searchbar contains no characters match local user to userId key on the notebook object
      const userNotebooks = notebooks.filter((notebook) => {
        return currentUserId === notebook.userId;
      });
      // then update the filteredNotebooks variable
      setFiltered(userNotebooks);
    }
  }, [searchTerms, notebooks]); // if variables change, re-rendered page

  return (
    <>
      <NavBar />
      <div className="notebook__create">
        <h1 className="notebooks__header">Notebooks:</h1>
        <div className="search">
          <TextField
            id="outlined-search"
            label="Search field"
            type="search"
            variant="filled"
            className="input--wide"
            onKeyUp={(event) => setSearchTerms(event.target.value)}
          />
        </div>
      </div>
      <div className="flex-box">
        <div className="add__notebook__card">
          <div className="icon__div">
            <h2 className="create">Create</h2>
            <div className="icon">
              <BsFillPlusSquareFill
                style={{ color: ` #da3e3e`, cursor: `pointer` }}
                className="add__card"
                onClick={() => history.push("/create")}
              />
            </div>
          </div>
        </div>
        {/* map through filtered notebooks and display them */}
        {filteredNotebooks.map((notebook) => {
          return <NotebookDetail key={notebook.id} notebook={notebook} />;
        })}
      </div>

      <Footer />
    </>
  );
};
