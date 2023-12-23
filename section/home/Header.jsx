"use client"
import { Bars3Icon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const navigation = [
  { name: "How it works", href: "/how-it-works" },
  { name: "Project Marketplace", href: "/marketplace" },
  { name: "Gallery", href: "/gallery" }
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">ALFIE</span>
            <Image src="/alogo.svg" alt="" width="100" height="50" color="white" />
          </Link>
        </div>
     
        <div className="flex lg:flex-1 lg:justify-end">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" color="white"/>
          </button>
        </div>
      </nav>
      
    </header>
  )
}
