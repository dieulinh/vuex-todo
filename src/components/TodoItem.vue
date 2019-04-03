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
          <input class="edit"
            @keyup.enter="doneEdit"
            @keyup.esc="cancelEdit"
            v-show="editing"
            v-focus="editing"
            :value="item.name"
            @blur="doneEdit"
          >
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
      ...mapActions(['toggleItem', 'removeItem', 'editItem']),
      changeItemStatus(item) {
        this.toggleItem(item);
      },
      removeItem(item) {
        console.log("You are going to remove this item");
        this.$store.commit('removeItem', item);
      },
      
      doneEdit(event) {
        const value = event.target.value.trim();
        const { item } = this;
        if (!value) {
          this.removeItem(item);
        } else if (this.editing) {
          this.editItem({item, name:value});
          this.editing = false;
        }
      }
    },
    data() {
      return {
        editing: false
      }
    },
    directives: {
      focus(el, { value }, { context }) {
        if (value) {
          context.$nextTick(() => {
            el.focus();
          });
        }
      }
    }
}
</script>
