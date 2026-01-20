import css from './NoteList.module.css';

import { deleteNote } from '@/lib/api';
import { type Note } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

interface NoteListProps {
  noteList: Note[];
  setIsModal: (type: boolean) => void;
  setTypeModal: (type: 'form' | 'error' | 'create' | 'delete') => void;
  setMessage: (mes: Note) => void;
}

export default function NoteList({
  noteList,
  setIsModal,
  setMessage,
  setTypeModal,
}: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteNote(id);
      return res;
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setIsModal(true);
      setTypeModal('delete');
      setMessage(data);
    },
  });

  return (
    <ul className={css.list}>
      {noteList.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link className={css.link} href={`/notes/${note.id}`}>
              View details
            </Link>
            <button
              onClick={() => deleteMutation.mutate(note.id)}
              className={css.button}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
