var intervalo = {
    valorMinimo: 3,
    valorMaximo: 7,
    get valoresContenidos() {
      var contenidos = [];
      for(var i=this.valorMinimo; i<=this.valorMaximo; i++) {
        contenidos.push(i);
      }
      return contenidos;
    },
    set valoresContenidos(arrayValores) {
      arrayValores.sort();
      this.valorMinimo = arrayValores[0];
      this.valorMaximo = arrayValores[arrayValores.length - 1];
    }
  }

  intervalo.valorMaximo = 22;

  console.log(intervalo)