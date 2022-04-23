<template>
	<button class="btn btn-primary" @click="$emit('login')" :disabled="active">{{msg}}</button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
	props: {
		msg: String,
	},
})
export default class ButtonLogin extends Vue {
	msg!: string;
	isActive = (this.msg === 'Connexion') ? false : true;
	get active() { return this.isActive }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
