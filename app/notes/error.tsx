'use client';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button onClick={reset}>Try again...</button>
    </>
  );
}
