import React, { useContext, useEffect, useState } from "react";
import { NotesContext } from "./NotesProvider";
import { useParams, useHistory, Link } from "react-router-dom";
import "./Notes.css";

export const NoteDetail = ({ note }) => {
  const { getNotesById, deleteNote } = useContext(NotesContext);
  const [noteVar, setNote] = useState({});
  const { noteId } = useParams();

  useEffect(() => {
    if (noteId) {
      getNotesById(parseInt(noteId)).then((noteObj) => {
        setNote(noteObj);
      });
    } else {
      setNote(note);
    }
  }, [noteId]);

  const history = useHistory();

  const deleteANote = () => {
    deleteNote(noteVar.id).then(() => {
      history.push("/");
    });
  };

  return (
    <section className="notes">
      {/* <button onClick={() => history.push(`/edit/${note.id}`)}>Edit</button>
      <button onDoubleClick={deleteANote}>Delete</button> */}
      <h3>{noteVar.title}</h3>
      <h5>{noteVar.description}</h5>
    </section>
  );
};
