<template>
    <div>
        <div v-if="isLoading" class="text-center my-8">
            Loading...
        </div>
        <div v-else>
            <div class="overflow-x-auto">
                <div class="flex justify-between p-2">
                    <button class="text-blue-500 text-2xl mr-2" @click="goBack">
                        <i class="fas fa-arrow-left"></i> Back
                    </button>
                    <button @click="exportToPDF" class="px-4 py-2 bg-gray-200 text-gray-700 rounded">
                        Export to PDF
                    </button>
                </div>
                <table ref="tableToExport" class="table-auto min-w-full border-collapse border border-gray-200">
                    <caption class="text-lg font-bold mb-4">Mapped Transactions Information</caption>
                    <caption class="mb-4">Currency : KWD</caption>
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('trade_date')">Date</button>
                                <span v-if="sortByColumn === 'trade_date'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('security_account')">Portfolio Number</button>
                                <span v-if="sortByColumn === 'security_account'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('sam_name')">Name of Client</button>
                                <span v-if="sortByColumn === 'sam_name'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('security_number')">Share Symbol/Code</button>
                                <span v-if="sortByColumn === 'security_number'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('security_name')">Share Name</button>
                                <span v-if="sortByColumn === 'security_name'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('trans_type')">Transaction Type</button>
                                <span v-if="sortByColumn === 'trans_type'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('rec_id')">Transaction ID</button>
                                <span v-if="sortByColumn === 'rec_id'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('no_nominal')">No.of Shares</button>
                                <span v-if="sortByColumn === 'no_nominal'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('price')">Unit Price</button>
                                <span v-if="sortByColumn === 'price'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('net_amt_trade')">Net Amount</button>
                                <span v-if="sortByColumn === 'net_amt_trade'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('broker_comms')">Brokerage/Other charges</button>
                                <span v-if="sortByColumn === 'broker_comms'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                            <th class="px-4 py-2 text-left text-xs">
                                <button @click="sortBy('prof_loss_sec_ccy')">Profit/loss</button>
                                <span v-if="sortByColumn === 'prof_loss_sec_ccy'">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in paginatedItems" :key="index" class="border-b border-gray-200">
                            <td class="px-4 py-2 text-xs">{{ item.trade_date }}</td>
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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import api from '@/services/api';
export default {
    name: 'MappingDetails',
    components: {
    },
    data() {
        return {
            mapData: [],
            isLoading: false,
            currentPage: 1,
            itemsPerPage: 10, // Number of items per page
            sortByColumn: '', // Column to sort by
            sortDirection: 'asc', // Initial sort direction
        }
    },
    computed: {
        paginatedItems() {
            const sortedItems = this.sortData(this.mapData);
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return sortedItems.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.mapData.length / this.itemsPerPage);
        },
    },
    async created() {
        this.fetchMapData();
    },
    methods: {
        async fetchMapData() {
            try {
                this.isLoading = true;
                const response = await api.getTransactionsMappedData();
                this.mapData = response.data;
                console.log(this.mapData);
                this.isLoading = false;
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        },
        async exportToPDF() {
            try {
                this.isLoading = true;

                // Use html2canvas to capture table as an image
                const table = this.$refs.tableToExport;
                const canvas = await html2canvas(table);

                // Convert image to PDF using jsPDF
                const pdf = new jsPDF('p', 'pt', 'a4');
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 600; // A4 size width in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
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
    },
    mounted() {

    }
}
</script>
