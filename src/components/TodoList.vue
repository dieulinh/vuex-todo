<template>
  <div class="todo-list">
    <!-- start TodoItem form -->
    <b-alert v-if="errors.has('item')" show dismissible variant="danger">{{ errors.first('item') }}</b-alert>
    <b-form class="row" @submit.prevent="onSubmit">
      <b-col cols="10">
        <b-form-input id="item" 
          class="w-100" placeholder="What do you want to buy?"
          v-model="item"
          type="text"
          v-validate="'required'"
          autocomplete="off"
        ></b-form-input>
      </b-col>
      <b-col cols="2">
        <b-button type="submit" variant="primary">Add item</b-button>
      </b-col>
    </b-form>

    <!-- Start of the list -->
    <b-row>
      <b-col md="10">
        <b-list-group>
          <b-list-group-item>
            <TodoItem v-for="(item, index) in items" :key="index" :item="item"></TodoItem>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
    
  </div>

  
</template>
<script>
import { mapState, mapActions } from 'vuex';
import TodoItem from './TodoItem.vue'

export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  data() {
    return {
      item: ''
    }
  },
  computed: {
    ...mapState([
      'items'
    ]),
  },
  methods: {
    ...mapActions(['addItem']),
    async onSubmit() {
      const isValid = await this.$validator.validateAll();
      if (isValid) {
        await this.addItem(this.item);
        this.item = '';
        this.$validator.reset();
      }
    }
  }
};
</script>