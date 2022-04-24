<template>
<div class="mx-5 p-3 border border-top-0">
	<div :key="forReRender">
		<AddVoter :id="parseInt($route.params.id)" @addVoter="uptView"/>
		<div  v-if="voterSelected">
			<div v-if="$store.getters.getListVoters" class="list-group container">
				<ListVoter v-for="(voter, _key) in voters" :key="_key"
							:ref="`voter-${_key}`"
							:address="voter.address"
							:isRegistered="voter.isRegistered"
							:hasVoted="voter.hasVoted"
							:votedProposalId="voter.votedProposalId"
				/>
				<div>
					<button class="btn btn-primary" @click="disabledVoters">
						<span v-if="waitingBtnDisabled">disabled voter</span>
						<div v-else class="spinner-border text-light" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					</button>
				</div>
			</div>
			<div class="w-100" v-else>
				<span >no voter for the moment</span>
			</div>
		</div>
		<div v-else>
			<span >Select a session</span>
		</div>
	</div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapGetters } from "vuex";
import Voter from "@/models/interface/Voter";
import AddVoter from "@/components/voter/AddVoter.vue";
import ListVoter from "@/components/voter/ListVoter.vue";
@Options({
	components: {
		AddVoter,
		ListVoter,
	},
	methods: mapActions(["findVoters","excludedVoter",'excludedVoters']),
})
export default class ViewVoter extends Vue {
	excludedVoter!: (voter: any) => Promise<boolean>;
	excludedVoters!: (voters: any) => Promise<boolean>;
	findVoters!: (idSession: number) => void;
	voterSelected=true;
	forReRender = 0;
	waitingBtnDisabled = true;
	created(){
		if(this.$route.params.id){
			this.findVoters(parseInt(this.$route.params.id as string))
		}else{
			this.voterSelected = false;
		}
	}
	arraySessions: any[]= [];
	get voters():Voter[] | null{
		const arr = this.$store.getters.getListVoters
		return arr
	}
	uptView(){
		this.forReRender++;
	}
	async disabledVoters(){
		this.waitingBtnDisabled = false;
		const arrayAddr = [];
		for (const [key, value] of Object.entries(this.$refs) as any ) {
			if(value[0].isCheck){
				arrayAddr.push(value[0].address)
			}
		}
		if(arrayAddr.length >= 0){
			let res = false;
			if(arrayAddr.length === 1){
				res = await this.excludedVoter({addrVoter: arrayAddr[0], id:parseInt(this.$route.params.id as string)});
			}else{
				res = await this.excludedVoters({addrVoter: arrayAddr, id:parseInt(this.$route.params.id as string)});
			}
			if(res){
				this.waitingBtnDisabled = true;
				this.$emit('addVoter');
			}
		}
	}
}
</script>
