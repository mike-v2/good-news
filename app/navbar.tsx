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
    <nav className="h-28 flex pb-2 border-b border-yellow-200">
      <div className="w-20 mt-auto ml-4">
        <details ref={detailsRef} className="dropdown dropdown-hover" onMouseEnter={e => setIsOpen(true)} onMouseLeave={e => setIsOpen(false)} onClick={toggleMenu}>
          <summary className="m-1 btn bg-transparent  border-transparent hover:bg-transparent hover:border-transparent hover:underline flex flex-col justify-end capitalize font-normal text-base">
            News
          </summary>
          <ul className="dropdown-content p-2 shadow menu z-[1] bg-base-100 rounded-box w-52">
            <li className="flex">
              <div>
                <Link href='/building' className="block">Building</Link>
                <Image src='/images/building-icon.svg' className="p-0 ml-auto" height={30} width={30} alt='building icon' />
              </div>
            </li>
            <li>
              <div>
                <Link href='/healthcare' >Healthcare</Link>
                <Image src='/images/healthcare-icon.svg' className="p-0 ml-auto" height={30} width={30} alt='building icon' />
              </div>
            </li>
            <li>
              <div>
                <Link href='/education' >Education</Link>
                <Image src='/images/education-icon.svg' className="p-0 ml-auto" height={30} width={30} alt='building icon' />
              </div>
            </li>
            <li>
              <div>
                <Link href='/peace' >Peace</Link>
                <Image src='/images/peace-icon.svg' className="p-0 ml-auto" height={30} width={30} alt='building icon' />
              </div>
            </li>
          </ul>
        </details>
      </div>
      <div className="absolute top-0 w-full flex justify-center pointer-events-none">
        <Link href='/' ><Image src='/images/good-news-logo.png' className="w-auto pointer-events-auto hover:scale-125 hover:translate-y-3 transition-all duration-700 ease-out hover:drop-shadow-lg" width={128} height={128} alt='logo' /></Link>
      </div>
      <div className="mt-auto ml-auto mr-8 pb-1">
        <Link href='/about'>About</Link>
      </div>
    </nav>
  )
}