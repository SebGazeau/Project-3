<template>
	<div>
		<div v-if="isAuthSubmit">
			<div v-if="!hasProposal" class="input-group mb-3">
				<span class="input-group-text" id="basic-addon3">Your proposal</span>
				<input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="newProposal">
				<button class="btn btn-primary" @click="forAddProposal">
					<span v-if="waitingBtn">Add Proposal</span>
					<div v-else class="spinner-border text-light" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				</button>
			</div>
			<div v-else>
				<span>You have already made a proposal</span>
			</div>
		</div>
		<div v-else>
			<span>Your not authorized for this session</span>
		</div>

	</div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { Options, Vue } from "vue-class-component";
import { mapActions } from "vuex";
import Voter from "@/models/interface/Voter";
@Options({
	methods: mapActions(["canMakeProposal",'addProposal']),
})
export default class AddProposal extends Vue {
	id = 0;
	canMakeProposal!: (idSession: number) => Promise<any>;
	addProposal!: (proposal: any) => Promise<boolean>;
	newProposal = '';
	isAuthSubmit = false;
	hasProposal = false;
	waitingBtn = true;
	created(){
		this.id = parseInt(this.$route.params.id as string);
		this.isAuthorized();
		// this.id = parseInt(this.$route.params.id as string)
	}
	async isAuthorized(){
		const cmp = await this.canMakeProposal(this.id);
		this.isAuthSubmit = cmp.isRegistered;
		this.hasProposal = cmp.hasProposal;
	}
	async forAddProposal(){
		this.waitingBtn = false;
		if(this.newProposal != ''){
			const res = await this.addProposal({proposal: this.newProposal, id:this.id});
			if(res){
				this.waitingBtn = true;
				this.$router.go(-1);
			}
		}
	}
}
</script>
