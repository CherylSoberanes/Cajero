//arreglo de cuentas, nombre, saldo y contraseña
let cuentas = [
    {nombre:"Cheryl Soberanes", saldo: 250, password: '123'},
    {nombre: "Paloma Chiapa", saldo: 300, password: '456'},
    {nombre: "Dulcine Dubaz", saldo: 190, password:'789'}
];

//variable globales donde se almacenará información del usuario y saldo
let nombre, SaldoInicial, SaldoActual;

//obtiene elementos del DOM por ID
let consultar = document.getElementById('btnConsult');
let depositar = document.getElementById('btnDeposit');
let boton = document.getElementById ('BtnLogin');

//Agrega eventos a los botones si existen
if (boton) boton.addEventListener('click', login); //evento inicio de sesion
if (!boton) nomUsuario(); //llama a nomUsuaio si el botón no existe
if (consultar) consultar.addEventListener('click', ConsultarSaldo); //evento consulta
if (depositar) depositar.addEventListener('click', depositarCantidad);

//funcion que redirige a la pagina del cajero
function mostrarCajero(){
    location.href = 'cajero.html';
}

function goToStart(){
    location.href= 'index.html';
}

//funciones para vaciar contenido de elementos html
function vaciarSaldo(){
    document.getElementById('saldo').innerHTML=('');
}

function vaciarInputDepositar(){
    document.getElementById('Deposito').value = ('');
}

function vaciarInputRetirar(){
    document.getElementById('withdraw').value = ('');
}

function vaciarTransaccion() {
    document.getElementById('transaccion').innerHTML=('');
    document.getElementById('nuevoSaldo').innerHTML=('');
}

function vaciarAlertas(){
    document.getElementById('alerta').innerHTML=('');
    document.getElementById('alertaSaldo').innerHTML=('');
    document.getElementById('alertaTransaccion').innerHTML=('');
}

function vaciarAlerta2y3(){
    document.getElementById('alertaSaldo').innerHTML=('')
    document.getElementById('alertaTransaccion').innerHTML=('');
}

function vaciarSaldoAlertaTransaccion(){
    vaciarAlerta2y3();
    vaciarSaldo();
    vaciarTransaccion();
}

//Funcion para el Inicio de Sesion

function login() {
    const usuario = document.getElementById('user').value;
    const contraseña = document.getElementById('password').value;

    // Itera sobre las cuentas para verificar credenciales
    for (let i = 0; i < cuentas.length; i++) {
        if(usuario == cuentas[i].nombre && contraseña == cuentas[i].password){
            // Si las credenciales son correctas, redirige a la página del cajero y almacena información
            mostrarCajero();
            nombre = usuario;
            localStorage.setItem('saludo', nombre);
            SaldoInicial = cuentas[i].saldo;
            localStorage.setItem('saldo', SaldoInicial);
        } else {
            // Si las credenciales son incorrectas, muestra un mensaje de error
            document.getElementById('alerta').innerHTML = ('Usuario o contraseña incorrectoss');
        }
    } 
}

// Obtiene el saldo actual del localStorage
SaldoActual = localStorage.getItem('saldo');

// Función para mostrar el nombre del usuario almacenado en el localStorage
function nomUsuario() {
    let nombreUsuario = localStorage.getItem('saludo');
    document.getElementById('saludo').innerHTML = ('Bienvenido/a ' + nombreUsuario);
}

//funcion para consultar el saldo actual

function ConsultarSaldo(){
    document.getElementById('saldo').innerHTML = ("saldo: $" + SaldoActual);
    vaciarInputDepositar();
    vaciarInputRetirar();
    vaciarAlertas();
    vaciarTransaccion();
}

//function para depositar dinero en la cuenta
function depositarCantidad(){
    let cantidad = document.getElementById("Deposito").value;
    let Deposit = parseFloat(cantidad);
    let saldoMasDeposito = Deposit + parseFloat(SaldoActual);

    vaciarInputRetirar();

    if (cantidad === ''){
        document.getElementById('alerta').innerHTML = ('Escriba el monto a depositar');
        vaciarSaldoAlertaTransaccion();
    } else if (Deposit <= 0){
        document.getElementById('alerta').innerHTML = ('ingrese una cantidad válida');
        vaciarSaldo();
        vaciarTransaccion();
    } else if (saldoMasDeposito > 990){
        document.getElementById('alerta').innerHTML=('No puede tener más de $990');
        document.getElementById('alertaSaldo').innerHTML=('Saldo actual: $' + SaldoActual);
        document.getElementById('alertaTransaccion').innerHTML = ('Error en la transacción: depósito de $'+ Deposit);
        vaciarInputDepositar();
        vaciarSaldo();
        vaciarTransaccion();
    } else {
        vaciarAlertas();
        SaldoActual = saldoMasDeposito;
        document.getElementById('transaccion').innerHTML = ("Depósito de: $" + Deposit);
        document.getElementById('nuevoSaldo').innerHTML = ("Saldo actual: $" + SaldoActual);
        vaciarInputDepositar();
        vaciarSaldo();
    }
}

// funcion para retirar dinero

function retirarCantidad(){
    let cantidad = document.getElementById('withdraw').value;
    let retiro = parseFloat(cantidad);
    let saldoMenosRetiro = SaldoActual - retiro;


vaciarInputDepositar();
if (cantidad === ""){
    document.getElementById('alerta').innerHTML =('Escriba el monto a retirar');
    vaciarSaldoAlertaTransaccion();
} else if (retiro <=0){
    vaciarSaldoAlertaTransaccion();
    document.getElementById('alerta').innerHTML = ('Ingrese una cantidad válida');
} else if (SaldoActual < retiro){
    document.getElementById('alerta').innerHTML=('No cuenta con esa cantidad')
    vaciarSaldoAlertaTransaccion();
}else if (saldoMenosRetiro < 10){
    vaciarInputRetirar();
    document.getElementById('alerta').innerHTML = ('No puede tener menos de $10 en cuenta' );
    document.getElementById('alertaSaldo').innerHTML = ('Saldo actual: $' + SaldoActual);
    document.getElementById('alertaTransaccion').innerHTML = ('Error en la transaccion retiro de: $' + retiro);
    vaciarSaldo();
    vaciarTransaccion();
} else {
    vaciarInputRetirar();
    SaldoActual = saldoMenosRetiro;
    document.getElementById('transaccion').innerHTML = ('Retiro de: $' + retiro);
    document.getElementById('nuevoSaldo').innerHTML = ("Saldo actual: $" + SaldoActual);
    vaciarAlertas();
    vaciarSaldo();
}
}


