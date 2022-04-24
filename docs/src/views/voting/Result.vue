<template>
	<div v-if="proposalSelected">
		<div v-if="oneWinner">
			<span>the winning proposal is <b><i>{{winnerSolo.description}}</i></b> with {{winnerSolo.voteCount}} vote<span v-if="winnerSolo.voteCount>1">s</span>	</span>
		</div>
		<div v-else>
			<span >the winning ex æquo proposals are
				<span v-for="(win, _key) in winnerMulti.winningProposals" :key="_key">
					<b><i>{{win[0]}}</i></b><span v-if="_key < (winnerMulti.winningProposals.length - 1)"> and </span>
				</span>
				<span> with {{winnerMulti.winningProposals[0][1]}} vote<span v-if="winnerMulti.winningProposals[0][1] > 1">s</span></span>
			</span>
		</div>
	</div>
	<div v-else>
		<span >Select a session</span>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapGetters } from "vuex";
import Proposal from "@/models/interface/Proposal";
@Options({
	components: {
	},
	methods: mapActions(["winnerSession"]),
	computed: mapGetters(['getProposals',]),
})
export default class Result extends Vue {
	winnerSession!: (idSession: number) => {winningProposalID: Array<string>, description: string , voteCount: number } | {winningProposalID: Array<string>, winningProposals: Array<Array<string>>} ;
	proposalSelected=true;
	oneWinner = true;
	forOneWinner:{winningProposalID: Array<string>, description: string , voteCount: number}  = {winningProposalID: [''], description: '', voteCount: 0};
	forMultiWinner:{winningProposalID: Array<string>, winningProposals: Array<Array<string>>}  = {winningProposalID: [''], winningProposals: [['']]};
	async created(){
		if(this.$route.params.id){
			await this.winnerIs()
		}else{
			this.proposalSelected = false;
		}
	}
	arraySessions: any[]= [];
	get proposals():Proposal[] | null{
		return this.$store.getters.getProposals
	}
	async winnerIs(){
		const result = await this.winnerSession(parseInt(this.$route.params.id as string))
		if(result.winningProposalID.length === 1){
			this.oneWinner = true;
			this.winnerSolo = result as {winningProposalID: Array<string>, description: string , voteCount: number };
		}else{
			this.oneWinner = false;
			this.winnerMulti = result as {winningProposalID: Array<string>, winningProposals: Array<Array<string>>};
		}
	}
	get winnerSolo(){
		return this.forOneWinner
	}
	set winnerSolo(value) {
		this.forOneWinner = value;
	}
	get winnerMulti(){
		return this.forMultiWinner
	}
	set winnerMulti(value) {
		this.forMultiWinner = value;
	}
}
</script>
