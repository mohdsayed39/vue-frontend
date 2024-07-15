// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api', // Base URL for your backend
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    getSecAccMaster() {
        return apiClient.get('/sec_acc_master');
    },
    getSecurityMaster() {
        return apiClient.get('/security_master');
    },
    getSecurityTransactions() {
        return apiClient.get('/security_transactions');
    },
    getTransactionsMappedData() {
        return apiClient.get('/transactions');
    },
    getUsers() {
        return apiClient.get('/users');
    },
    // addItem(item) {
    //     return apiClient.post('/items', item);
    // }
};
