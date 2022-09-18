import React from 'react'

export const Footer = () => {
  return (
    <footer>
          <div>
        <div>
          <h3>About us</h3>
          <p>We are the best of henry</p>
        </div>
        <div>
          <h3>Social networks</h3>
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
              alt="facebook" width={40}
            />
           
          </div>
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              alt="Instagram" width={40}
            />
            
          </div>
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2504/2504947.png"
              alt="twiter" width={40}
            />
            
          </div>
        </div>
        <div>
          <h3>Contact information</h3>
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/20/20176.png"
              alt="ubication" width={40}
            />
            <label>Estamos ubicados en Argentina y Colombia</label>
          </div>
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/15/15874.png"
              alt="phone" width={40}
            />
            <label>+54 100548000</label>
          </div>
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1633/1633686.png"
              alt="email"  width={40}
            />
            <label>fulanito@gmail.com</label>
          </div>
        </div>
        <p>
          Copyright © {new Date().getFullYear()} Niveados Company Todos los derechos reservados
        </p>
      </div>
    </footer>
  )
}
