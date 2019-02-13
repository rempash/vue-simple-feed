<template>
  <div id="app">
    <div class="container" :class="{ 'blockUi': blockUi }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import { EventBus } from './event-bus';
import {Action} from 'vuex-class';

@Component
export default class App extends Vue {

  @Action private getPosts;

  private blockUi: boolean = false;

  public created() {
        EventBus.$on('toggleBlockUi', (action: boolean) => this.toggleBlockUi(action));
        this.getPosts();
  }

  private toggleBlockUi(action: boolean) {
    this.blockUi = action;
  }

}
</script>

<style lang="scss">
  @import "./assets/scss/app.scss";
</style>
