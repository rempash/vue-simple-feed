<template>
   <div v-if="currentPost">
       <a class="back" @click="goBack()">
            <i class="fas fa-chevron-circle-left"></i>
       </a>
       <SinglePostItem
            :post="currentPost"
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
         SinglePostItem
    }
})
export default class SinglePostPage extends Vue {

    private currentPost: PostInterface = null;

    public mounted(){
        if (this.$store.getters.hasPosts > 0){
            this.currentPost = this.$store.getters.getPostById(this.$route.params.id);
        }else this.$store.dispatch({ 
                type: 'getPostById', 
                id: this.$route.params.id 
            }).then(post => this.currentPost = post);
    }

    private goBack(){
        this.$router.push({ name: 'home' });
    }
    
}
</script>

<style lang="scss">
   
</style>
