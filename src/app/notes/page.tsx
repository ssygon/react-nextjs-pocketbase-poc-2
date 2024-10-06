import { isPocketbaseServerOnline, getNotes } from "@/app/notes/actions";
import Note from "../components/Note/Note";
import CreateNote from "../components/CreateNote/CreateNote";

const NotesPage = async () => {

  let response = await isPocketbaseServerOnline();
  if (!response) {
    return (
      <>
        <section>
          <h1>Notes Page</h1>
          <p>
            Please run in terminal: <code>$ ./pocketbase serve</code> to start the PocketBase DB server.
          </p>
          <p>
            Then refresh the page to see the list of notes.
          </p>
        </section>
      </>
    );
  }
  else {
    const notes = await getNotes();

    return(
      <>
        <section>
          <h1>Notes Page</h1>
          <CreateNote />
          <div className="grid gap-x-4 gap-y-4 grid-cols-2 mt-4 sm:grid-cols-3 md:grid-cols-4">
            {notes.map((note) => (
                // Use {...note} spread to simplify passing in multiple props instead of:
                // <Note key={note.id} id={note.id} title={note?.title} content={note?.content}/>
                <Note key={note.id} {...note}/>
            ))}
          </div>
        </section>
      </>
    );
  }

}

export default NotesPage;