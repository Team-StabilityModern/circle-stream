<template>
  <section class="section">
    <HelloWorld :sender="this.sender" ip="127.0.0.1" />
  </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/MessageBox.vue';
import 'bulma';

@Options({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  sender: string = `Client${Math.round(Math.random() * 1000)}`;
}
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
