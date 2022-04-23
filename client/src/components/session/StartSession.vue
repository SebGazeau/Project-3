<template>
	<div>
		<div class="row" :class="{'was-validated':missingValue}">
			<div class="col-md-4">
				<label for="startDate" class="form-label">Start Date</label>
				<input type="date" class="form-control" id="startDate" v-model="date.startDate" required>
				<div class="invalid-feedback">
					Please select date.
				</div>
			</div>
			<div class="col-md-4">
				<label for="startVoting" class="form-label">Start Voting</label>
				<input type="date" class="form-control" id="startVoting" v-model="date.startVoting" required>
				<div class="invalid-feedback">
					Please select date.
				</div>
			</div>
			<div class="col-md-4">
				<label for="endDate" class="form-label">End Date</label>
				<input type="date" class="form-control" id="endDate" v-model="date.endDate" required>
				<div class="invalid-feedback">
					Please select date.
				</div>
			</div>
			<div>
				<button class="btn btn-primary" @click="startSession()">start future voting session</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Session from "@/models/interface/Session";
import { reactive } from "vue";
import { Options, Vue } from "vue-class-component";
import { mapActions } from "vuex";

@Options({
	methods: mapActions(["startNewSession"]),
})
export default class StartSession extends Vue {
	startNewSession!: (session: any) => Promise<boolean>;
	missingValue = false;
	date = reactive({
		startDate : null,
		startVoting : null,
		endDate : null,
	})
	async startSession(){
		console.log('submit form')
		for(const [key, date] of Object.entries(this.date)){
			console.log('date',date)
			console.log('key',key)
			if(date === null){
				this.missingValue = true;
			}
		}
		if(!this.missingValue){
			const res = await this.startNewSession(this.date);
			console.log(res);
			if(res){
				this.$emit('addSession');
			}
		}
	}
}
</script>
