import Link from 'next/link';
import '../styles/global.scss';
// import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
     <div>
      <Link href="/game">
        <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Welcome to Dual N Back
        </span>
      </Link>
    </div>
    </div>
  );
}
