<template>
    <transition name="fade" @after-leave="resetToast">
        <div v-if="visible" class="fixed top-4 right-4 text-white p-3 rounded shadow-lg z-50"
        :class="['toast-color', colorClass, 'animate-toast', visible]">
            {{ message }}
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Toast',
    data() {
        return {
            visible: false,
            message: '',
            colorClass: '',
        };
    },
    methods: {
        showToast(message, color) {
            this.message = message;
            this.colorClass = color;
            console.log(color);
            this.visible = true;
            setTimeout(() => {
                this.visible = false;
            }, 2000); // Toast duration
        },
          resetToast() {
            this.message = '';
          }
    }
};
</script>

<style scoped>
/* Animation for fade-in and fade-out */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.toast-color.red {
  background-color: red;
  color: white;
}
.toast-color.green {
  background-color: green;
  color: white;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>