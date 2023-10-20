/* File: src/app/components/Header.tsx */
'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="p-4 bg-blue-600 text-white shadow-md">
      <nav>
        <ul className="flex space-x-6">
          <li className="transition-transform duration-200 transform hover:scale-105 hover:shadow-lg">
            <Link href="/" className="text-2xl font-semibold hover:text-white">
              Home
            </Link>
          </li>
          <li className="transition-transform duration-200 transform hover:scale-105 hover:shadow-lg">
            <Link href="/units" className="text-2xl font-semibold hover:text-white">
              Units
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}