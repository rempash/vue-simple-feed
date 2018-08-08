<template>
  <div id="app">
    <div class="container" :class="{ 'blockUi': blockUi }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import { setTimeout } from 'timers';
import { PostInterface } from '@/interfaces/post.interface';
import { EventBus } from './event-bus';

@Component({

})
export default class App extends Vue {

    private blockUi: boolean = false;

    public created(){
        EventBus.$on('toggleBlockUi', (action: boolean) => this.toggleBlockUi(action));

        this.$store.dispatch('getPosts');

    }

    private toggleBlockUi(action: boolean){
      this.blockUi = action;
    }

    
}
</script>

<style lang="scss">
  @import "./assets/scss/app.scss";
</style>
