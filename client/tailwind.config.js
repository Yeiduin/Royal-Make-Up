module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundImage:{
      'artu': "url('./src/assets/images/ArtuC.png')",
      'facu': "url('./src/assets/images/FacuC.png')",
      'fati': "url('./src/assets/images/Fati.jpg')",
      'kevin': "url('./src/assets/images/Kevin.png')",
      'lucio': "url('./src/assets/images/LucioC.png')",
      'silvi': "url('./src/assets/images/Silvi.jpg')",
      'vicky': "url('./src/assets/images/VickyC.png')",
      'yei': "url('./src/assets/images/YeiC.png')",
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
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
