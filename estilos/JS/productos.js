





const productos = [
    {
        id: 1,
        nombre: 'Red de 1/4"',
        precio: 10000,
        stock: 2,
        cantidad: 0,
        images: '../images/M4.jpg'
    },
    {
        id: 2,
        nombre: 'Red de 3/4"',
        precio: 12000,
        stock: 1,
        cantidad: 0,
        images: '../images/M2.jpg'
    },
    {
        id: 3,
        nombre: 'Red de 2"',
        precio: 10000,
        stock: 3,
        cantidad: 0,
        images: '../images/M3.jpg'
    },
    {
        id: 4,
        nombre: 'Funda capucha 7RIM',
        precio: 10000,
        stock: 1,
        cantidad: 0,
        images: '../images/M5.jpg'
    },
    {
        id: 5,
        nombre: 'Porta PAM lona',
        precio: 5000,
        stock: 3,
        cantidad: 0,
        images: '../images/M6.jpg'
    },
    {
        id: 6,
        nombre: 'Thali tempex',
        precio: 5000,
        stock: 1,
        cantidad: 0,
        images: '../images/M7.jpg'
    },
    {
        id: 7,
        nombre: 'thali cuero',
        precio: 4000,
        stock: 1,
        cantidad: 0,
        images: '../images/M8.jpg'
    },
    {
        id: 8,
        nombre: 'funda capucha',
        precio: 5000,
        stock: 1,
        cantidad: 0,
        images: '../images/M9.jpg'
    },
    {
        id: 9,
        nombre: 'Bendajes Alemanes',
        precio: 1800,
        stock: 5,
        cantidad: 0,
        images: '../images/R 1.jpg'
    },
    {
        id: 10,
        nombre: 'Cigarrillos US ww2',
        precio: 1500,
        stock: 4,
        cantidad: 0,
        images: '../images/R 2.jpg'
    },
    {
        id: 11,
        nombre: 'Bendaje Italiano',
        precio: 1500,
        stock: 3,
        cantidad: 0,
        images: '../images/R 3.jpg'
    },
    {
        id: 12,
        nombre: 'Cigarros US K ration',
        precio: 1000,
        stock: 6,
        cantidad: 0,
        images: '../images/R 4.jpg'
    },
    {
        id: 13,
        nombre: 'malla para casco aleman',
        precio: 9000,
        stock: 1,
        cantidad: 0,
        images: '../images/R 5.jpg'
    },
    {
        id: 14,
        nombre: 'Chinstrap M16/17 ww1',
        precio: 12000,
        stock: 3,
        cantidad: 0,
        images: '../images/R 6.jpg'
    },
    {
        id: 15,
        nombre: 'Liner m17 ww1',
        precio: 22000,
        stock: 1,
        cantidad: 0,
        images: '../images/R 7.jpg'
    },
    {
        id: 16,
        nombre: 'Sudadera m1 ww2',
        precio: 15000,
        stock: 1,
        cantidad: 0,
        images: '../images/R 8.jpg'
    },
    {
        id: 17,
        nombre: 'cajas 7,92mm vacias',
        precio: 1000,
        stock: 4,
        cantidad: 0,
        images: '../images/R23.jpg'
    },
    {
        id: 18,
        nombre: 'First Aid ww2',
        precio: 12000,
        stock: 3,
        cantidad: 0,
        images: '../images/R 10.jpg'
    },
    {
        id: 19,
        nombre: 'Sulfamida',
        precio: 10000,
        stock: 2,
        cantidad: 0,
        images: '../images/R 11.jpg'
    },
    {
        id: 20,
        nombre: 'Bendaje EA "Malvinas"',
        precio: 10000,
        stock: 5,
        cantidad: 0,
        images: '../images/R 12.jpg'
    },
    {
        id: 21,
        nombre: 'Wounded Tablets ww2',
        precio: 5000,
        stock: 4,
        cantidad: 0,
        images: '../images/R14.jpg'
    },
    {
        id: 22,
        nombre: 'K ration mid war x3',
        precio: 12000,
        stock: 1,
        cantidad: 0,
        images: '../images/R15.jpg'
    },
    {
        id: 23,
        nombre: 'K ration late war x3',
        precio: 12000,
        stock: 1,
        cantidad: 0,
        images: '../images/R16.jpg'
    },
    {
        id: 24,
        nombre: 'Cigarrillos Alemanes',
        precio: 1500,
        stock: 5,
        cantidad: 0,
        images: '../images/R17.jpg'
    },
    {
        id: 25,
        nombre: 'Chinstrap US early',
        precio: 12000,
        stock: 1,
        cantidad: 0,
        images: '../images/R18.jpg'
    },
    {
        id: 26,
        nombre: 'Chinstrap M1 mid war',
        precio: 12000,
        stock: 10,
        cantidad: 0,
        images: '../images/R19.jpg'
    },
    {
        id: 27,
        nombre: 'Chinstrap M17 Austriaco',
        precio: 12000,
        stock: 1,
        cantidad: 0,
        images: '../images/R20.jpg'
    },
    {
        id: 28,
        nombre: 'Chinstrap Adrian m15/26',
        precio: 12000,
        stock: 2,
        cantidad: 0,
        images: '../images/R21.jpg'
    },
    {
        id: 29,
        nombre: 'Chinstrap Suizo M38',
        precio: 15000,
        stock: 1,
        cantidad: 0,
        images: '../images/R22.jpg'
    },
    {
        id: 30,
        nombre: 'Liner Frances m15/26',
        precio: 22000,
        stock: 1,
        cantidad: 0,
        images: '../images/R24.jpg'
    },
    {
        id: 31,
        nombre: 'Liner M31',
        precio: 24000,
        stock: 1,
        cantidad: 0,
        images: '../images/R25.jpg'
    }

    
];




localStorage.setItem('productos', JSON.stringify(productos));

const productosGuardados = JSON.parse(localStorage.getItem('productos'));

console.log(productosGuardados);
