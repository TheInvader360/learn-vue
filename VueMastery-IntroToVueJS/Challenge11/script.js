var eventBus = new Vue()

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">
      <div class="product-image">
        <img :src="image">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{ noStock: !inStock }">No Stock</p>
        <info-tabs :details="details" :shipping="shipping"></info-tabs>
        <div class="color-box"
             v-for="(variant, index) in variants"
             :key="variant.variantId"
             :style="{ backgroundColor: variant.variantColor }"
             @mouseover="switchVariant(index)">
        </div>
        <button @click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">Add</button>
        <button @click="removeFromCart">Remove</button>
        <p></p>
        <review-tabs :reviews="reviews"></review-tabs>
      </div>
    </div>
  `,
  data() {
    return {
      brand: 'TheInvader360',
      product: 'Socks',
      selectedVariant: 0,
      details: ['80% cotton', '20% polyester', 'Unisex'],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: '../assets/socks-green.jpg',
          variantQty: 10
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: '../assets/socks-blue.jpg',
          variantQty: 1
        }
      ],
      reviews: []
    }
  },
  methods: {
    addToCart: function() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    removeFromCart: function() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
    },
    switchVariant: function(index) {
      this.selectedVariant = index
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQty
    },
    shipping() {
      if (this.premium) {
        return "Free"
      }
      return "2.99"
    }
  },
  mounted() {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview)
    })
  }
})

Vue.component('info-tabs', {
  props: {
    details: {
      type: Array,
      required: true
    },
    shipping: {
      type: String,
      required: true
    }
  },
  template: `
    <div>
      <div>
        <span class="tabs"
              :class="{ activeTab: selectedTab === tab }"
              v-for="(tab, index) in tabs"
              :key="index"
              @click="selectedTab = tab">{{ tab }}</span>
      </div>
      <div v-show="selectedTab === 'Details'">
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
      </div>
      <div v-show="selectedTab === 'Shipping'">
        <p>Shipping: {{ shipping }}</p>
      </div>
    </div>
  `,
  data() {
    return {
      tabs: ['Details', 'Shipping'],
      selectedTab: 'Details'
    }
  }
})

Vue.component('review-tabs', {
  props: {
    reviews: {
      type: Array,
      required: false
    }
  },
  template: `
    <div>
      <div>
        <span class="tabs"
              :class="{ activeTab: selectedTab === tab }"
              v-for="(tab, index) in tabs"
              :key="index"
              @click="selectedTab = tab">{{ tab }}</span>
      </div>
      <div v-show="selectedTab === 'Reviews'">
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul v-else>
          <li v-for="review in reviews">
            <p>{{ review.name }} {{ review.rating }}/5</p>
          </li>
        </ul>
      </div>
      <div v-show="selectedTab === 'Add Review'">
        <product-review></product-review>
      </div>
    </div>
  `,
  data() {
    return {
      tabs: ['Reviews', 'Add Review'],
      selectedTab: 'Reviews'
    }
  }
})

Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
      <p class="error" v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
      </p>
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
      <p>
        <input type="submit" value="Submit">
      </p>
    </form>
  `,
  data() {
    return {
      name: null,
      rating: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      this.errors = []
      if(this.name && this.rating) {
        let productReview = {
          name: this.name,
          rating: this.rating
        }
        eventBus.$emit('review-submitted', productReview)
        this.name = null
        this.rating = null
      } else {
        if(!this.name) this.errors.push("Name required.")
        if(!this.rating) this.errors.push("Rating required.")
      }
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: []
  },
  methods: {
    addProductToCart(id) {
      this.cart.push(id)
    },
    removeProductFromCart(id) {
      var index = this.cart.indexOf(id)
      if (index > -1) {
        this.cart.splice(index, 1)
      }
    }
  }
})
