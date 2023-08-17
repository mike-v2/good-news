import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div className="flex justify-end gap-x-2">
        <Link href='/about' >About</Link>
        <Link href='/building' >Building</Link>
        <Link href='/healthcare' >Healthcare</Link>
        <Link href='/education' >Education</Link>
        <Link href='/peace' >Peace</Link>
      </div>
    </nav>
  )
}