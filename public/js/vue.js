var app = new Vue({
    el: '#app',
    data: {
      datos:[],  
      message: 'hola'
    },

    methods:{
        getDatos(){
            let url = '/api/employee';
            axios.get(url).then(response=>{
                console.log(response.data);
                this.datos = response.data;
            });
        }
    },

    mounted(){
        this.getDatos();
    }

  })