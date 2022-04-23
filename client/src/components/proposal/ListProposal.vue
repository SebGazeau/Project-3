<template>
	<div v-if="proposals">
		<ul class="list-group">
			<li v-for="(proposal, _key) in proposals" :key="_key" class="list-group-item">
				<div class="" v-if="forVoting && !voter.hasVoted">
					<input class="form-check-input" type="radio" name="proposalVote" v-model="isCheck" :id='`proposal-${_key}`' :value="_key"/>
					<label class="form-check-label" :for="`proposal-${_key}`">{{proposal.description}}</label>
				</div>
				<label v-else>{{proposal.description}}</label>
			</li>
		</ul>
		<div v-if="forVoting && !voter.hasVoted">
			<button class="btn btn-primary" @click="submitVote">Vote</button>
		</div>
	</div>
	<div v-else>
		<span class="">There is no proposal yet</span>
	</div>
</template>

<script lang="ts">
import Proposal from "@/models/interface/Proposal";
import { Options, Vue } from "vue-class-component";
import { mapActions } from "vuex";

@Options({
	methods: mapActions(["callProposals","setVoted"]),
})
export default class ListProposal extends Vue {
	callProposals!: (idSession: number) => void;
	setVoted!: ({vote,id}:{vote: number,id: number}) => boolean;
	id = 0;
	forVoting = false;
	isCheck = -1;
	created(){
		console.log("created", this.$route)
		if(this.$route.params.id){
			this.callProposals(parseInt(this.$route.params.id as string))
		}
		if(this.$route.name === 'voting-proposal-vote'){
			this.forVoting = true;

		}
	}
	voter(_id: any){
		const infoVoter = this.$store.getters.getInfoVoter;
		const isRegistered = infoVoter.isRegistered.find((el:any) => el.isSession === _id);
		const hasVoted = infoVoter.hasVoted.find((el:any) => el.isSession === _id);
		return {isRegistered,hasVoted};
	}
	get proposals():Proposal[] | null{
		return this.$store.getters.getProposals
	}
	async submitVote(){
		console.log("Submit", this.isCheck)
		console.log("Submit", parseInt(this.$route.params.id as string))
		if(this.isCheck != -1){
			const res = await this.setVoted({vote:this.isCheck,id: parseInt(this.$route.params.id as string)});
			if(res){
				this.$router.go(-1);
			}
		}
	}
}
</script>
