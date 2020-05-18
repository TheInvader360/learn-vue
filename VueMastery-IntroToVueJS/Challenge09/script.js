Vue.component('productDetails', {
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
      <productDetails :details="details"></productDetails>
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
      ]
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
