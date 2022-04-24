<template>
	<div :key="forReRender">
		<div class="card text-center">
			<div class="card-header">
				<h3>Session {{id}}</h3>
				<ProgressSession :status="status"/>
			</div>
			<div class="card-body">
				<h5 class="card-title">Starting date for this session {{startDate}}</h5>
				<p class="card-text">
					<span>{{startVoting}} : starting date for voting. </span>
					<span>end {{endDate}}</span>
				</p>
			</div>
			<div class="card-footer text-muted">
				<div  v-if="$store.getters.getIsOwner">
					<div class="btn-group" role="group" aria-label="Basic outlined example" v-if="waitingBtn">
						<button type="button" class="btn btn-outline-dark" @click="sessionSelect(id, 'view-proposal')">Proposal</button>
						<button type="button" class="btn btn-outline-dark" @click="sessionSelect(id, 'view-voter')">Voter</button>
						<button type="button" class="btn btn-outline-dark" @click="changeStatus" v-if="(status < 4)">Change Status</button>
						<button type="button" class="btn btn-outline-dark" @click="calculTally" v-if="(status == 4)">Calcul Tally</button>
						<button type="button" class="btn btn-outline-dark" @click="sessionSelect(id, 'view-result')" v-if="(status == 5)">Result</button>
					</div>
					<button v-else type="button" class="btn btn-outline-dark">
						<div class="spinner-border text-dark" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					</button>
				</div>
				<div class="btn-group" role="group" aria-label="Basic outlined example" v-else>
					<button type="button" class="btn btn-outline-dark" v-if="(status == 0)" disabled>Proposal pending</button>
					<button type="button" class="btn btn-outline-dark" @click="sessionSelect(id, 'voting-proposal-view')" v-if="(status != 0)">See the Proposals</button>
					<button type="button" class="btn btn-outline-dark" @click="sessionSelect(id, 'voting-proposal-add')" v-if="(status == 1)">Make a Proposal</button>
					<button type="button" class="btn btn-outline-dark" @click="sessionSelect(id, 'voting-proposal-vote')" v-if="(status == 3 && !voterHasVoted(id))">Vote for Proposal</button>
					<button type="button" class="btn btn-outline-dark" v-if="(status == 3 && voterHasVoted(id))" disabled>You have already voted</button>
					<button type="button" class="btn btn-outline-dark" v-if="(status == 4)" disabled>Tally pending</button>
					<button type="button" class="btn btn-outline-dark" @click="sessionSelect(id, 'voting-result')" v-if="(status == 5)">Result</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Session from "@/models/interface/Session";
import Voter from "@/models/interface/Voter";
import router from "@/router";
import { Options, Vue } from "vue-class-component";
import { mapActions } from "vuex";
import ProgressSession from "./ProgressSession.vue";

@Options({
	components: {
		ProgressSession
	},
	props: {
		id: Number,
		startDate: String,
		startVoting: String,
		endDate: String,
		status: Number,
	},
	methods: mapActions(["changeStatusSession", 'callTally', 'getOneVoter']),
}) //changeStatusSession
export default class CardSession extends Vue {
	getOneVoter!: (id: number) => boolean;
	changeStatusSession!: (session: any) => boolean;
	callTally!: (session: any) => boolean;
	waitingBtn = true;
	id!: number;
	startDate!: string;
	startVoting!: string;
	endDate!: string;
	status!: number;
	forReRender = 0;
	async created(){
		const res = await this.getOneVoter(parseInt(this.$route.params.id as string));
		this.$store.getters.getContract.events.WorkflowStatusChange()
		.on('data', (event:any) => {
			if(event.returnValue.index == this.id){
				this.uptView();
			}
		});
	}
	voterIsRegistered(_id: number): boolean{
		const infoVoter = this.$store.getters.getInfoVoter;
		const isRegistered = infoVoter.isRegistered.find((el:any) => el.idSession === _id);
		if(isRegistered){
			return isRegistered.property;
		}
		return false;
	}
	voterHasVoted(_id: number): boolean{
		const infoVoter = this.$store.getters.getInfoVoter;
		const hasVoted = infoVoter.hasVoted.find((el:any) => el.idSession === _id);
		if(hasVoted){
			return hasVoted.property;
		}
		return false;
	}
	sessionSelect(id: number, cible: string){
		router.push({name: cible, params: {id: id}})
	}
	async changeStatus(){
		this.waitingBtn = false;
		const res = await this.changeStatusSession(this.id)
		if(res){
			this.waitingBtn = true;
			this.$emit('updateSession')
		}
	}
	async calculTally(){
		this.waitingBtn = false;
		const res = await this.callTally(this.id)
		if(res){
			this.waitingBtn = true;
			this.$emit('updateSession')
		}
	}
	uptView(){
		this.forReRender++;
	}
}
</script>
