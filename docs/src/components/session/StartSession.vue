<template>
	<div class="border-bottom">
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
			<div class="m-3">
				<button class="btn btn-primary" @click="startSession()">
					<span v-if="waitingBtn">Start new voting session</span>
					<div v-else class="spinner-border text-light" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				</button>
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
	waitingBtn = true;
	date = reactive({
		startDate : null,
		startVoting : null,
		endDate : null,
	})
	async startSession(){
		this.waitingBtn = false;
		for(const [key, date] of Object.entries(this.date)){
			if(date === null){
				this.missingValue = true;
				this.waitingBtn = true;
			}
		}
		if(!this.missingValue){
			const res = await this.startNewSession(this.date);
			if(res){
				this.waitingBtn = true;
				this.$emit('addSession');
			}
		}
	}
}
</script>
