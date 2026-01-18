import css from './CreateMessage.module.css';

import { type Note } from '@/types/note';

interface CreateMessageProps {
  note: Note;
  mess: string;
}

export default function CreateMessage({ note, mess }: CreateMessageProps) {
  return (
    <div className={css.listItem}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <div className={css.footer}>
        <span className={css.tag}>{note.tag}</span>
        <span className={css.button}>{mess}</span>
      </div>
    </div>
  );
}
