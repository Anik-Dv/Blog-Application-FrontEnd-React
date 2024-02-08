import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <ul className='footer_categories'>
        <li><Link to="/posts/categories/business">Business</Link></li>
        <li><Link to="/posts/categories/education">Education</Link></li>
        <li><Link to="/posts/categories/entertainment">Entertainment</Link></li>
        <li><Link to="/posts/categories/art">Art</Link></li>
        <li><Link to="/posts/categories/technology">Technology</Link></li>
        <li><Link to="/posts/categories/investment">Investment</Link></li>
        <li><Link to="/posts/categories/weather">Weather</Link></li>
        <li><Link to="/posts/categories/uncategorized">Uncategorized</Link></li>
      </ul>   
      <div className='footer_copyright'>
        <small>All Rights Reserved &copy; Copyright, Anik-Dv</small>
      </div>  
    </footer>
  )
}

export default Footer
