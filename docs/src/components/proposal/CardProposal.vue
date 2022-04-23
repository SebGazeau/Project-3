<template>
	<div>
		<div class="card text-center">
			<div class="card-header">
				{{description}}
			</div>
			<div class="card-body">
				{{count}}
			</div>
			<div class="card-footer text-muted">

			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
	props: {
		id: Number,
		description: String,
		count: Number,
	}
})
export default class CardProposal extends Vue {
	id!: number;
	description!: string;
	count!: number;
}
</script>
