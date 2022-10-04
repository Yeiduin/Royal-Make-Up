import React from 'react';

export const Footer = () =>{
    return(
      <footer className="w-full h-auto bg-primary py-12 mt-auto text-white text-xs mb-0">
      <div className="flex justify-between lg:justify-evenly">
        <div className="text-start px-6 space-y-2">
          <p>CONTACT US</p>
          <p>support@royalmakeup.com</p>
          <p>1-800-405-5047</p>
        </div>
        <div className="text-start px-6 space-y-2">
          <p>TERMS OF SERVICE</p>
          <p>RETURNS & EXCHANGES</p>
          <p>SHIPPING</p>
          <p>FAQs</p>
        </div>
      </div>
      <p className="pt-6 text-center">© 2022 Royal Makeup. All rights reserved.</p>
    </footer>
    );
}