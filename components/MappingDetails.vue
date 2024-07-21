<template>
    <div>
        <Home />
        <div class="flex justify-between p-4">
            <button class="text-blue-500 text-2xl mr-2" @click="goBack">
                <i class="fas fa-arrow-left"></i> Back
            </button>
            <button @click="exportToPDF" class="px-4 py-2 bg-blue-500 text-white rounded">
                Export to PDF
            </button>
        </div>
        <div class="flex justify-between items-center mb-2 px-4">
            <div>
                <label for="search" class="mr-2">Filters :</label>
                <input id="search" v-model="searchQuery" type="text" placeholder="Search...."
                    class="px-2 py-1 border rounded" />
            </div>
            <div>
                <label for="dateFilter" class="mr-2">Date Filter:</label>
                <input type="date" v-model="dateFilter" class="px-2 py-1 border rounded" />
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
            <div v-if="filteredAndPaginatedItems.length === 0" class="text-center my-8 text-xl">
                No results found
            </div>
            <div v-else class="table-responsive p-4">
                <table ref="tableToExport" class="table table-hover table-striped table-bordered table-sm">
                    <!-- <caption class="text-lg font-bold mb-4">Mapped Transactions Information</caption>
                    <caption class="mb-4">Currency : KWD</caption>
                    <caption class="mb-4">Data Selected : {{ dateFilter }}</caption> -->
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('trade_date')">
                                <div class="flex items-center">
                                    Date
                                    <i :class="sortIcon('trade_date')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('security_account')">
                                <div class="flex items-center">
                                    Portfolio Number
                                    <i :class="sortIcon('security_account')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('sam_name')">
                                <div class="flex items-center">
                                    Name of Client
                                    <i :class="sortIcon('sam_name')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('security_number')">
                                <div class="flex items-center">
                                    Share Symbol/Code
                                    <i :class="sortIcon('security_number')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('security_name')">
                                <div class="flex items-center">
                                    Share Name
                                    <i :class="sortIcon('security_name')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('trans_type')">
                                <div class="flex items-center">
                                    Transaction Type
                                    <i :class="sortIcon('trans_type')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('rec_id')">
                                <div class="flex items-center">
                                    Transaction ID
                                    <i :class="sortIcon('rec_id')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('no_nominal')">
                                <div class="flex items-center">
                                    No.of Shares
                                    <i :class="sortIcon('no_nominal')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('price')">
                                <div class="flex items-center">
                                    Unit Price
                                    <i :class="sortIcon('price')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('net_amt_trade')">
                                <div class="flex items-center">
                                    Net Amount
                                    <i :class="sortIcon('net_amt_trade')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('broker_comms')">
                                <div class="flex items-center">
                                    Brokerage/Other charges
                                    <i :class="sortIcon('broker_comms')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="py-2 cursor-pointer text-xs" @click="sortBy('prof_loss_sec_ccy')">
                                <div class="flex items-center">
                                    Profit/loss
                                    <i :class="sortIcon('prof_loss_sec_ccy')" class="ml-1"></i>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in filteredAndPaginatedItems" :key="index"
                            class="border-b border-gray-200">
                            <td class="px-4 py-2 text-xs">{{ formatDate(item.trade_date) }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.security_account }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.sam_name }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.security_number }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.security_name }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.trans_type }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.rec_id }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.no_nominal }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.price }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.net_amt_trade }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.broker_comms }}</td>
                            <td class="px-4 py-2 text-xs">{{ item.prof_loss_sec_ccy }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Pagination Controls -->
            <div class="flex justify-end mb-4 px-4">
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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import api from '@/services/api';
import Home from '@/components/Home.vue';
export default {
    name: 'MappingDetails',
    components: { Home },
    data() {
        return {
            mapData: [],
            isLoading: false,
            currentPage: 1,
            itemsPerPage: 10,
            sortByColumn: '',
            sortDirection: 'asc',
            searchQuery: '',
            dateFilter: '', // New data property for date filter
            itemsPerPageOptions: [10, 25, 50, 100],
        }
    },
    computed: {
        filteredItems() {
            let items = this.mapData;

            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                items = items.filter(item =>
                    Object.values(item).some(value =>
                        String(value).toLowerCase().includes(query)
                    )
                );
            }

            if (this.dateFilter) {
                items = items.filter(item => this.parseDate(this.formatDate(item.trade_date)) === this.dateFilter);
            }

            return items;
        },
        paginatedItems() {
            const sortedItems = this.sortData(this.filteredItems);
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return sortedItems.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.filteredItems.length / this.itemsPerPage);
        },
        filteredAndPaginatedItems() {
            return this.paginatedItems;
        },
    },
    async created() {
        this.fetchMapData();
    },
    methods: {
        formatDate(dateString) {
            if (!dateString) return ''; // Return an empty string if dateString is not defined

            const [datePart] = dateString.split(' '); // Split and take the date part
            return datePart;
        },
        parseDate(dateString) {
            // Convert "DD-MM-YYYY" to "YYYY-MM-DD" for comparison with date input
            const [day, month, year] = dateString.split('-');
            return `${year}-${month}-${day}`;
        },
        async fetchMapData() {
            try {
                this.isLoading = true;
                const response = await api.getTransactionsMappedData();
                this.mapData = response.data;
                this.isLoading = false;
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        },
        async exportToPDF() {
            try {
                this.isLoading = true;

                // Use jsPDF and autoTable for PDF generation
                const pdf = new jsPDF('p', 'mm', 'a4');
                const columns = [
                    { header: 'Date', dataKey: 'trade_date' },
                    { header: 'Portfolio Number', dataKey: 'security_account' },
                    { header: 'Name of Client', dataKey: 'sam_name' },
                    { header: 'Share Symbol/Code', dataKey: 'security_number' },
                    { header: 'Share Name', dataKey: 'security_name' },
                    { header: 'Transaction Type', dataKey: 'trans_type' },
                    { header: 'Transaction ID', dataKey: 'rec_id' },
                    { header: 'No.of Shares', dataKey: 'no_nominal' },
                    { header: 'Unit Price', dataKey: 'price' },
                    { header: 'Net Amount', dataKey: 'net_amt_trade' },
                    { header: 'Brokerage/Other charges', dataKey: 'broker_comms' },
                    { header: 'Profit/loss', dataKey: 'prof_loss_sec_ccy' }
                ];

                const rowsPerPage = 30;
                let pageNumber = 1;
                let startIndex = 0;

                while (startIndex < this.mapData.length) {
                    const endIndex = Math.min(startIndex + rowsPerPage, this.mapData.length);
                    const rows = this.mapData.slice(startIndex, endIndex).map(item => ({
                        trade_date: item.trade_date,
                        security_account: item.security_account,
                        sam_name: item.sam_name,
                        security_number: item.security_number,
                        security_name: item.security_name,
                        trans_type: item.trans_type,
                        rec_id: item.rec_id,
                        no_nominal: item.no_nominal,
                        price: item.price,
                        net_amt_trade: item.net_amt_trade,
                        broker_comms: item.broker_comms,
                        prof_loss_sec_ccy: item.prof_loss_sec_ccy
                    }));

                    if (pageNumber > 1) {
                        pdf.addPage();
                    }

                    pdf.setFontSize(12);
                    pdf.text('Mapped Transactions Information', 14, 10);
                    pdf.setFontSize(10);
                    pdf.text('Currency : KWD', 14, 18);
                    if (this.dateFilter) {
                        pdf.text(`Date Selected: ${this.dateFilter}`, 14, 26);
                    }
                    autoTable(pdf, {
                        columns: columns,
                        body: rows,
                        margin: { top: 40 },
                        theme: 'striped',
                        startY: 40,
                        styles: {
                            fontSize: 8,
                        },
                    });

                    startIndex += rowsPerPage;
                    pageNumber++;
                }

                pdf.save('table-export.pdf');
                this.isLoading = false;
            } catch (error) {
                console.error('Error exporting to PDF:', error);
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
        goBack() {
            this.$router.go(-1);
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
        sortIcon(column) {
            if (this.sortByColumn === column) {
                return this.sortDirection === 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom';
            }
            return '';
        },
    },
}


</script>



<style scoped>
/* Add any custom styles here */
</style>
