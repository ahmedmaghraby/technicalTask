<template>
    <transition name="fade">
        <div v-if="openToast" 
            :class="['px-4 py-3 border rounded-lg shadow-lg text-white flex items-center gap-2 transition', toastClasses[toastType]]" 
            @click="closeOnClick ? closeToast() : null">
            <span>{{ toastMsg }}</span>
            <button v-if="showCloseBtn" @click="closeToast" class="ml-auto opacity-75 hover:opacity-100">
                <EpCloseBold class="w-4 h-4 text-white" />
            </button>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        toastMsg: { type: String, required: true },
        toastType: { type: String, default: 'info' },
        showCloseBtn: { type: Boolean, default: true },
        closeOnClick: { type: Boolean, default: false }
    },
    emits: ['close'],
    data() {
        return {
            openToast: true,
        };
    },
    computed: {
        toastClasses() {
            return {
                primary: "bg-primary bg-opacity-50 border-primary",
                success: "bg-success-500 bg-opacity-50 border-green-700",
                error: "bg-red-500 bg-opacity-50 border-red-700",
                warning: "bg-yellow-500 bg-opacity-50 border-yellow-700",
                info: "bg-blue-500 bg-opacity-50 border-blue-700"
            };
        }
    },
    watch: {
        toastMsg(newMsg) {
            if (newMsg) {
                this.openToast = true;
            }
        }
    },
    methods: {
        closeToast() {
            this.openToast = false;
            this.$emit('close');
        }
    },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>