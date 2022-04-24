<template>
	<div class="home">
		<HelloWorld msg="Welcome to Voting Project in Solidity" />
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Session from "@/models/interface/Session";

@Options({
	components: {
		HelloWorld,
	},
})
export default class Home extends Vue {
}
</script>
