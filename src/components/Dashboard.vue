<template>
    <div>
        <Home />
        <div class="flex justify-between items-center mb-4 px-2">
            <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"><router-link
                to="/userlist">Manage Users</router-link></button>
        <div class="cursor-pointer hover:underline text-blue-500"><router-link to="/transactions">Mapped Transactions</router-link></div>
        </div>
        <div>
            <SecAccMaster />
            <SecurityMaster />
            <SecurityTransactions />
        </div>
    </div>
</template>

<script>
import Home from '@/components/Home.vue';
import SecAccMaster from '@/components/dashboard/SecAccMaster.vue';
import SecurityMaster from '@/components/dashboard/SecurityMaster.vue';
import SecurityTransactions from '@/components/dashboard/SecurityTransactions.vue';


export default {
    name: 'Dashboard',
    components: { Home, SecAccMaster, SecurityMaster, SecurityTransactions },
    data() {
        return {
            
        };
    },
};
</script>

<style scoped>
/* Tailwind styles are directly applied in the template */
</style>