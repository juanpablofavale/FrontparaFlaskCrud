const { createApp } = Vue

createApp({
    data() {
        return {
            Producto: {
                id: "",
                nombre: "",
                tamanio: "",
                precio: "",
                hoja: "",
                plato: "1",
                subtipo: "1"
            },
            Plato: {
                id: "",
                nombre: ""
            },
            Subtipo: {
                id: "",
                nombre: ""
            },
            Usuario: {
                user: "",
                password: "",
                activo: ""
            },
            message: 'Lista de Precios',
            productos: [],
            subtipos: [],
            platos: [],
            usuarios: [],
            logueado: sessionStorage.getItem('logueado')
        }
    },
    methods: {
        leerUsuarios() {
            fetch('http://localhost:5000/usuarios')
                .then(res => res.json())
                .then(data => {
                    this.usuarios = data
                })
        },
        leerProductos() {
            fetch('http://localhost:5000/productos')
                .then(res => res.json())
                .then(data => {
                    this.productos = data
                })
        },
        leerPlatos() {
            fetch('http://localhost:5000/platos')
                .then(res => res.json())
                .then(data => {
                    this.platos = data
                })
        },
        leerSubtipos() {
            fetch('http://localhost:5000/subtipos')
                .then(res => res.json())
                .then(data => {
                    this.subtipos = data
                })
        },
        nuevoProducto() {
            opciones = {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.Producto)
            }
            fetch('http://localhost:5000/productos', opciones)
                .then(res => res.json())
                .then(data => {
                    this.limpiarCampos()
                })
        },
        nuevoPlato() {
            opciones = {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.Plato)
            }
            fetch('http://localhost:5000/platos', opciones)
                .then(res => res.json())
                .then(data => {
                    this.limpiarCampos()
                })
        },
        nuevoSubtipo() {
            opciones = {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.Subtipo)
            }
            fetch('http://localhost:5000/subtipos', opciones)
                .then(res => res.json())
                .then(data => {
                    this.limpiarCampos()
                })
        },
        eliminarProducto(id) {
            opciones = {
                method: 'DELETE', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            fetch('http://localhost:5000/productos/' + id, opciones)
                .then(res => res.json())
                .then(data => {
                    this.limpiarCampos()
                })
        },
        eliminarPlato(id) {
            opciones = {
                method: 'DELETE', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            fetch('http://localhost:5000/platos/' + id, opciones)
                .then(res => res.json())
                .then(data => {
                    this.limpiarCampos()
                })
        },
        eliminarSubtipo(id) {
            opciones = {
                method: 'DELETE', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            fetch('http://localhost:5000/subtipos/' + id, opciones)
                .then(res => res.json())
                .then(data => {
                    this.limpiarCampos()
                })
        },
        modificarProducto(id) {
            opciones = {
                method: 'PUT', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.Producto)
            }
            fetch('http://localhost:5000/productos/' + id, opciones)
                .then(res => res.json())
                .then(data => {
                    this.limpiarCampos()
                })
        },
        modificarPlato(id) {
            opciones = {
                method: 'PUT', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.Plato)
            }
            fetch('http://localhost:5000/platos/' + id, opciones)
                .then(res => res.json())
                .then(data => {
                    this.limpiarCampos()
                })
        },
        modificarSubtipo(id) {
            opciones = {
                method: 'PUT', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.Subtipo)
            }
            fetch('http://localhost:5000/subtipos/' + id, opciones)
                .then(res => res.json())
                .then(data => {
                    this.limpiarCampos()
                })
        },
        inicioSesion() {
            fetch('http://localhost:5000/usuarios/' + this.Usuario.user)
                .then(res => res.json())
                .then(data => {
                    if (data.user == this.Usuario.user && data.password == this.Usuario.password) {
                        if (data.activo != 0) {
                            this.logueado = data.user
                            sessionStorage.setItem('logueado', data.user)
                            this.limpiarCampos()
                        } else {
                            alert("Usuario no esta activo aun. Comuniquese con administracion.")
                        }
                    } else {
                        alert("Usuario o contraseña incorrecto.")
                    }
                })
        },
        agregarUsuario(usr) {
            if (usr.activo == true) {
                usr.activo = 1
            } else {
                usr.activo = 0
            }
            fetch('http://localhost:5000/usuarios/' + usr.user)
                .then(res => res.json())
                .then(data => {
                    if (data.user != undefined) {
                        opciones = {
                            method: 'PUT', headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(this.Usuario)
                        }
                        url = 'http://localhost:5000/usuarios/' + data.user
                    } else {
                        opciones = {
                            method: 'POST', headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(this.Usuario)
                        }
                        url = 'http://localhost:5000/usuarios'
                    }
                    fetch(url, opciones)
                    .then(res => res.json())
                    .then(data => {
                        this.limpiarCampos()
                    })
                })
        },
        cargarCampos(p) {
            this.Producto.id = p.id,
                this.Producto.nombre = p.nombre,
                this.Producto.tamanio = p.tamanio,
                this.Producto.precio = p.precio,
                this.Producto.hoja = p.hoja,
                this.Producto.plato = p.plato,
                this.Producto.subtipo = p.subtipo
            this.Subtipo.id = p.id
            this.Subtipo.nombre = p.nombre
            this.Plato.id = p.id
            this.Plato.nombre = p.nombre
            this.Usuario.user = p.user
            this.Usuario.password = p.password
            this.Usuario.activo = p.activo==1 ? true : false
        },
        eliminarUsuario(usr){
            opciones = {
                method: 'DELETE', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            fetch('http://localhost:5000/usuarios/' + usr, opciones)
                .then(res => res.json())
                .then(data => {
                    this.limpiarCampos()
                })
        },
        cerrarSesion() {
            sessionStorage.removeItem('logueado')
            this.logueado = sessionStorage.getItem('logueado')
            this.limpiarCampos()
        },
        limpiarCampos() {
            this.Producto.id = ""
            this.Producto.nombre = ""
            this.Producto.tamanio = ""
            this.Producto.precio = ""
            this.Producto.hoja = ""
            this.Producto.plato = "1"
            this.Producto.subtipo = "1"
            this.Plato.id = ""
            this.Plato.nombre = ""
            this.Subtipo.id = ""
            this.Subtipo.nombre = ""
            this.Usuario.user = ""
            this.Usuario.password = ""
            this.leerProductos()
            this.leerSubtipos()
            this.leerPlatos()
            this.leerUsuarios()
        }
    },
    created() {
        this.leerProductos()
        this.leerSubtipos()
        this.leerPlatos()
        this.leerUsuarios()
    }
}).mount('#app')