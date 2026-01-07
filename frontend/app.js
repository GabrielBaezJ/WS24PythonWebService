const { createApp } = Vue;

createApp({
    data() {
        return {
            customers: [],
            loading: false,
            error: null,
            apiUrl: '/customers'
        };
    },
    methods: {
        async loadCustomers() {
            this.loading = true;
            this.error = null;
            
            try {
                const response = await fetch(this.apiUrl);
                
                if (!response.ok) {
                    throw new Error('Failed to load data');
                }
                
                const data = await response.json();
                this.customers = data;
            } catch (err) {
                this.error = 'Could not load customers. Please verify that the server is active.';
                console.error('Error:', err);
            } finally {
                this.loading = false;
            }
        },
        formatCurrency(value) {
            return '$' + value.toFixed(2);
        },
        formatDiscount(value) {
            return value.toFixed(0) + '%';
        }
    },
    mounted() {
        this.loadCustomers();
    }
}).mount('#app');
