import React, { useState, createContext } from "react";

export const NotebookContext = createContext();

export const NotebookProvider = (props) => {
  const [notebooks, setNotebooks] = useState([]);
  const [likedNotebooks, setLikedNotebooks] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");

  notebooks.sort((notebook1, notebook2) =>
    notebook1.timestamp < notebook2.timestamp ? 1 : -1
  );

  const getNotebooks = () => {
    return fetch("http://localhost:8088/notebooks?_embed=starredNotebooks")
      .then((res) => res.json())
      .then(setNotebooks);
  };

  const getLikes = () => {
    return fetch(
      `http://localhost:8088/starredNotebooks?userId=${localStorage.getItem(
        "wwi__user"
      )}`
    )
      .then((res) => res.json())
      .then(setLikedNotebooks);
  };

  const addLike = (notebook) => {
    return fetch(`http://localhost:8088/starredNotebooks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notebook),
    })
      .then((response) => response.json())
      .then(getLikes);
  };

  const unlike = (starredNotebookId) => {
    return fetch(
      `http://localhost:8088/starredNotebooks/${starredNotebookId}`,
      {
        method: "DELETE",
      }
    ).then(getLikes);
  };

  const getNotebooksById = (notebookId) => {
    return fetch(
      `http://localhost:8088/notebooks/${notebookId}?_embed=notes`
    ).then((res) => res.json());
  };

  const addNotebook = (notebookObj) => {
    return fetch("http://localhost:8088/notebooks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notebookObj),
    }).then(getNotebooks);
  };

  const editNotebook = (notebook) => {
    return fetch(`http://localhost:8088/notebooks/${notebook.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notebook),
    }).then(getNotebooks);
  };

  const deleteNotebook = (notebookId) => {
    return fetch(`http://localhost:8088/notebooks/${notebookId}`, {
      method: "DELETE",
    }).then(getNotebooks);
  };

  return (
    <NotebookContext.Provider
      value={{
        notebooks,
        getNotebooks,
        getNotebooksById,
        addNotebook,
        editNotebook,
        deleteNotebook,
        searchTerms,
        setSearchTerms,
        addLike,
        unlike,
        getLikes,
        likedNotebooks,
      }}
    >
      {props.children}
    </NotebookContext.Provider>
  );
};
