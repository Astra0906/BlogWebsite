import React from 'react'
import { FaBars, FaTimes, FaHome, FaClipboardList, FaPlusCircle } from 'react-icons/fa';

const Logo = (className="") => {
  return (
    <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => navigate('/')}t
                >
                    <FaHome size={24} className="text-white" />
                    <span className="text-lg font-csty font-semibold ">BlogSite</span>
                </div>
  )
}

export default Logo