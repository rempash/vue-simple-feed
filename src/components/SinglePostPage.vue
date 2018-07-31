<template>
   <div v-if="currentNew">
       <SinglePostItem
            :singlePost="currentNew"
            :index="this.$route.params.index"
            :options="{
                sliced: false
            }"
       ></SinglePostItem>
   </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import { PostInterface } from '@/interfaces/post.interface';
import SinglePostItem from './SinglePostItem.vue';

@Component({
    components: {
        "SinglePostItem": SinglePostItem
    }
})
export default class SinglePostPage extends Vue {

    private currentNew: PostInterface = null;

    public mounted(){
        this.currentNew = this.$store.state.posts[this.$route.params.index];
    }
    
}
</script>

<style lang="scss">
   
</style>
