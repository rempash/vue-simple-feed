<template>
    <div>
        <NewsFilter></NewsFilter>
        <div v-if="$store.getters.hasPosts> 0">
            <SinglePostItem v-for="post in $store.state.posts" 
                    :key="post.id + Math.random()" 
                    :post="post"
                    :options="{
                        sliced: true
                    }"
            ></SinglePostItem>
        </div>
        <div class="no-result" v-else>
            <h1>Постов не найдено</h1>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import SinglePostItem from './SinglePostItem.vue';
import NewsFilter from './NewsFilter.vue';
import { throttle } from '@/helpers/throttle';

@Component({
    components: {
         SinglePostItem,
         NewsFilter,
    }
})
export default class NewsFeed extends Vue {
    private onScrollBottom = throttle(() => {
      this.$store.commit('makeStepLimit');
      this.$store.commit({
        type: 'makeStepStart',
        isFiltered: false
      });
      this.$store.dispatch('getPosts');
    }, 1000);

    private onScrollPage(event){
        if ( window.innerHeight + window.scrollY >= (document.body.offsetHeight) ) this.onScrollBottom();
    }

    created(){ 
        window.addEventListener('scroll', this.onScrollPage);
    }

    destroyed(){
        window.removeEventListener('scroll', this.onScrollPage);
    }

}
</script>

<style lang="scss">

</style>
