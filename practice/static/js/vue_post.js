window.Event = new Vue();


var InputVue = Vue.component('custom-input', {
  props: {
    value: String
  },
  // data: function() {
  //   return {
  //     value: ''
  //   }
  // },
  // ['value'],
  template: `
    <input
      v-bind:value="value" 
      v-on:input="$emit('input', $event.target.value)" 
    >
  `
});


var PostList = Vue.component('post-list', {
  data: function(){
    return {
      posts: []
    }
  },
  mounted() {
    axios({
      method: 'GET',
      url: '/posts/',
    })
    .then((response) => {
      console.log(response);
      this.posts = response.data;
    })
    .catch((response) => {
      console.log(response);
    });
  },
  created() {
    // Event.$on("delete", (post) )
    Event.$on("submit-new-tweet", (data) => this.posts.push(data[0]) );
  }
});


var Post = Vue.component('post-item', {
  props: { post: {'required': true }},
  template: `
    <article class="message">
      <div class="message-header">
      <p v-text="post.fields.name"></p>
      <button class="delete"></button>
      </div>
      <div class="message-body" v-text="post.fields.description">
      </div>
    </article>`,
    // v-on:click="deleteProject()"
  // methods: {
  //     deleteProject() {
  //           axios.delete('/post/', {
  //               data: { pk: this.post.pk }
  //           })
  //     .then(response => Event.$emit("delete", this.post))
  //     .catch(response => console.log('error: ' + response))
  //       }
  //   }
});


var vue_post = new Vue({
  delimiters: ['[[', ']]'],
  el: '#app',
  data: {
    name: '',
    description: ''
  },
  methods: {
    addPost: function(){
      axios({
        method: 'POST',
        url: '/posts/',
        data: {
          name: this.name,
          description: this.description
        },
      })
      .then(response => {
        Event.$emit("submit-new-tweet", response.data);
        console.log('success post: '+response);
      })
      .catch(response => console.log(response))
    }
  }
});