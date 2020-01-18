<template>
	<div id="setting">
		<button v-if="on" v-on:click="start">START</button>
		<button v-else v-on:click="stop">STOP</button>
	</div>
</template>

<script>
export default {
	data () {
		return {
			on: true
		}
	},
	methods: {
		start(){ this.on = false},
		stop (){ this.on = true}
	}
}
</script>