<template>
    <div v-if="$store.state.posts">
        <SinglePostItem v-for="(singlePost, index) in $store.state.posts" 
                :key="singlePost.id" 
                :index="index" 
                :singlePost="singlePost"
                :options="{
                    sliced: true
                }"
        ></SinglePostItem>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import SinglePostItem from './SinglePostItem.vue';

@Component({
    components: {
        "SinglePostItem": SinglePostItem
    }
})
export default class NewsFeed extends Vue {

    private getPosts() {
        this.$store.dispatch('getPosts');
    }

}
</script>

<style lang="scss">

</style>
