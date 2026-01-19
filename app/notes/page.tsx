import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

import { fetchNotes } from '../../lib/api';
import NotesClient from './Notes.client';

import css from './page.module.css';

interface NotesProps {
  params: Promise<{
    search: string;
    page: number;
  }>;
}

export default async function Notes({ params }: NotesProps) {
  const { search: word, page } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', page, word],
    queryFn: () => fetchNotes(page, word),
  });

  return (
    <main className={css.main}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient />
      </HydrationBoundary>
    </main>
  );
}
