<template>
	<router-view />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HeaderAdmin from "@/components/admin/HeaderAdmin.vue";
import { mapActions } from "vuex";
@Options({
	components: {
		HeaderAdmin,
	},
	methods: mapActions(['getOneVoter']),
})
export default class Voting extends Vue {

}
</script>
