var app = new Vue({
    el: '#app',
    data: {
        datos: [],
        message: ''
    },

    methods: {
        getDatos() {
            let url = '/api/employee';
            axios.get(url).then(response => {
                this.datos = response.data;
            });
        },

        nuevoDato() {

            Swal.mixin({
                confirmButtonText: 'Next →',
                showCancelButton: true,
                progressSteps: ['1', '2', '3']
            }).queue([
                {
                    title: 'Digita tu nombre',
                    text: 'Nombre y apellido',
                    input: 'text',
                    inputValidator: (value) => {
                        if (!value) {
                            return 'Debes digitar un nombre'
                        }
                    }
                },
                {
                    title: 'Selecciona profesión del empleado',
                    text: 'Profesión de este empleado',
                    input: 'select',
                    inputOptions: {
                        Auditor: 'Auditor',
                        Soporte: 'Soporte',
                        Tester: 'Desarrollador',
                        Tester: 'Tester'
                    },
                    inputPlaceholder: 'Seleccione',
                    inputValidator: (value) => {
                        if (!value) {
                            return 'Debes seleccionar una opción'
                        }
                    }
                },
                {
                    title: 'Escribe el salario del empleado',
                    text: 'Este campo acepta decimales',
                    input: 'number',
                    inputAttributes: {
                        min: 4,
                        step: 0.01
                    },
                    inputValidator: (value) => {
                        if (!value) {
                            return 'Debes escribir un salario'
                        }
                    }
                },
            ]).then(async (result) => {
                if (result.value) {

                    datos = {
                        name: result.value[0],
                        profession: result.value[1],
                        salary: result.value[2]
                    }

                    let url = '/api/employee';
                    await axios.post(url, datos).then(response => {
                        console.log(response.data);
                        this.message = response.data;
                    });

                    this.getDatos();
                    toastr.success(this.message);
                } else if (result.dismiss == Swal.DismissReason.cancel) {
                    toastr.error('Acción cancelada!');
                }
            })
        },
        eliminarDatos(dato) {
            Swal.fire({
                title: 'Eliminar el registro?',
                html: "Si eliminas el registro de <strong>" + dato.name + "</strong>, <br> ¡No podras deshacer este cambio!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Si, eliminar!'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    let url = '/api/employee/' + dato.id;
                    await axios.delete(url).then(response => {
                        console.log(response.data);
                        this.message = response.data;
                    });

                    this.getDatos();
                    toastr.success(this.message);
                    
                } else if (result.dismiss == Swal.DismissReason.cancel) {
                    toastr.error('Acción cancelada!');
                }
            })
        },
        editarDatos(dato) {
            console.log("sadasdas" + dato);

             formulario =
                '<div id="swal2-content" class="swal2-html-container" style="display: block;">Nombre y apellido</div>' +
                '<input id="name" name="name" class="swal2-input" placeholder="" type="text" style="display: flex;">' +
                '<div id="swal2-content" class="swal2-html-container" style="display: block;">Profesión de este empleado</div>' +
                '<select id="profession" name="profession" class="swal2-select" style="display: flex;"><option value="" disabled="">Seleccione</option><option value="Auditor">Auditor</option><option value="Soporte">Soporte</option><option value="Tester">Tester</option></select>' +
                '<div id="swal2-content" class="swal2-html-container" style="display: block;">Este campo acepta decimales</div>' +
                '<input id="salary" name="salary" min="4" step="0.01" class="swal2-input" placeholder="" type="number" style="display: flex;">'

            Swal.fire({
                title: 'Editar registro',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Editar',
                html: formulario,
                focusConfirm: false,
                preConfirm: async() => {

                        datosEditados = {
                        name: document.getElementById('name').value,
                        profession: document.getElementById('profession').value,
                        salary: document.getElementById('salary').value
                    }

                    let url = '/api/employee/' + dato.id;
                    await axios.put(url, datosEditados).then(response => {
                        console.log(response.data);
                        this.message = response.data;
                    });

                    this.getDatos();
                   return toastr.success(this.message);
                }
            })

            document.getElementById('name').value = dato.name;
            document.getElementById('profession').value = dato.profession;
            document.getElementById('salary').value = dato.salary;
        }
    },

    mounted() {
        this.getDatos();
    }

})