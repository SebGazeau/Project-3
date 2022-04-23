<template>
	<div class="list-group-item d-flex justify-content-center" :class="itemStatus">
		<div class="">
			<span>{{address}} : </span>
			<span v-if="hasVoted">proposal id : {{votedProposalId}}</span>
			<span v-else>no voted</span>
		</div>
		<div class="">
			<input class="form-check-input me-1 " type="checkbox" v-model="isCheck" value="" :disabled="!isRegistered">
		</div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
	props: {
		address: String,
		isRegistered: Boolean,
		hasVoted: Boolean,
		votedProposalId: Number,
	}
})
export default class ListVoter extends Vue {
	address!: string;
	isRegistered!: boolean;
	hasVoted!: boolean;
	votedProposalId!: number;
	isCheck = false;
	get itemStatus(){
		return (this.isRegistered) ? 'list-group-item-success' : 'list-group-item-danger'
	}
}
</script>
