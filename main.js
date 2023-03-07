const { createApp } = Vue

createApp({
    data() {
        return {
            url:'https://juanpablofavale.pythonanywhere.com',
            Producto: {
                id: "",
                nombre: "",
                plato: "",
                precio: 0,
                subtipo: 0,
                tamanio: 0,
            },
            Plato: {
                id: "",
                nombre: "",
            },
            Subtipo: {
                id: "",
                nombre: "",
                hoja:0,
            },
            Usuario: {
                user: "",
                password: "",
                activo: "", 
                modif: 0,
            },
            message: 'Lista de Precios',
            hojas:0,
            productos: [],
            subtipos: [],
            platos: [],
            usuarios: [],
            hojas:0,
            logueado: sessionStorage.getItem('logueado'),
        }
    },
    methods: {
        leerUsuarios() {
            fetch(this.url + '/usuarios')
                .then(res => res.json())
                .then(data => {
                    this.usuarios = data
                })
        },
        leerProductos() {
            fetch(this.url + '/productos')
                .then(res => res.json())
                .then(data => {
                    this.productos = data
                })
        },
        leerPlatos() {
            fetch(this.url + '/platos')
                .then(res => res.json())
                .then(data => {
                    this.platos = data
                })
        },
        leerSubtipos() {
            fetch(this.url + '/subtipos')
                .then(res => res.json())
                .then(data => {
                    this.subtipos = data
                    this.cantidadHojas()
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
            fetch(this.url + '/productos', opciones)
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
            fetch(this.url + '/platos', opciones)
                .then(res => res.json())
                .then(data => {
                    this.limpiarCampos()
                })
        },
        nuevoSubtipo() {
            console.table(this.Subtipo)
            opciones = {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.Subtipo)
            }
            fetch(this.url + '/subtipos', opciones)
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
            fetch(this.url + '/productos/' + id, opciones)
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
            fetch(this.url + '/platos/' + id, opciones)
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
            fetch(this.url + '/subtipos/' + id, opciones)
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
            fetch(this.url + '/productos/' + id, opciones)
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
            fetch(this.url + '/platos/' + id, opciones)
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
            fetch(this.url + '/subtipos/' + id, opciones)
                .then(res => res.json())
                .then(data => {
                    this.limpiarCampos()
                })
        },
        inicioSesion() {
            fetch(this.url + '/usuarios/' + this.Usuario.user)
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
            fetch(this.url + '/usuarios/' + usr.user)
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
                        url = this.url + '/usuarios/' + data.user
                    } else {
                        opciones = {
                            method: 'POST', headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(this.Usuario)
                        }
                        url = this.url + '/usuarios'
                    }
                    fetch(url, opciones)
                    .then(res => res.json())
                    .then(data => {
                        this.limpiarCampos()
                    })
                })
        },
        cargarCampos(p) {
            this.Producto.id = p.id
            this.Producto.nombre = p.nombre
            this.Producto.tamanio = p.tamanio
            this.Producto.precio = p.precio
            this.Producto.plato = p.plato
            this.Producto.subtipo = p.subtipo
            this.Subtipo.id = p.id
            this.Subtipo.nombre = p.nombre
            this.Subtipo.hoja = p.hoja
            this.Plato.id = p.id
            this.Plato.nombre = p.nombre
            this.Usuario.user = p.user
            this.Usuario.password = p.password
            this.Usuario.activo = p.activo==1 ? true : false
            this.Usuario.modif = 1
        },
        eliminarUsuario(usr){
            opciones = {
                method: 'DELETE', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            fetch(this.url + '/usuarios/' + usr, opciones)
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
            this.Producto.plato = "1"
            this.Producto.subtipo = "1"
            this.Plato.id = ""
            this.Plato.nombre = ""
            this.Subtipo.id = ""
            this.Subtipo.nombre = ""
            this.Subtipo.hoja = ""
            this.Usuario.user = ""
            this.Usuario.password = ""
            this.Usuario.modif = 0
            this.leerProductos()
            this.leerSubtipos()
            this.leerPlatos()
            this.leerUsuarios()
        },
        cantidadHojas(){
            for(s of this.subtipos){
                if(this.hojas<s.hoja){
                    this.hojas=s.hoja
                }
            }
        }
    },
    created() {
        this.leerProductos()
        this.leerSubtipos()
        this.leerPlatos()
        this.leerUsuarios()
    }
}).mount('#app')