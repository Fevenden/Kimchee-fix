import React from 'react';
import NotePageSideNav from './NotePageSideNav';
import './NotePage.css'
import NoteItem from './NoteItem';

// Refactor to be functional component
// Implement the delete button on the note page, if the delete is successful, redirect to the / path.
export default function NotePage(props){
  // Use the match params to get the id
  // let routePath = props.routeProps.match.params.id;
  // const noteId = props.store.notes.find(n => n.name === routePath).id;
  // let note = props.store.notes.find(note => note.id === routePath);

  let notes = props.store.notes.filter(note => 
    note.id === props.routeProps.match.params.id
  );

  // find the folder name of the folder containing the note
  // let folder = props.store.folders.find(f => f.id === note.folderId);
  return notes.map(note => {
    let folders = props.store.folders.filter(folder => 
      folder.id === note.folderid
    );
    
    return (
      <>
        <NotePageSideNav folder={folders} {...props}/>
        <section className="singleNoteSection">
          {/* <NoteItem note={note}/> */}
          <h2>{note.name}</h2>
          <p>{`Date modified: ${note.modified}`}</p>
          <button className="deleteNoteBtn">
          Delete Note
        </button>
          <p className="Note_text">{note.content}</p>
        </section>
      </>
    )
  })
}