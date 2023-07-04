import React from 'react'
import { useState } from 'react'
import {BsFillArrowUpCircleFill} from 'react-icons/bs'

function ButtonBackToTop() {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop; 

        if(scrolled > 300) setVisible(true)
        else setVisible(false)
    }

    const handleBackTop = () => {
        window.scrollTo(0, 0)
    }
    
    window.addEventListener('scroll', toggleVisible)
  return (
      <>
      {visible ? (<BsFillArrowUpCircleFill className="fs-1 back-top" onClick={handleBackTop}/>) : (<></>)}
      </>
  )
}

export default ButtonBackToTop