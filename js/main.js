//Declaración de variables globales
var nombreUsuario = "";
var saldoCuenta = 10000;
var limiteExtraccion = 3000;
var saldoAnterior = 0;
var cuentaAmiga1 = "12345"
var cuentaAmiga2 = "67890"
var claveUsuario= 1234
var contadorIntentosClave= 3

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function(){
  iniciarSesion()
};

// funcion de inicio de secion en home banking
function iniciarSesion() {
  nombreUsuario = prompt("Ingrese su nombre de usuario")
  let pedirClaveUsuario = parseInt(prompt("Ingrese su clave numerica para operar"))
    if(validacionInputNum(pedirClaveUsuario)){
      if(pedirClaveUsuario == claveUsuario){
        cargarNombreEnPantalla();
        actualizarSaldoEnPantalla();
        actualizarLimiteEnPantalla();
      }
        else if(confirm("la clave ingresada es incorecta \nReintente la operacion")){
        iniciarSesion()
        } 
          else{
            alert("Saldo retenido\n contacte con soporte para recuperar su cuenta")
            saldoCuenta=NaN
            return false
          }
    }
}

//Funciones que operan sobre la cuenta,eventos de click en html
function extraerDinero() {
  let extraccion = parseInt(
    prompt("Ingrese el monto que a extraer de la cuenta"));
    
  if (validacionInputNum(extraccion)) {
    if(validacionExtraccion(extraccion)){
      restarSaldo(extraccion)
      actualizarSaldoEnPantalla()
      msjMovimietosCuenta("extraccion");
    }
  } 
}

function depositarDinero() {
  let deposito = parseInt(prompt("Ingrese el monto a depositar en la cuenta"));

  if (validacionInputNum(deposito)) {
    sumarSaldo(deposito)
    actualizarSaldoEnPantalla();
    msjMovimietosCuenta("deposito");
  }
}

function pagarServicio() {
  let internet = 1500
  let agua = 900
  let gas = 560
  let luz = 780
  let telefono = 960
  let opcionSevicio=parseInt(prompt("Ingrese la opcion correspondiente al servicio que desea pagar"
                                +"\n1 Internet: $"+ internet
                                +"\n2 Agua: $" + agua
                                +"\n3 Gas: $" + gas
                                +"\n4 Luz: $" + luz
                                +"\n5 Telefono: $" + telefono
                                ))
  if(validacionInputNum(opcionSevicio)){
    
    switch(opcionSevicio){
      case 1:validaPagoServicio(internet,"Internet");
      break

      case 2:validaPagoServicio(agua,"Agua");
      break

      case 3:validaPagoServicio(gas,"Gas");
      break

      case 4:validaPagoServicio(luz,"Luz");
      break

      case 5:validaPagoServicio(telefono,"Telefono");
      break

      default:alert("Ingresaste una opcion no valida, por favor intenta nuevamente")
    }   
  }
}

function transferirDinero() {

  let montroTrasnsferencia = parseInt(prompt("Ingrese el monto que desea trasferir"))
    if(validacionInputNum(montroTrasnsferencia)){
      if(validarSaldoCuenta(montroTrasnsferencia)){
        let ingrsoCuenta = prompt("Ingrese el numero de la cuenta amigas a la que desea transferir el dinero")
        validarCunetaIngresada(ingrsoCuenta,montroTrasnsferencia)
      }

    }
}

function cambiarLimiteDeExtraccion() {
  let nuevoLimite = parseInt(prompt("Ingresa el un nuevo limite de extraccion"
                                    +"\n Monto minimo: $1.000\n Monto maximo: $10.000"))

  if(validacionInputNum(nuevoLimite)){
    if(nuevoLimite<1000 || nuevoLimite>10000){
      alert("No puedes ingresar un nuevo limete de extracion menor a $1.000\n ni mayor a $10.000")
    } else {
      limiteExtraccion=nuevoLimite
      actualizarLimiteEnPantalla()
      alert("La operacion se realizo con exito"
      +"\n Tu nuevo limite de extracion es : $" + limiteExtraccion)
      }
  }
  
}

// funciones complementarias para el funcionamieto y validacion de las operaciones
function sumarSaldo(ingreso){//suma saldo en la cuenta y guarda valor de saldoAnteriror
  saldoAnterior = saldoCuenta
  saldoCuenta+=ingreso
}

function restarSaldo(egreso){//resta saldo en la cuenta y guarda valor de saldoAnteriror
  saldoAnterior = saldoCuenta
  saldoCuenta-=egreso
}

function validacionInputNum(dato){//valida los datos de entra prompt
  if (isNaN(dato) || dato <= 0) {
    alert(
      "Ingresaste un dato no valido o no completaste el campo\n Por favor intente nuevame"
    );
  } else {
    return true;
  }
}

function validacionExtraccion(monto){//valida el monto de extraccion de dinero
  if(monto > limiteExtraccion){
    alert("Operacion denegada:\nEl monto que desea retirar es superior a su limite de extracción")
  }   else if(monto > saldoCuenta){
           alert("Operacion denegada:\nEl monto que desea retirar es superior al saldo de su cuenta")
      } else if(monto % 100 != 0){
              alert("Operacion denegada:\nSolo puede retirar montos que sean multiplos de $100")
        } else{
          return true
          }
}

function validaPagoServicio(montoServicio,servicio){//valida y realiza el pago de servicios
  if(validarSaldoCuenta(montoServicio)){
      restarSaldo(montoServicio)
      actualizarSaldoEnPantalla()
      msjMovimietosCuenta("pago del servicio "+servicio)
  }
}

function validarSaldoCuenta(montoADescontar){ //valida que el monto a descontar sea menor al saldo de la cuenta
  if(montoADescontar > saldoCuenta){
    alert("Operacion Denegada:\n No cuenta con saldo sufiente para esta transaccion")
  } else{
    return true
  }
}

function validarCunetaIngresada(cuenta,montoT){ // valida que la cuenta ingresa sea correcta y realisa la trasferencia
  if(cuenta == cuentaAmiga1 || cuenta == cuentaAmiga2){
    restarSaldo(montoT)
    actualizarSaldoEnPantalla()
    msjMovimietosCuenta("trasnferencia")
  } else{
    alert("Operacion denegada:"
          +"\nLa cuenta ingresada no coresponde a ningua de sus cuentas Amigas"
          +"\nPor favor verifique el numero de cuenta")
  }
}

function msjMovimietosCuenta(movimiento) {//Msj generico de confirmacion de movimientos
  alert(
    "El " +
      movimiento +
      " se realizo de forma exitosa" +
      "\n" +
      "\nTu saldo anterior es: $" +
      saldoAnterior +
      "\nTu nuevo saldo es: $" +
      saldoCuenta
  );
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
  document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
  document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
  document.getElementById("limite-extraccion").innerHTML =
    "Tu límite de extracción es: $" + limiteExtraccion;
}
