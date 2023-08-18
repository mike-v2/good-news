'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function toggleMenu(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setIsOpen(prev => !prev);
  }

  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.open = isOpen;
    }
  }, [isOpen])

  return (
    <nav className="h-28 flex justify-end pb-4 border-b">
      <div className="block md:hidden w-20 ml-auto">
        <details ref={detailsRef} className="dropdown dropdown-end" onClick={toggleMenu}>
          <summary className="m-1 btn"><Image src='/images/menu_icon.svg' width={30} height={30} alt="menu icon" /></summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li><Link href='/about' >About</Link></li>
            <li><Link href='/building' >Building</Link></li>
            <li><Link href='/healthcare' >Healthcare</Link></li>
            <li><Link href='/education' >Education</Link></li>
            <li><Link href='/peace' >Peace</Link></li>
          </ul>
        </details>
      </div>
      <div className="hidden md:flex justify-end gap-x-8 mt-auto mr-6">
        <Link href='/about' >About</Link>
        <Link href='/building' >Building</Link>
        <Link href='/healthcare' >Healthcare</Link>
        <Link href='/education' >Education</Link>
        <Link href='/peace' >Peace</Link>
      </div>
    </nav>
  )
}