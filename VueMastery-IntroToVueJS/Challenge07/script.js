var app = new Vue({
  el: '#app',
  data: {
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
    }
  }
})
