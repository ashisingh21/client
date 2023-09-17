import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='footer'>
            <div className=' p-3 '>
                <h1 className='text-center mb-4'>All right reserved &copy; Ashi_Singh</h1>
                <div className='footer-nav'>
                    <ul>
                        <li className="footer-item">
                            <Link className="footer-link" to="/about">About</Link>
                        </li>
                        <li className="footer-item">
                            <Link className="footer-link" to="/policy">Privacy Policy</Link>
                        </li>
                        <li className="footer-item">
                            <Link className="footer-link" to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer