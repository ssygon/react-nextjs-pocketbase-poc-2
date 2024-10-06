'use client';

import { deleteNote } from "@/app/notes/actions";

type NoteProps = {
  id: string;
  title?: string;
  content?: string;
};

const Note = ({
  id,
  title,
  content
}: NoteProps) => {

  const handleDelete = async (e: any) => {
    e.preventDefault();
    try {
      const { status, message } = await deleteNote(id);
      console.log(status, message); 
    } catch (error) {
      console.error('Error deleting note', error);
    }
  }

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg shadow p-3">
      <h2>{title}</h2>
      <p>{content}</p>
      <div className="flex justify-end mt-auto">
        <button 
          onClick={handleDelete} 
          className="cursor-pointer"
          aria-label="Delete note"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Note;
