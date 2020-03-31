<template>
  <div class="tabWindow">
		<div class="window" :data-name="name">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "tab-window",
	props: {
		name: String
	},
}
</script>

<style lang="scss">

</style>