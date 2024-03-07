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
          width: 100%;
          background: rgb(54,111,196);
                    background: linear-gradient(90deg, rgba(54,111,196,1) 20%, rgba(151,110,209,1) 100%);
          color: white;
          text-align: center;
        }
        `}
      </style>
    </>
  )
}

export default Footer