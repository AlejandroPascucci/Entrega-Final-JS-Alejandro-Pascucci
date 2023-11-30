document.addEventListener('DOMContentLoaded', () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const DOMbotonComprar = document.querySelector('#boton-comprar');
    const enlaceCarrito = document.querySelector('#enlace-carrito');
    const carritoElemento = document.querySelector('#carrito1');

    // Modificación para utilizar fetch
    let productos;

    fetch("../estilos/JS/productos.json")
        .then(response => response.json())
        .then(data => {
            productos = data;
            renderizarProductos(productos);

            // Agregar el evento click al enlace del carrito
            enlaceCarrito.addEventListener('click', () => {
                // Desplazarse al elemento del carrito
                carritoElemento.scrollIntoView({ behavior: 'smooth' });
            });
        })
        .catch(error => console.error('Error al obtener los productos:', error));

    function renderizarProductos(productos) {
        productos.forEach((info) => {
            const producto = document.createElement('div');
            producto.classList.add('card', 'col-sm-4');

            const productoCardBody = document.createElement('div');
            productoCardBody.classList.add('card-body');

            const productoTitle = document.createElement('h5');
            productoTitle.classList.add('card-title');
            productoTitle.textContent = info.nombre;

            const productoImagen = document.createElement('img');
            productoImagen.classList.add('img-fluid');
            productoImagen.setAttribute('src', info.images);

            const productoPrecio = document.createElement('p');
            productoPrecio.classList.add('card-text');
            productoPrecio.textContent = `${info.precio}${divisa}`;

            const productoStock = document.createElement('p');
            productoStock.classList.add('card-text');
            productoStock.textContent = `Stock: ${info.stock}`;
            productoStock.id = `stock-${info.id}`;

            const productoBoton = document.createElement('button');
            productoBoton.classList.add('btn', 'btn-primary');
            productoBoton.textContent = 'Añadir al carrito';
            productoBoton.setAttribute('marcador', info.id); // Añadir un atributo 'marcador'
            productoBoton.addEventListener('click', añadirAlCarrito.bind(null, info));

            productoCardBody.appendChild(productoImagen);
            productoCardBody.appendChild(productoTitle);
            productoCardBody.appendChild(productoPrecio);
            productoCardBody.appendChild(productoBoton);
            productoCardBody.appendChild(productoStock);
            producto.appendChild(productoCardBody);
            DOMitems.appendChild(producto);
        });
    }

    function añadirAlCarrito(producto) {
        const idProducto = producto.id;

        if (producto && producto.stock > 0) {
            const cantidadAgregada = 1; // Agregar de a una unidad
            const stockDisponible = Math.min(cantidadAgregada, producto.stock);

            for (let i = 0; i < stockDisponible; i++) {
                carrito.push(idProducto);
                producto.stock -= 1;
            }

            guardarCarrito();
            renderizarCarrito();
            actualizarStockEnDOM(idProducto, producto.stock);
        } else {
            Swal.fire('Producto agotado');
        }
    }

    function actualizarStockEnDOM(idProducto, nuevoStock) {
        const stockElemento = document.querySelector(`#stock-${idProducto}`);

        if (stockElemento) {
            stockElemento.textContent = `Stock: ${nuevoStock}`;
        }
    }

    function renderizarCarrito() {
        DOMcarrito.textContent = '';

        const carritoSinDuplicados = [...new Set(carrito)];

        carritoSinDuplicados.forEach((item) => {
            const miItem = productos.find((itemproductos) => itemproductos.id === parseInt(item));
            const numeroUnidadesItem = carrito.filter(itemId => itemId === item).length;

            const producto = document.createElement('li');
            producto.classList.add('list-group-item', 'text-right', 'mx-2');
            producto.textContent = `${numeroUnidadesItem} x ${miItem.nombre} - ${miItem.precio}${divisa}`;

            const boton = document.createElement('button');
            boton.classList.add('btn', 'btn-outline-danger', 'mx-5');
            boton.textContent = 'Quitar';
            boton.style.marginLeft = '1rem';
            boton.dataset.item = item;
            boton.addEventListener('click', borrarItemCarrito.bind(null, miItem));

            producto.appendChild(boton);
            DOMcarrito.appendChild(producto);
        });

        DOMtotal.textContent = calcularTotal();
    }

    function borrarItemCarrito(item) {
        const itemId = item.id;

        const index = carrito.findIndex((item) => item === itemId);

        if (index !== -1) {
            carrito.splice(index, 1);
            item.stock += 1;
        }

        renderizarCarrito();
        actualizarStockEnDOM(itemId, item.stock);
        guardarCarrito();
    }

    function calcularTotal() {
        return carrito.reduce((total, item) => {
            const miItem = productos.find((itemBaseDatos) => itemBaseDatos.id === parseInt(item));
            return total + miItem.precio;
        }, 0).toFixed(2);
    }

    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function vaciarCarrito() {
        carrito.forEach(itemId => {
            const producto = productos.find(producto => producto.id === parseInt(itemId));
            producto.stock += 1; // Devolver el stock al vaciar el carrito
        });

        carrito = [];
        guardarCarrito();
        renderizarCarrito();
    }

    function comprarCarrito() {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Estás seguro de la Compra?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, quiero comprar",
            cancelButtonText: "No, cancelar compra",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                const productosAgrupados = agruparProductos(carrito);

                const listaProductos = productosAgrupados.map(item => {
                    return `${item.nombre} - ${item.cantidad} unidades - ${item.total}${divisa}`;
                });

                const precioTotal = calcularTotal();

                swalWithBootstrapButtons.fire({
                    title: "Resumen de la compra",
                    html: `
                        <p>Listado de productos:</p>
                        <ul>${listaProductos.map(item => `<li>${item}</li>`).join('')}</ul>
                        <p>Precio total: ${precioTotal}${divisa}</p>
                    `,
                    icon: "info",
                    confirmButtonText: "Confirmar compra"
                }).then((result) => {
                    if (result.isConfirmed) {
                        vaciarCarrito();
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Compra cancelada",
                    text: "Sigue viendo :)",
                    icon: "error"
                });
            }
        });
    }

    function agruparProductos(carrito) {
        return carrito.reduce((agrupados, itemId) => {
            const item = productos.find(producto => producto.id === parseInt(itemId));

            const index = agrupados.findIndex(agrupado => agrupado.id === itemId);

            if (index !== -1) {
                agrupados[index].cantidad += 1;
                agrupados[index].total += item.precio;
            } else {
                agrupados.push({
                    id: itemId,
                    nombre: item.nombre,
                    cantidad: 1,
                    total: item.precio
                });
            }

            return agrupados;
        }, []);
    }

    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    DOMbotonComprar.addEventListener('click', comprarCarrito);

    renderizarProductos();
    renderizarCarrito();
});
    
    document.addEventListener('DOMContentLoaded', () => {
    // ... (tu código existente)

    // Obtener el enlace del carrito
    const enlaceCarrito = document.querySelector('#enlace-carrito');

    // Obtener la referencia al elemento del carrito
    const carritoElemento = document.querySelector('#carrito1');

    // Agregar el evento click al enlace del carrito
    enlaceCarrito.addEventListener('click', () => {
        // Desplazarse al elemento del carrito
        carritoElemento.scrollIntoView({ behavior: 'smooth' });
    });
});

function irHaciaArriba() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}