window.Event = new Vue();

class Errors {
	constructor() {
		this.errors = {};
	}
	set(errors) {
		this.errors = errors;
	}
	has(field) {
		return this.errors.hasOwnProperty(field);
	}
	any() {
		return Object.keys(this.errors).length > 0;
	}
	get(field) {
		if(this.errors[field]) {
			return this.errors[field][0]
		}
	}
	clear(field) {
		delete this.errors[field];
	}
}

class Form {
	constructor(data) {
		this.originalData = data;
		this.errors = new Errors();
		for (let field in data) {
            this[field] = data[field];
        }
	}
	reset() {
		for (let field in this.originalData) {
			this[field] = '';
		}
	}
	data() {
		let data = Object.assign({}, this);
		delete data.originalData;
		delete data.errors;
		return data
	}
	submit(method, url) {
		axios({
		  method: method,
		  url: url,
		  data: this.data()
		})
		.then(response => this.callback(response.data))
		.catch(response => console.log('submit error: '+ response))
	}
	callback(data) {
		if (data.errors) {
			this.errors.set(data.errors);
		} else {
			Event.$emit("submit", data);
			this.reset();
		}
	}
}


Vue.component('signup', {
	// props: ['username', 'password'],
	template: `
		<h2> Create your account </h2>
		<input type="text" id="username" name="username" placeholder="Username" v-model="username" maxlength="50">
		<input type="password" id="password" name="password" placeholder="password" v-model="password">
		<button type="submit" v-on:click="signUP()"> Sign Up </button>
	`,
	// methods: {

	// }
});

signup = new Vue({
	el: '#signup',
	data: {
		username: '',
		password: ''
	},
	methods: {
		signUp(){
			axios.post('',{
				url: '',
				data: {
					username: this.username,
					password: this.password,
				},
				headers: {
			    	"X-CSRFToken": document.cookie.split('csrftoken=').pop(), 
			  	}
			})
			.then(response => console.log(response))
			.catch(response => console.log('error: ' + response))
		}
	}
});