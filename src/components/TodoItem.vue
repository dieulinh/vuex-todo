<template>

  <div class="todo-item">
    <b-list-group-item v-bind:class="{checked: item.done}">
      <b-row>
        <b-col cols="1">
          <b-form-checkbox 
            :checked="item.done"
            @change="changeItemStatus(item)">
          </b-form-checkbox>
          
        </b-col>
        <b-col cols="6">
          <span v-if="!editing" @dblclick="editing = true">{{ item.name }} </span>

        </b-col>
        <b-col cols="3">
          <b-button-close @click="removeItem(item)">Remove</b-button-close>
        </b-col>
      </b-row>
    </b-list-group-item>
    
  </div>
  
</template>
<script>
  import { mapActions } from 'vuex';
  export default {
    name: 'TodoItem',
    props: ['item'],
    methods: {
      ...mapActions(['toggleItem', 'removeItem']),
      changeItemStatus(item) {
        this.toggleItem(item);
      },
      removeItem(item) {
        console.log("You are going to remove this item");
        this.$store.commit('removeItem', item);
      }
    },
    data() {
      return {
        editing: false
      }
    }
}
</script>
