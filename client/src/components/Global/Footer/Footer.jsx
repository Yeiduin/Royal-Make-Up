import React from 'react'

export const Footer = () => {
  return (
    <footer className='bg-emerald-500'>
    <div className='container bg-gray500 p-6 mx-auto grid grid-cols-4 col-span-3 gap-5'>
<div>
  <h3 className='text-center mb-5 font-bold text-lg'>About us</h3>
  <p className='text-center'>We are the best of henry</p>
</div>
<div className='container bg-gray500'>
  <h3 className='text-center mb-5 font-bold text-lg'>Social networks</h3>
  <div className='m-3'>
    <img className='mx-auto'
      src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
      alt="facebook" width={40}
    />
   
  </div>
  <div className='m-3'>
    <img className='mx-auto'
      src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
      alt="Instagram" width={40}
    />
    
  </div>
  <div className='m-3' >
    <img className='mx-auto'
      src="https://cdn-icons-png.flaticon.com/512/2504/2504947.png"
      alt="twiter" width={40}
    />
    
  </div>
</div>
<div className='col-span-2'>
  <h3 className='text-center mb-5 font-bold text-lg'>Contact information</h3>
  <div className='grid grid-rows-3'>
  <div className='grid grid-cols-3'>
    <img className='mx-auto'
      src="https://cdn-icons-png.flaticon.com/512/20/20176.png"
      alt="ubication" width={40}
    />
    <label className='col-span-2'>Estamos ubicados en Argentina y Colombia</label>
  </div>
  <div className='grid grid-cols-3 mt-3' >
    <img className='mx-auto'
      src="https://cdn-icons-png.flaticon.com/512/15/15874.png"
      alt="phone" width={40}
    />
    <label>+54 100548000</label>
  </div>
  <div className='grid grid-cols-2 sm:grid-cols-3 mt-3' >
    <img className='mx-auto'
      src="https://cdn-icons-png.flaticon.com/512/1633/1633686.png"
      alt="email"  width={40}
    />
    <label className='col-span-2'>fulanito@gmail.com</label>
  </div>
  </div>
</div>
<p className='text-center mt-8 col-span-4'>
  Copyright © {new Date().getFullYear()} Niveados Company Todos los derechos reservados
</p>
</div>
</footer>
  )
}
