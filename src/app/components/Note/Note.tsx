type NoteProps = {
  id: string;
  title?: string;
  content?: string;
};

const Note = ({
  title,
  content
}: NoteProps) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow p-3">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default Note;
