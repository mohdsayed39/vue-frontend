<template>
    <div>
        <div class="flex justify-between items-center mb-4">
            <div>
                <label for="search" class="mr-2">Search:</label>
                <input id="search" v-model="searchQuery" type="text" placeholder="Search from the table..."
                    class="px-2 py-1 border rounded" />
            </div>
            <div>
                <label for="itemsPerPage" class="mr-2">Items per page:</label>
                <select id="itemsPerPage" v-model="itemsPerPage" class="px-2 py-1 border rounded">
                    <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
                        {{ option }}
                    </option>
                </select>
            </div>
        </div>
        <div v-if="isLoading" class="text-center my-8">
            Loading...
        </div>
        <div v-else>
            <div class="table-responsive">
                <table class="table table-hover table-striped table-bordered table-sm">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('rec_id')">
                                <div class="flex items-center">
                                    Record ID
                                    <i :class="sortIcon('rec_id')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('sam_id')">
                                <div class="flex items-center">
                                    SAM ID
                                    <i :class="sortIcon('sam_id')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('customer_number')">
                                <div class="flex items-center">
                                    Customer Number
                                    <i :class="sortIcon('customer_number')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('reference_currency')">
                                <div class="flex items-center">
                                    Reference Currency
                                    <i :class="sortIcon('reference_currency')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('account_name')">
                                <div class="flex items-center">
                                    Account Name
                                    <i :class="sortIcon('account_name')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('account_officer')">
                                <div class="flex items-center">
                                    Account Officer
                                    <i :class="sortIcon('account_officer')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('valuation_currency')">
                                <div class="flex items-center">
                                    Valuation Currency
                                    <i :class="sortIcon('valuation_currency')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('managed_account')">
                                <div class="flex items-center">
                                    Managed Account
                                    <i :class="sortIcon('managed_account')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('start_date')">
                                <div class="flex items-center">
                                    Start Date
                                    <i :class="sortIcon('start_date')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('dealer_book')">
                                <div class="flex items-center">
                                    Dealer Book
                                    <i :class="sortIcon('dealer_book')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('clean_book_cost')">
                                <div class="flex items-center">
                                    Clean Book Cost
                                    <i :class="sortIcon('clean_book_cost')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('portfolio_type')">
                                <div class="flex items-center">
                                    Portfolio Type
                                    <i :class="sortIcon('portfolio_type')" class="ml-1"></i>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in paginatedItems" :key="index" class="border-b border-gray-200">
                            <td class="px-4 py-2 text-xs">{{ item.rec_id }}</td>
                            <td class="px-4 py-2 text-xs">
                                <template v-if="item.sam_id">{{ item.sam_id }}</template>
                                <template v-else> --- </template>
                            </td>
                            <td class="px-4 py-2 text-xs">{{ item.customer_number }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.reference_currency }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.account_name }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.account_officer }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.valuation_currency }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.managed_account }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.start_date }}</td>
                            <td class="px-4 py-2 text-xs">
                                <template v-if="item.dealer_book">{{ item.dealer_book }}</template>
                                <template v-else> --- </template>
                            </td>
                            <td class="px-4 py-2 text-xs">
                                <template v-if="item.clean_book_cost">{{ item.clean_book_cost }}</template>
                                <template v-else> --- </template>
                            </td>
                            <td class="px-4 py-2 text-xs">
                                <template v-if="item.portfolio_type">{{ item.portfolio_type }}</template>
                                <template v-else> --- </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex justify-end mt-4">
                <button @click="prevPage" :disabled="currentPage === 1"
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded mr-2">
                    Previous
                </button>
                <button @click="nextPage" :disabled="currentPage === totalPages"
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/services/api';

export default {
    name: 'Dashboard',
    data() {
        return {
            secAccMaster: [],
            isLoading: false,
            searchQuery: '',
            currentPage: 1,
            itemsPerPage: 5, // Default number of items per page
            itemsPerPageOptions: [5, 10, 20, 50], // Options for items per page
            sortByColumn: '', // Column to sort by
            sortDirection: 'asc', // Initial sort direction
        };
    },
    computed: {
        paginatedItems() {
            const search = this.searchQuery.toLowerCase();
            const filteredItems = this.secAccMaster.filter(item =>
                Object.values(item).some(value =>
                    value ? value.toString().toLowerCase().includes(search) : false
                )
            );
            const sortedItems = this.sortData(filteredItems);
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return sortedItems.slice(startIndex, endIndex);
        },
        totalPages() {
            const search = this.searchQuery.toLowerCase();
            const filteredItems = this.secAccMaster.filter(item =>
                Object.values(item).some(value =>
                    value ? value.toString().toLowerCase().includes(search) : false
                )
            );
            return Math.ceil(filteredItems.length / this.itemsPerPage);
        },
    },
    async created() {
        this.fetchItems();
    },
    methods: {
        async fetchItems() {
            try {
                this.isLoading = true;
                const response = await api.getSecAccMaster();
                this.secAccMaster = response.data;
                this.isLoading = false;
            } catch (error) {
                console.error('Error fetching items:', error);
                this.isLoading = false;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        sortData(data) {
            const sortedData = data.slice().sort((a, b) => {
                const fieldA = a[this.sortByColumn];
                const fieldB = b[this.sortByColumn];
                let comparison = 0;
                if (fieldA > fieldB) {
                    comparison = 1;
                } else if (fieldA < fieldB) {
                    comparison = -1;
                }
                return this.sortDirection === 'desc' ? comparison * -1 : comparison;
            });
            return sortedData;
        },
        sortBy(key) {
            if (this.sortByColumn === key) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortByColumn = key;
                this.sortDirection = 'asc';
            }
        },
        sortIcon(column) {
            if (this.sortByColumn === column) {
                return this.sortDirection === 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom';
            }
            return '';
        },
    },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
