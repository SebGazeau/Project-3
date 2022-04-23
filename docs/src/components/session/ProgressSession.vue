<template>
	<div class="session-progress--container">
		<div v-for="(st, _key) in listStatus" :key="_key"
			:class="st.class"
		>{{st.value}}</div>
	</div>
	<div>
		<div :class="valueForName">{{$store.getters.getWorkflowStatus(status)}}</div>
	</div>
</template>

<script lang="ts">
import Session from "@/models/interface/Session";
import { reactive } from "vue";
import { Options, Vue } from "vue-class-component";
import { mapActions } from "vuex";

@Options({
	props: {
		status: Number
	}
})
export default class ProgressSession extends Vue {
	status!: number;
	valueForName = 'name--0';
	get listStatus(){
		const array = [];
		for (let index = 0; index < 6; index++) {
			array.push({value: '',class: ['session-progress--item','session-progress--item-number',{'session-progress--item-active': (this.status >= index)}]})
			if(index != 5){
				array.push({value: '',class:['session-progress--item','session-progress--item-empty',{'session-progress--item-active': (this.status > index)}]})
			}
			if(index == this.status){
				this.valueForName = `name--${index}`
			}
		}
		return array
	}
}
</script>
<style lang="scss">
.session-progress{
	&--container{
		display: flex;
		align-items: center;
	}

	&--item-empty{
		flex-grow: 1;
		background-color: greenyellow;
		height: 5px;
	}
	&--item-number{
		flex-grow: 0;
		background-color: green;
		width: 20px;
		height: 20px;
		border-radius: 50%;
	}
	&--item{
		opacity: 0.3;
		&-active{
			opacity: 1;
		}
	}
}
</style>
