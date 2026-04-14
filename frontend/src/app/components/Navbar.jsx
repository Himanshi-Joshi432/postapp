import Link from "next/link";
import React from "react";

const Navbar = () => {
     return (
<div className='bg-pink-700 mb-4 px-4 py-2 justify-between items-center flex sticky top-0 z-50'>
        <h1 className='text-2xl font-bold text-white'>My App</h1>
        <div className='flex gap-4 '>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/product">Product</Link>
                <Link href="/post">Post</Link>    
        </div>
    </div>
  )
}

export default Navbar;