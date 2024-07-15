<template>
    <div>
        <div class="flex justify-between items-center mb-4">
            <div>
                <label for="search" class="mr-2">Search by Record ID:</label>
                <input 
                    id="search" 
                    v-model="searchQuery" 
                    type="text" 
                    placeholder="Enter Record ID" 
                    class="px-2 py-1 border rounded"
                />
            </div>
        </div>
        <div v-if="isLoading" class="text-center my-8">
            Loading...
        </div>
        <div v-else>
            <div class="overflow-x-auto">
                <table class="table-auto min-w-full border-collapse border border-gray-200">
                    <caption class="text-lg font-bold mb-4">Security Account Master Information</caption>
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('rec_id')">Record ID</button>
                                <span v-if="sortByColumn === 'rec_id'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('sam_id')">SAM ID</button>
                                <span v-if="sortByColumn === 'sam_id'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('customer_number')">Customer Number</button>
                                <span v-if="sortByColumn === 'customer_number'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('reference_currency')">Reference Currency</button>
                                <span v-if="sortByColumn === 'reference_currency'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('account_name')">Account Name</button>
                                <span v-if="sortByColumn === 'account_name'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('account_officer')">Account Officer</button>
                                <span v-if="sortByColumn === 'account_officer'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('valuation_currency')">Valuation Currency</button>
                                <span v-if="sortByColumn === 'valuation_currency'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('managed_account')">Managed Account</button>
                                <span v-if="sortByColumn === 'managed_account'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('start_date')">Start Date</button>
                                <span v-if="sortByColumn === 'start_date'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('dealer_book')">Dealer Book</button>
                                <span v-if="sortByColumn === 'dealer_book'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('clean_book_cost')">Clean Book Cost</button>
                                <span v-if="sortByColumn === 'clean_book_cost'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('portfolio_type')">Portfolio Type</button>
                                <span v-if="sortByColumn === 'portfolio_type'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in paginatedItems" :key="index" class="border-b border-gray-200">
                            <td class="px-4 py-2 text-xs">{{ item.rec_id }}</td>
                            <td class="px-4 py-2 text-xs">
                                <template v-if="item.sam_id">
                                    {{ item.sam_id }}
                                </template>
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
                                <template v-if="item.dealer_book">
                                    {{ item.dealer_book }}
                                </template>
                                <template v-else> --- </template>
                            </td>
                            <td class="px-4 py-2 text-xs">
                                <template v-if="item.clean_book_cost">
                                    {{ item.clean_book_cost }}
                                </template>
                                <template v-else> --- </template>
                            </td>
                            <td class="px-4 py-2 text-xs">
                                <template v-if="item.portfolio_type">
                                    {{ item.portfolio_type }}
                                </template>
                                <template v-else> --- </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Pagination Controls -->
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
            itemsPerPage: 10, // Number of items per page
            sortByColumn: '', // Column to sort by
            sortDirection: 'asc', // Initial sort direction
        };
    },
    computed: {
        paginatedItems() {
            const filteredItems = this.secAccMaster.filter(item => 
                item.rec_id.toString().includes(this.searchQuery)
            );
            const sortedItems = this.sortData(filteredItems);
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return sortedItems.slice(startIndex, endIndex);
        },
        totalPages() {
            const filteredItems = this.secAccMaster.filter(item => 
                item.rec_id.toString().includes(this.searchQuery)
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
        sortBy(column) {
            if (column === this.sortByColumn) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortByColumn = column;
                this.sortDirection = 'asc';
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
    },
};
</script>

<style scoped>
/* Tailwind styles are directly applied in the template */
</style>