module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      backgroundImage:{
        'artu': "url('https://res.cloudinary.com/dpkrrtsdg/image/upload/v1665003568/Niveados/ArtuC_blptg8.png')",
        'facu': "url('https://res.cloudinary.com/dpkrrtsdg/image/upload/v1665003568/Niveados/FacuC_obpegp.png')",
        'fati': "url('https://res.cloudinary.com/dpkrrtsdg/image/upload/v1665003568/Niveados/Fati_y8z0ce.jpg')",
        'kevin': "url('https://res.cloudinary.com/dpkrrtsdg/image/upload/v1665003568/Niveados/Kevin_wbwm3f.png')",
        'lucio': "url('https://res.cloudinary.com/dpkrrtsdg/image/upload/v1665003568/Niveados/LucioC_hyjxb9.png')",
        'silvi': "url('https://res.cloudinary.com/dpkrrtsdg/image/upload/v1665003568/Niveados/Silvi_rzkbkn.jpg')",
        'vicky': "url('https://res.cloudinary.com/dpkrrtsdg/image/upload/v1665003569/Niveados/VickyC_fr79iz.png')",
        'yei': "url('https://res.cloudinary.com/dpkrrtsdg/image/upload/v1665003569/Niveados/YeiC_nfhyig.png')",
        'logo': "url('./src/assets/images/logo.png')"
      },
      colors:{
        primary: '#556353',
        secondary: '#FBA744',
        tertiary: '#F6F5EC',
      },
      fontFamily:{
        sans: ['Poppins'],
        serif:['Marcellus SC'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
