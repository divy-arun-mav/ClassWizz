import React from 'react'

const Footer = () => {
  return (
      <>
          <div className='footer-cont'>
        Copyright &copy; 2024. All rights  reserved | Designed by Tech4Stack
      </div>  
      <style>
        {`
        .footer-cont {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: black;
   color: white;
   text-align: center;
}
        `}
      </style>
    </>
  )
}

export default Footer