const { createApp } = Vue;

createApp({
    data() {
        return {
            clientes: [],
            loading: false,
            error: null,
            apiUrl: '/customers'
        };
    },
    methods: {
        async cargarClientes() {
            this.loading = true;
            this.error = null;
            
            try {
                const response = await fetch(this.apiUrl);
                
                if (!response.ok) {
                    throw new Error('Error al cargar los datos');
                }
                
                const data = await response.json();
                this.clientes = data;
            } catch (err) {
                this.error = 'No se pudieron cargar los clientes. Verifica que el servidor esté activo.';
                console.error('Error:', err);
            } finally {
                this.loading = false;
            }
        },
        formatearMoneda(valor) {
            return '$' + valor.toFixed(2);
        },
        formatearDescuento(valor) {
            return valor.toFixed(0) + '%';
        }
    },
    mounted() {
        this.cargarClientes();
    }
}).mount('#app');
