<template>
	<div v-if="proposalSelected">
		<div class="row row-cols-1 row-cols-md-3 g-4" v-if="$store.getters.getProposals">
			<div class="col" v-for="(proposal, _key) in proposals" :key="_key">
				<CardProposal v-bind:id="proposal.key"
							v-bind:description="proposal.description"
							v-bind:count="proposal.voteCount"/>
			</div>
		</div>
		<div class="w-100" v-else>
			<span >no offer for the moment</span>
		</div>
	</div>
	<div v-else>
		<span >Select a session</span>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapGetters } from "vuex";
import CardProposal from "@/components/proposal/CardProposal.vue";
import Proposal from "@/models/interface/Proposal";
@Options({
	components: {
		CardProposal,
	},
	methods: mapActions(["callProposals"]),
	computed: mapGetters(['getProposals',]),
})
export default class ViewProposal extends Vue {
	callProposals!: (idSession: number) => void;
	proposalSelected=true;
	mounted(){
		if(this.$route.params.id){
			this.callProposals(parseInt(this.$route.params.id as string))
		}else{
			this.proposalSelected = false;
		}
	}
	arraySessions: any[]= [];
	get proposals():Proposal[] | null{
		return this.$store.getters.getProposals
	}
}
</script>
