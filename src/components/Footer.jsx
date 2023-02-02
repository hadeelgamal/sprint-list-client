import React from 'react'
import { Link } from 'react-router-dom'

function Footer()  {
  return (
    <footer className="footer footer-center  w-full p-4 bg-green-100 text-green-800">
      <div className="text-center">
        <p>
          Made With Love By Hadeel Abdelkareem </p>
          <Link className="font-semibold" to="https://www.linkedin.com/in/hadeelg/"
            >LinkedIn</Link>
        
      </div>
    </footer>
  )
}

export default Footer