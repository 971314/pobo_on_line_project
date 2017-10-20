<template>
  <div class="with-status-bar" id="withStatusBar">
    <div class="status-bar-bgc"></div>
    <div class="navbar-bgc">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'with-status-bar',
  mounted () {
    window.onscroll = function () {
      var top = document.body.scrollTop;
      var withStatusBar = document.getElementById('withStatusBar');
      if (top > 20 && top <= 40) {
        withStatusBar.style.backgroundColor = 'rgba(235,18,18,.2)';
      } else if (top > 40 && top <= 60) {
        withStatusBar.style.backgroundColor = 'rgba(235,18,18,.4)';
      } else if (top > 60 && top <= 80) {
        withStatusBar.style.backgroundColor = 'rgba(235,18,18,.6)';
      } else if (top > 80 && top <= 100) {
        withStatusBar.style.backgroundColor = 'rgba(235,18,18,.8)';
      } else if (top > 100) {
        withStatusBar.style.backgroundColor = 'rgba(235,18,18,1)';
      } else {
        withStatusBar.style.backgroundColor = 'rgba(235,18,18,0)';
      }
    }
  }
}
</script>

