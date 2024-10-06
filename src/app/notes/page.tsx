import PocketBase from "pocketbase";

import Note from "../components/Note/Note";

async function getNotes() {
  try {
      // const res = await fetch('http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30', { cache: 'no-store' });  // no-store is important
      // const data = await res.json();
      const db = new PocketBase('http://127.0.0.1:8090');
      const data = await db.collection('notes').getList(1, 30, { cache: 'no-store' });

      console.log(data);

      return data?.items || [];
    } catch (error) {
      console.error('Error fetching notes:', error);
      return [];
    }    
}


export default async function NotesPage() {
    const notes = await getNotes();

    return(
      <>
        <section>
          <h1>Notes Page</h1>
            {notes.length === 0 ? (
              <>
                <p>
                  Please run in terminal: <code>$ ./pocketbase serve</code> to start the pocketbase db server.
                </p>
                <p>
                  Then refresh page to see the list of notes.
                </p>
              </>
            ) : (
              <div className="flex flex-wrap gap-4">
              {notes.map((note) => (
                  <Note key={note.id} id={note.id} title={note?.title} content={note?.content}/>
              ))}
          </div>
            )}
        </section>
      </>
    );
}
