"use client"

import Link from "next/link"

export function Nav() {
  return (
    <nav className="border-b">
      <div className="container mx-auto max-w-7xl flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-bold text-pink-500">
          Story Engine
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/create">
            <button className="px-4 py-2 rounded bg-pink-500 text-white">Create a New Story</button>
          </Link>
          <Link href="/stories">
            <button className="px-4 py-2 rounded border border-pink-500 text-pink-500">All Stories</button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

