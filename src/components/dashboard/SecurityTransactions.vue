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
                    <thead>
    <tr class="bg-gray-100">
        <th class="py-2 text-xs cursor-pointer" @click="sortBy('rec_id')">
            <div class="flex items-center">
                Rec ID
                <i :class="sortIcon('rec_id')" class="ml-1"></i>
            </div>
        </th>
        <th class="py-2 text-xs cursor-pointer" @click="sortBy('entry_id')">
            <div class="flex items-center">
                Entry ID
                <i :class="sortIcon('entry_id')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 text-left text-xs cursor-pointer" @click="sortBy('security_account')">
            <div class="flex items-center">
                Security Account
                <i :class="sortIcon('security_account')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 text-left text-xs cursor-pointer" @click="sortBy('security_number')">
            <div class="flex items-center">
                Security Number
                <i :class="sortIcon('security_number')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 text-left text-xs cursor-pointer" @click="sortBy('depository')">
            <div class="flex items-center">
                Depository
                <i :class="sortIcon('depository')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 text-left text-xs cursor-pointer" @click="sortBy('trade_date')">
            <div class="flex items-center">
                Trade Date
                <i :class="sortIcon('trade_date')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 text-left text-xs cursor-pointer" @click="sortBy('value_date')">
            <div class="flex items-center">
                Value Date
                <i :class="sortIcon('value_date')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 text-left text-xs cursor-pointer" @click="sortBy('trans_type')">
            <div class="flex items-center">
                Trans Type
                <i :class="sortIcon('trans_type')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 text-left text-xs cursor-pointer" @click="sortBy('security_currency')">
            <div class="flex items-center">
                Security Currency
                <i :class="sortIcon('security_currency')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 text-left text-xs cursor-pointer" @click="sortBy('price_type')">
            <div class="flex items-center">
                Price Type
                <i :class="sortIcon('price_type')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 text-left text-xs cursor-pointer" @click="sortBy('trade_currency')">
            <div class="flex items-center">
                Trade Currency
                <i :class="sortIcon('trade_currency')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 text-left text-xs cursor-pointer" @click="sortBy('no_nominal')">
            <div class="flex items-center">
                No Nominal
                <i :class="sortIcon('no_nominal')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 text-left text-xs cursor-pointer" @click="sortBy('price')">
            <div class="flex items-center">
                Price
                <i :class="sortIcon('price')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 w-32 text-left text-xs cursor-pointer" @click="sortBy('gross_amt_trd_curr')">
            <div class="flex items-center">
                Gross Amt Trade Currency
                <i :class="sortIcon('gross_amt_trd_curr')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 w-24 text-left text-xs cursor-pointer" @click="sortBy('broker_comms')">
            <div class="flex items-center">
                Broker Comms
                <i :class="sortIcon('broker_comms')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 w-24 text-left text-xs cursor-pointer" @click="sortBy('net_amt_trade')">
            <div class="flex items-center">
                Net Amt Trade
                <i :class="sortIcon('net_amt_trade')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 w-32 text-left text-xs cursor-pointer" @click="sortBy('account_number')">
            <div class="flex items-center">
                Account Number
                <i :class="sortIcon('account_number')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 w-32 text-left text-xs cursor-pointer" @click="sortBy('account_currency')">
            <div class="flex items-center">
                Account Currency
                <i :class="sortIcon('account_currency')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 w-24 text-left text-xs cursor-pointer" @click="sortBy('ref_currency')">
            <div class="flex items-center">
                Ref Currency
                <i :class="sortIcon('ref_currency')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 w-32 text-left text-xs cursor-pointer" @click="sortBy('delivery_instr')">
            <div class="flex items-center">
                Delivery Instr
                <i :class="sortIcon('delivery_instr')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 w-32 text-left text-xs cursor-pointer" @click="sortBy('cost_invst_sec_ccy')">
            <div class="flex items-center">
                Cost Invst Sec CCY
                <i :class="sortIcon('cost_invst_sec_ccy')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 w-32 text-left text-xs cursor-pointer" @click="sortBy('cost_invst_ref_ccy')">
            <div class="flex items-center">
                Cost Invst Ref CCY
                <i :class="sortIcon('cost_invst_ref_ccy')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 w-32 text-left text-xs cursor-pointer" @click="sortBy('prof_loss_sec_ccy')">
            <div class="flex items-center">
                Prof Loss Sec CCY
                <i :class="sortIcon('prof_loss_sec_ccy')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 w-24 text-left text-xs cursor-pointer" @click="sortBy('reversal_date')">
            <div class="flex items-center">
                Reversal Date
                <i :class="sortIcon('reversal_date')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 w-24 text-left text-xs cursor-pointer" @click="sortBy('date_updated')">
            <div class="flex items-center">
                Date Updated
                <i :class="sortIcon('date_updated')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 w-32 text-left text-xs cursor-pointer" @click="sortBy('book_cost_sec_ccy')">
            <div class="flex items-center">
                Book Cost Sec CCY
                <i :class="sortIcon('book_cost_sec_ccy')" class="ml-1"></i>
            </div>
        </th>
        <th class="px-4 py-2 w-32 text-left text-xs cursor-pointer" @click="sortBy('book_cost_ref_ccy')">
            <div class="flex items-center">
                Book Cost Ref CCY
                <i :class="sortIcon('book_cost_ref_ccy')" class="ml-1"></i>
            </div>
        </th>
    </tr>
</thead>

                    <tbody>
                        <tr v-for="(item, index) in paginatedItems" :key="index" class="border-b border-gray-200">
                            <td class="px-4 py-2 text-xs">{{ item.rec_id }}</td>
                            <!-- <td class="px-4 py-2 text-xs">{{ item.entry_id }}</td> -->
                            <td class="px-4 py-2 text-xs">
                                <template v-if="item.entry_id">
                                    {{ item.entry_id }}
                                </template>
                                <template v-else> --- </template>
                            </td>
                            <td class="px-4 py-2 text-xs">{{ item.security_account }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.security_number }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.depository }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.trade_date }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.value_date }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.trans_type }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.security_currency }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.price_type }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.trade_currency }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.no_nominal }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.price }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.gross_amt_trd_curr }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.broker_comms }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.net_amt_trade }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.account_number }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.account_currency }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.ref_currency }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.delivery_instr }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.cost_invst_sec_ccy }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.cost_invst_ref_ccy }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.prof_loss_sec_ccy }}</td>
                            <!-- <td class="px-4 py-2 text-xs">{{ item.reversal_date }}</td> -->
                            <td class="px-4 py-2 text-xs">
                                <template v-if="item.reversal_date">
                                    {{ item.reversal_date }}
                                </template>
                                <template v-else> --- </template>
                            </td>
                            <td class="px-4 py-2 text-xs">{{ item.date_updated }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.book_cost_sec_ccy }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.book_cost_ref_ccy }}</td>
                            <!-- <td class="px-4 py-2 text-xs">
                                <template v-if="item.portfolio_type">
                                    {{ item.portfolio_type }}
                                </template>
                                <template v-else> --- </template>
                            </td> -->
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
            securityTransactions: [],
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
            const filteredItems = this.securityTransactions.filter(item =>
                item.rec_id.toString().includes(this.searchQuery)
            );
            const sortedItems = this.sortData(filteredItems);
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return sortedItems.slice(startIndex, endIndex);
        },
        totalPages() {
            const filteredItems = this.securityTransactions.filter(item =>
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
                const response = await api.getSecurityTransactions();
                this.securityTransactions = response.data;
                console.log(this.securityTransactions);
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