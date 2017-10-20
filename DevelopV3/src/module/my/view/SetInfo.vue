<template>
	<div class="set">
		<group>
	      <cell href="pobo:uncheck=1&pageId=805006" :hasArrow="hasArrow">
	        交易设置
	        <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
	      </cell>
	      <cell href="pobo:uncheck=1&pageId=805007" :hasArrow="hasArrow">
	        系统设置
	        <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
	      </cell>
	      <cell href="pobo:uncheck=1&pageId=805008" :hasArrow="hasArrow">
	        系统地址
	        <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
	      </cell>
	      <cell href="pobo:uncheck=1&pageId=805009" :hasArrow="hasArrow">
	        版本说明
	       <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
	      </cell>
	    </group>
	</div>
</template>

<script>
	export default {
		data () {
		    return {
		      hasArrow: true
		    }
	  	},
	  	mounted() {
	  		
	  	}
	}
</script>

<style>
.set {
	padding-top: 44px;
}
body {
  background-color: #f7f7fa;
}
.set .group,
.set .cell {
  background-image: -webkit-gradient(linear,left top,left bottom,from(#e4e7f0),color-stop(50%,#e4e7f0),color-stop(0,transparent)),-webkit-gradient(linear,left bottom,left top,from(#e4e7f0),color-stop(50%,#e4e7f0),color-stop(0,transparent));
  background-image: -webkit-linear-gradient(top,#e4e7f0,#e4e7f0 50%,transparent 0),-webkit-linear-gradient(bottom,#e4e7f0,#e4e7f0 50%,transparent 0);
  background-image: -o-linear-gradient(top,#e4e7f0,#e4e7f0 50%,transparent 0),-o-linear-gradient(bottom,#e4e7f0,#e4e7f0 50%,transparent 0);
  background-image: linear-gradient(to bottom,#e4e7f0,#e4e7f0 50%,transparent 0),linear-gradient(to top,#e4e7f0,#e4e7f0 50%,transparent 0);
}
.set .group {
  margin-top: 10px;
}
.set .cell {
  padding-top: 0;
  padding-bottom: 0;
  height: 44px;
}
.set .cell .cell-body {
  font-size: 15px;
  color: #1a1a1a;
}
.set .cell .cell-footer {
  font-size: 14px;
  color: #808086;
  text-align: right;
}
.set .cell .cell-footer .more {
  position: relative;
  top: -1.5px;
  margin-left: 8px;
  height: 13px;
}
</style>