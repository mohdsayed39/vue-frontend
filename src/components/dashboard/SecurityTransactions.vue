<template>
    <div>
        <div class="flex justify-between items-center mb-4">
            <div>
                <label for="search" class="mr-2">Search by Rec ID:</label>
                <input 
                    id="search" 
                    v-model="searchQuery" 
                    type="text" 
                    placeholder="Enter Rec ID" 
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
                    <caption class="text-lg font-bold mb-4">Security Transactions Information</caption>
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('rec_id')">Rec ID</button>
                                <span v-if="sortByColumn === 'rec_id'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('entry_id')">Entry ID</button>
                                <span v-if="sortByColumn === 'entry_id'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('security_account')">Security Account</button>
                                <span v-if="sortByColumn === 'security_account'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('security_number')">Security Number</button>
                                <span v-if="sortByColumn === 'security_number'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('depository')">Depositry</button>
                                <span v-if="sortByColumn === 'depository'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('trade_date')">Trade Date</button>
                                <span v-if="sortByColumn === 'trade_date'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('value_date')">Value Date</button>
                                <span v-if="sortByColumn === 'value_date'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('trans_type')">Trans Type</button>
                                <span v-if="sortByColumn === 'trans_type'">
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
                                <button @click="sortBy('price_type')">Price Type</button>
                                <span v-if="sortByColumn === 'price_type'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('trade_currency')">Trade Currency</button>
                                <span v-if="sortByColumn === 'trade_currency'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('no_nominal')">No Nominal</button>
                                <span v-if="sortByColumn === 'no_nominal'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('price')">Price</button>
                                <span v-if="sortByColumn === 'price'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('gross_amt_trd_curr')">Gross Amt Trade Currency</button>
                                <span v-if="sortByColumn === 'gross_amt_trd_curr'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('broker_comms')">Broker Comms</button>
                                <span v-if="sortByColumn === 'broker_comms'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('net_amt_trade')">Net Amt Trade</button>
                                <span v-if="sortByColumn === 'net_amt_trade'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('account_number')">Account Number</button>
                                <span v-if="sortByColumn === 'account_number'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('account_currency')">Account Currency</button>
                                <span v-if="sortByColumn === 'account_currency'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('ref_currency')">Ref Currency</button>
                                <span v-if="sortByColumn === 'ref_currency'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('delivery_instr')">Delivery Instr</button>
                                <span v-if="sortByColumn === 'delivery_instr'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('cost_invst_sec_ccy')">COST INVST SEC CCY</button>
                                <span v-if="sortByColumn === 'cost_invst_sec_ccy'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('cost_invst_ref_ccy')">COST INVST REF CCY</button>
                                <span v-if="sortByColumn === 'cost_invst_ref_ccy'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('prof_loss_sec_ccy')">PROF LOSS SEC CCY</button>
                                <span v-if="sortByColumn === 'prof_loss_sec_ccy'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('reversal_date')">Reversal Date</button>
                                <span v-if="sortByColumn === 'reversal_date'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('date_updated')">Date Updated</button>
                                <span v-if="sortByColumn === 'date_updated'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('book_cost_sec_ccy')">BOOK COST SEC CCY</button>
                                <span v-if="sortByColumn === 'book_cost_sec_ccy'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('book_cost_ref_ccy')">BOOK COST REF CCY</button>
                                <span v-if="sortByColumn === 'delivery_instr'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
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
            itemsPerPage: 10, // Number of items per page
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