<template>
    <div>
        <div class="flex justify-between items-center mb-4">
            <div>
                <label for="search" class="mr-2">Search by YSM ID:</label>
                <input 
                    id="search" 
                    v-model="searchQuery" 
                    type="text" 
                    placeholder="Enter YSM ID" 
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
                    <caption class="text-lg font-bold mb-4">Security Master Information</caption>
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('ysm_id')">YSM ID</button>
                                <span v-if="sortByColumn === 'ysm_id'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('company_name')">Company Name</button>
                                <span v-if="sortByColumn === 'company_name'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('description')">Description</button>
                                <span v-if="sortByColumn === 'description'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('short_name')">Short Name</button>
                                <span v-if="sortByColumn === 'short_name'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('mnemonic')">Mnemonic</button>
                                <span v-if="sortByColumn === 'mnemonic'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('company_domicile')">Company Domicile</button>
                                <span v-if="sortByColumn === 'company_domicile'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('security_domicile')">Security Domicile</button>
                                <span v-if="sortByColumn === 'security_domicile'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('security_currency')">Security Currency</button>
                                <span v-if="sortByColumn === 'security_currency'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('bond_or_share')">Bond Or Share</button>
                                <span v-if="sortByColumn === 'bond_or_share'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('sub_asset_type')">Sub Asset Type</button>
                                <span v-if="sortByColumn === 'sub_asset_type'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('price_currency')">Price Currency</button>
                                <span v-if="sortByColumn === 'price_currency'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('price_type')">Price Type</button>
                                <span v-if="sortByColumn === 'price_type'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('last_price')">Last Price</button>
                                <span v-if="sortByColumn === 'last_price'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('date_last_price')">Date Last Price</button>
                                <span v-if="sortByColumn === 'date_last_price'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('price_update_code')">Price Update Code</button>
                                <span v-if="sortByColumn === 'price_update_code'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('industry_code')">Industry Code</button>
                                <span v-if="sortByColumn === 'industry_code'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('stock_exchange')">Stock Exchange</button>
                                <span v-if="sortByColumn === 'stock_exchange'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('stk_exchange_price')">Stock Exchnage Price</button>
                                <span v-if="sortByColumn === 'stk_exchange_price'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('par_value')">Par Value</button>
                                <span v-if="sortByColumn === 'par_value'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('trading_units')">Trading Units</button>
                                <span v-if="sortByColumn === 'trading_units'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('default_depository')">Default Depository</button>
                                <span v-if="sortByColumn === 'default_depository'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('isin')">I.S.I.N</button>
                                <span v-if="sortByColumn === 'isin'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('sedol_no')">Sedol No</button>
                                <span v-if="sortByColumn === 'sedol_no'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('qouted_listed_no')">Quoted Listed No</button>
                                <span v-if="sortByColumn === 'qouted_listed_no'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in paginatedItems" :key="index" class="border-b border-gray-200">
                            <td class="px-4 py-2 text-xs">{{ item.ysm_id }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.company_name }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.description }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.short_name }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.mnemonic }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.company_domicile }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.security_domicile }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.security_currency }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.bond_or_share }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.sub_asset_type }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.price_currency }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.price_type }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.last_price }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.date_last_price }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.price_update_code }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.industry_code }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.stock_exchange }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.stk_exchange_price }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.par_value }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.trading_units }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.default_depository }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.isin }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.sedol_no }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.qouted_listed_no }}</td>
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
            securityMaster: [],
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
            const filteredItems = this.securityMaster.filter(item => 
                item.ysm_id.toString().includes(this.searchQuery)
            );
            const sortedItems = this.sortData(filteredItems);
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return sortedItems.slice(startIndex, endIndex);
        },
        totalPages() {
            const filteredItems = this.securityMaster.filter(item => 
                item.ysm_id.toString().includes(this.searchQuery)
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
                const response = await api.getSecurityMaster();
                this.securityMaster = response.data;
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