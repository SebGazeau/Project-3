<template>
	<div>
		<TabAdmin />
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TabAdmin from "@/components/admin/TabAdmin.vue";

@Options({
	components: {
		TabAdmin,
	},
})
export default class HeaderAdmin extends Vue {}
</script>
