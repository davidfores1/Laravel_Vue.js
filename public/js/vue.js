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
                console.log(response.data);
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
            ]).then( async (result) => {
                if (result.value) {

                    datos = {
                        name: result.value[0],
                        profession: result.value[1],
                        salary: result.value[2]
                    }

                    let url = '/api/employee';
                   await axios.post(url,datos).then(response => {
                        console.log(response.data);
                        this.message = response.data;
                    });

                    this.getDatos();

                    const answers = JSON.stringify(result.value)
                    
                    toastr.success(this.message);
                }
            })
        }
    },

    mounted() {
        this.getDatos();
    }

})