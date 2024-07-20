<template>
    <div>
        <Toast ref="toast" />
        <Home />
        <div class="flex justify-between items-center my-4 px-2">
            <button class="bg-blue-500 hover:bg-blue-600  px-4 py-2 rounded">
                <router-link to="/userlist" class="text-white hover:text-white">Manage Users</router-link>
            </button>
            <div class="cursor-pointer hover:underline text-blue-500">
                <router-link to="/transactions">Mapped Transactions</router-link>
            </div>
        </div>
        <TabsDetails />
    </div>
</template>

<script>
import Home from '@/components/Home.vue';
import TabsDetails from './dashboard/TabsDetails.vue';

export default {
    name: 'Dashboard',
    components: { Home, TabsDetails },
    data() {
        return {

        };
    },
};
</script>

<style scoped>
/* Tailwind styles are directly applied in the template */
</style>