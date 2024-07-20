<template>
    <div>
        <div class="flex justify-between items-center mb-4">
            <div>
                <label for="search" class="font-bold font-l mr-2">Filter:</label>
                <input id="search" v-model="searchQuery" type="text" placeholder="Enter YSM ID"
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
                    <caption class="text-lg font-bold mb-4">Security Master Information</caption>
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('ysm_id')">
                                <div class="flex items-center">
                                    YSM ID
                                    <i :class="sortIcon('ysm_id')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('company_name')">
                                <div class="flex items-center">
                                    Company Name
                                    <i :class="sortIcon('company_name')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('description')">
                                <div class="flex items-center">
                                    Description
                                    <i :class="sortIcon('description')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('short_name')">
                                <div class="flex items-center">
                                    Short Name
                                    <i :class="sortIcon('short_name')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('mnemonic')">
                                <div class="flex items-center">
                                    Mnemonic
                                    <i :class="sortIcon('mnemonic')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer w-50" @click="sortBy('company_domicile')">
                                <div class="flex items-center">
                                    Company Domicile
                                    <i :class="sortIcon('company_domicile')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('security_domicile')">
                                <div class="flex items-center">
                                    Security Domicile
                                    <i :class="sortIcon('security_domicile')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('security_currency')">
                                <div class="flex items-center">
                                    Security Currency
                                    <i :class="sortIcon('security_currency')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('bond_or_share')">
                                <div class="flex items-center">
                                    Bond Or Share
                                    <i :class="sortIcon('bond_or_share')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('sub_asset_type')">
                                <div class="flex items-center">
                                    Sub Asset Type
                                    <i :class="sortIcon('sub_asset_type')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('price_currency')">
                                <div class="flex items-center">
                                    Price Currency
                                    <i :class="sortIcon('price_currency')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('price_type')">
                                <div class="flex items-center">
                                    Price Type
                                    <i :class="sortIcon('price_type')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('last_price')">
                                <div class="flex items-center">
                                    Last Price
                                    <i :class="sortIcon('last_price')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('date_last_price')">
                                <div class="flex items-center">
                                    Date Last Price
                                    <i :class="sortIcon('date_last_price')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('price_update_code')">
                                <div class="flex items-center">
                                    Price Update Code
                                    <i :class="sortIcon('price_update_code')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('industry_code')">
                                <div class="flex items-center">
                                    Industry Code
                                    <i :class="sortIcon('industry_code')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('stock_exchange')">
                                <div class="flex items-center">
                                    Stock Exchange
                                    <i :class="sortIcon('stock_exchange')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('stk_exchange_price')">
                                <div class="flex items-center">
                                    Stock Exchange Price
                                    <i :class="sortIcon('stk_exchange_price')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('par_value')">
                                <div class="flex items-center">
                                    Par Value
                                    <i :class="sortIcon('par_value')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('trading_units')">
                                <div class="flex items-center">
                                    Trading Units
                                    <i :class="sortIcon('trading_units')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('default_depository')">
                                <div class="flex items-center">
                                    Default Depository
                                    <i :class="sortIcon('default_depository')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('isin')">
                                <div class="flex items-center">
                                    I.S.I.N
                                    <i :class="sortIcon('isin')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('sedol_no')">
                                <div class="flex items-center">
                                    Sedol No
                                    <i :class="sortIcon('sedol_no')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 text-xs cursor-pointer" @click="sortBy('qouted_listed_no')">
                                <div class="flex items-center">
                                    Quoted Listed No
                                    <i :class="sortIcon('qouted_listed_no')" class="ml-1"></i>
                                </div>
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
            itemsPerPage: 5, // Default number of items per page
            itemsPerPageOptions: [5, 10, 20, 50], // Options for items per page
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
/* Tailwind styles are directly applied in the template */
</style>