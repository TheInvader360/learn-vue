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
      <p>{{ clearanceMessage }}</p>
      <p v-if="inStock">In Stock</p>
      <p v-else :class="{ noStock: !inStock }">No Stock</p>
      <p>Shipping: {{ shipping }}</p>
      <productDetails :details="details"></productDetails>
      <div v-for="(variant, index) in variants"
           :key="variant.variantId"
           class="color-box"
           :style="{ backgroundColor: variant.variantColor }"
           @mouseover="updateProduct(index)">
      </div>
      <ul>
        <li v-for="size in sizes">{{ size }}</li>
      </ul>
      <button @click="incrementCart"
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }">Add</button>
      <button @click="decrementCart"
              :disabled="cart <= 0"
              :class="{ disabledButton: cart <= 0 }">Remove</button>
      <div class="cart">
        <p>Cart({{ cart }})</p>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      brand: 'TheInvader360',
      product: 'Socks',
      clearance: true,
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
          variantQty: 0
        }
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      cart: 0
    }
  },
  methods: {
    incrementCart: function() {
      this.cart++
    },
    decrementCart: function() {
      this.cart--
    },
    updateProduct: function(index) {
      this.selectedVariant = index
      console.log(index)
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
    clearanceMessage() {
      if (this.clearance) {
        return this.brand + ' ' + this.product + ' are reduced to clear!'
      }
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
    premium: true
  }
})
