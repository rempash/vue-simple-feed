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
import {Action} from 'vuex-class';

@Component({
    components: {
         SinglePostItem,
    },
})
export default class SinglePostPage extends Vue {

    @Action private getPostById;

    private currentPost: PostInterface = null;

    public mounted() {
        const id: string = this.$route.params.id;
        if (this.$store.getters.hasPosts > 0) {
            this.currentPost = this.$store.getters.getPostById(id);
        } else { this.getPostById({
                id,
            }).then((post) => this.currentPost = post);
        }
    }

    private goBack() {
        this.$router.push({ name: 'home' });
    }

}
</script>

<style lang="scss">
   
</style>
