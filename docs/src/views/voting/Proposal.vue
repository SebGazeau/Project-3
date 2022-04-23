<template>
	<router-view />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapGetters } from "vuex";
import CardSession from "@/components/session/CardSession.vue";
import router from "@/router";
import StartSession from "@/components/session/StartSession.vue";
@Options({
	components: {
		CardSession,
		StartSession,
	},
	methods: mapActions(["callSession", 'getOneVoter']),
	computed: mapGetters(['getSessions',]),
})
export default class Proposal extends Vue {
	callSession!: () => void;

	forReRender = 0;
	arraySessions: any[]= [];
	get sessions(){
		return this.$store.getters.getSessions
	}
	arraySession(){
		this.callSession();
	}
	created(){
		this.arraySession();
	}
	uptView(){
		this.forReRender++;
	}
}
</script>
