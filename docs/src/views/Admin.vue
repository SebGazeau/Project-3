<template>
	<HeaderAdmin />
	<router-view />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HeaderAdmin from "@/components/admin/HeaderAdmin.vue";
@Options({
	components: {
		HeaderAdmin,
	},
})
export default class Admin extends Vue {}
</script>
