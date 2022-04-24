<template>
	<div class="mt-3">
		<h3>Here is the list of voting session</h3>
	</div>
	<div v-if="!infoWaiting">
		<div :key="forReRender" class="m-5">
			<div class="row row-cols-1 row-cols-md-3 g-4">
				<div class="col" v-for="(session, _key) in sessions" :key="_key">
					<CardSession v-bind:id="parseInt(session.key)"
								v-bind:startDate="session.startDate"
								v-bind:startVoting="session.startVoting"
								v-bind:endDate="session.endDate"
								v-bind:status="parseInt(session.status)"/>
				</div>
			</div>
		</div>
	</div>
	<div v-else class="spinner-border text-primary" role="status">
		<span class="visually-hidden">Loading...</span>
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
export default class Session extends Vue {
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
			console.log('res', res)
			this.waiting = false;
		}
	}
	created(){
		this.arraySession();
		this.$store.getters.getContract.events.VotingStarted()
		.on('data', (event:any) => {
			if(event){
				this.uptView();
			}
		});
	}
	uptView(){
		this.forReRender++;
	}
	get infoWaiting(): boolean {
		return this.waiting;
	}
}
</script>
