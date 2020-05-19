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
        <p>Shipping: {{ shipping }}</p>
        <product-details :details="details"></product-details>
        <div class="color-box"
            v-for="(variant, index) in variants"
            :key="variant.variantId"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)">
        </div>
        <button @click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">Add</button>
        <button @click="removeFromCart">Remove</button>
        <div>
          <p v-if="!reviews.length">There are no reviews yet.</p>
          <ul v-else>
            <li v-for="(review, index) in reviews" :key="index">
              <p>{{ review.name }} {{ review.rating }}/5 (Recommended: {{ review.recommend }})</p>
              <p>{{ review.review }}</p>
            </li>
          </ul>
        </div>
        <product-review @review-submitted="addReview"></product-review>
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
    updateProduct: function(index) {
      this.selectedVariant = index
    },
    addReview: function(productReview) {
      this.reviews.push(productReview)
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
      return 2.99
    }
  }
})

Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
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
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
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
        <p>Would you recommend this product?</p>
        <input type="radio" name="recommend" value="yes" v-model="recommend"/>Yes
        <input type="radio" name="recommend" value="no" v-model="recommend"/>No
      </p>
      <p>
        <input type="submit" value="Submit">
      </p>
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      this.errors = []
      if(this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        }
        this.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
        this.recommend = null
      } else {
        if(!this.name) this.errors.push("Name required.")
        if(!this.review) this.errors.push("Review required.")
        if(!this.rating) this.errors.push("Rating required.")
        if(!this.recommend) this.errors.push("Recommend required.")
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
      console.log('Added ' + id)
      console.log(this.cart);
    },
    removeProductFromCart(id) {
      var index = this.cart.indexOf(id)
      if (index > -1) {
        this.cart.splice(index, 1)
        console.log('Removed ' + id)
      }
      else {
        console.log('Could not remove ' + id)
      }
      console.log(this.cart);
    }
  }
})
