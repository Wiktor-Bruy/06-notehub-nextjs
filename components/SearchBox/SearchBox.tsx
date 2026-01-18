import css from "./SearchBox.module.css";

import { useEffect, useState } from "react";

interface SearchBoxProps {
  changeWord: (word: string) => void;
}

export default function SearchBox({ changeWord }: SearchBoxProps) {
  const [text, setText] = useState("");

  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setText(ev.target.value);
  }

  useEffect(() => {
    changeWord(text);
  }, [text, changeWord]);

  return (
    <input
      onChange={handleChange}
      value={text}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
