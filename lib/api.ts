import axios from 'axios';

import { type Note, type NewNote } from '@/types/note';

interface Answer {
  notes: Note[];
  totalPages: number;
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export async function fetchNotes(
  page: number,
  topic?: string
): Promise<Answer> {
  if (topic !== '') {
    const res = await axios.get<Answer>(
      `https://notehub-public.goit.study/api/notes?search=${topic}&page=${page}&perPage=12`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } else {
    const res = await axios.get<Answer>(
      `https://notehub-public.goit.study/api/notes?page=${page}&perPage=12`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  }
}

export async function createNote(note: NewNote): Promise<Note> {
  const res = await axios.post<Note>(
    `https://notehub-public.goit.study/api/notes`,
    note,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
