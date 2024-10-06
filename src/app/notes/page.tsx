import PocketBase from "pocketbase";

function Note( { note }: any ) {
    const {
        id,
        title,
        content
    } = note || {};

    return (
        <div className="border border-gray-200 rounded-lg shadow p-3">
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
}

async function getNotes() {
    // const res = await fetch('http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30', { cache: 'no-store' });  // no-store is important
    // const data = await res.json();

    const db = new PocketBase('http://127.0.0.1:8090');
    const data = await db.collection('notes').getList(1, 30, { cache: 'no-store' }); // no-store is important

    console.log(data);

    return data?.items as any[];
}


export default async function NotesPage() {
    const notes = await getNotes();

    return(
      <>
        <h1>Notes Page</h1>
        <div className="flex flex-wrap gap-4">
          {notes?.map((note) => {
            return <Note key={note.id} note={note} />;
          })}
        </div>
      </>
    );
}
