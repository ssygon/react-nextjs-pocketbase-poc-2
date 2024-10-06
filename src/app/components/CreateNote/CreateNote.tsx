'use client';

import { addNote } from "@/app/notes/actions";
import { useState, useEffect } from 'react';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (creating) {
        try {
          const record = {
            title,
            content,
          };

          // Add the note to the database
          await addNote(record);

          setContent('');
          setTitle('');

          closeDialog();

          console.log('Successfully created a note');
        } catch (error) {
          console.error('Error creating a note:', error);
        } finally {
          setCreating(false);
        }
      }
    };

    fetchData();
  }, [creating, title, content]);

  const create = (e: any) => {
    e.preventDefault();
    setCreating(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  }

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  }

  return (
    <>
      <button className="btn" onClick={toggleDialog}>Add a Note</button>
      {dialogOpen && (
        <div className="dialog">
          <form onSubmit={create}>
            <div className="flex flex-col px-4 pt-3">
              <h3>Add a Note</h3>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="px-4 py-3 sm:flex sm:justify-end sm:px-4">
              <button className="btn" type="submit">
                Create note
              </button>
              <button className="btn-cancel mt-3 sm:ml-3 sm:mt-0" type="button" onClick={closeDialog}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default CreateNote;