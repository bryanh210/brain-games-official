import Link from 'next/link';
import '../styles/global.scss';

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen homepageFlash">
      <Link href="/game" className="bg-[#171717] hover:bg-green-900 text-white font-bold py-2 px-4 rounded buttonFlash">
        Welcome to Dual N Back
      </Link>
    </div>
  );
}
