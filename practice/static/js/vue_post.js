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
  `,
    // restartInput(){
    //   Event.$on("restart-input", (data) => {
    //     console.log("In Restart Input");
    //     this.value = ""
    //   });
    // }
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
    Event.$on("delete", (post) => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
    });
    Event.$on("submit-new-tweet", (data) => this.posts.unshift(data[0]) );
  }
});


var Post = Vue.component('post-item', {
  props: { post: {'required': true }},
  template: `
    <article class="message">
      <div class="message-header">
      <p v-text="post.fields.name"></p>
      <button v-on:click="deletePost()" class="delete"></button>
      </div>
      <div class="message-body" v-text="post.fields.description">
      </div>
    </article>`,
    // v-on:click="deleteProject()"
  methods: {
      deletePost() {
            axios.delete('/posts/', {
                data: { pk: this.post.pk }
            })
      .then(response => Event.$emit("delete", this.post))
      .catch(response => console.log('error: ' + response))
        }
    }
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
        // Event.$emit("restart-input", response.data);
        this.name = "";
        this.description = "";
        console.log('success post: '+response);
      })
      .catch(response => console.log(response))
    }
  }
});