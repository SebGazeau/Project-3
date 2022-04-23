<template>
	<div>
		<ul class="list-group row align-content-center">
			<li class="list-group-item col-4 " v-for="(addr, key) in listVoter" :key="key">
				<div class="input-group">
					<input type="text" class="form-control" placeholder="Address" v-model="listVoter[key]" aria-label="Username" aria-describedby="basic-addon1">
					<span role="button" class="input-group-text" id="basic-addon1" @click="addLine(key.toString())" data-bs-toggle="tooltip" data-bs-placement="right" title="Add more address">+</span>
				</div>
			</li>
		</ul>
		<div>
			<button class="btn btn-primary" @click="forAddVoters()">
				add voter<span v-if="Object.keys(listVoter).length > 1">s</span>
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { Options, Vue } from "vue-class-component";
import { mapActions } from "vuex";
import Voter from "@/models/interface/Voter";
@Options({
	props:{
		id: Number,
	},
	methods: mapActions(["addVoter",'addVoters']),
})
export default class AddVoter extends Vue {
	id!: number;
	addVoter!: (voter: any) => Promise<boolean>;
	addVoters!: (voters: any) => Promise<boolean>;
	listVoter = reactive({0:''});
	date = reactive({
		startDate : null,
		startVoting : null,
		endDate : null,
	})
	created(){
		// this.id = parseInt(this.$route.params.id as string)
	}
	async forAddVoters(){
		console.log('submit form', this.listVoter)
		const arrayAddr = Object.values(this.listVoter).filter(v => v != '');
		console.log('arr', arrayAddr)
		if(arrayAddr.length >= 0){
			console.log('call add address')
			let res = false;
			if(arrayAddr.length === 1){
				res = await this.addVoter({addrVoter: arrayAddr[0], id:this.id});
			}else{
				res = await this.addVoters({addrVoter: arrayAddr, id:this.id});
			}
			if(res){
				this.$emit('addVoter');
			}
		}else{
			// if(res){
			// 	this.$emit('addSession');
			// }
		}
	}
	addLine(index: string){
		console.log('id', parseInt(index) + 1)
		this.listVoter = Object.assign(this.listVoter, {[parseInt(index)+1]: ''})
	}
}
</script>
