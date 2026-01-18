import Link from 'next/link';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/" aria-label="Home">
              Home
            </Link>
          </li>
          <li>
            <Link href="/notes" aria-label="Notes">
              Notes
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
