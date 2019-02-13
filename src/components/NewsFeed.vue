<template>
    <div>
        <NewsFilter></NewsFilter>
        <div v-if="hasPosts> 0">
            <SinglePostItem v-for="post in posts"
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
import {Action, Getter, Mutation, State} from 'vuex-class';
import {PostInterface} from '@/interfaces/post.interface';

@Component({
    components: {
         SinglePostItem,
         NewsFilter,
    },
})
export default class NewsFeed extends Vue {

    @State private posts: PostInterface[];

    @Mutation private makeStepLimit;

    @Mutation private makeStepStart;

    @Action private getPosts;

    @Getter private hasPosts;

    private onScrollBottom = throttle(() => {
      this.makeStepLimit();
      this.makeStepStart({
          isFiltered: false,
      });
      this.getPosts();
    }, 1000);

    public created() {
        window.addEventListener('scroll', this.onScrollPage);
    }

    public destroyed() {
        window.removeEventListener('scroll', this.onScrollPage);
    }

    private onScrollPage() {
        if ( window.innerHeight + window.scrollY >= (document.body.offsetHeight) ) { this.onScrollBottom(); }
    }

}
</script>

<style lang="scss">

</style>
