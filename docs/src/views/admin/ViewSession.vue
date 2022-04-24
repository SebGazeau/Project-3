<template>
	<div class="mx-5 p-3 border border-top-0">
		<div :key="forReRender" class="container">
			<StartSession @addSession="uptView"/>
			<div v-if="!infoWaiting" class="mt-2">
				<div class="row row-cols-1 row-cols-md-3 g-4">
					<div class="col" v-for="(session, _key) in sessions" :key="_key">
						<CardSession v-bind:id="parseInt(session.key)"
									v-bind:startDate="session.startDate"
									v-bind:startVoting="session.startVoting"
									v-bind:endDate="session.endDate"
									v-bind:status="session.status"
									@updateSession="uptView"/>
					</div>
				</div>
			</div>
			<div v-else class="spinner-border text-primary mt-4" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	</div>
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
	methods: mapActions(["callSession"]),
	computed: mapGetters(['getSessions',]),
})
export default class ViewSession extends Vue {
	callSession!: () => boolean;
	forReRender = 0;
	arraySessions: any[]= [];
	waiting = true;
	get sessions(){
		return this.$store.getters.getSessions
	}
	async arraySession(){
		const res = await this.callSession();
		if(res){
			this.waiting = false;
		}
	}
	created(){
		this.arraySession();
	}
	uptView(){
		this.forReRender++;
	}
	get infoWaiting(): boolean {
		return this.waiting;
	}
}
</script>
