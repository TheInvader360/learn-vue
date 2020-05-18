var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    image: './assets/socks-green.jpg',
    inStock: false,
    details: ['80% cotton', '20% polyester', 'Unisex'],
    variants: [
      {
        variantId: 2234,
        variantColor: 'green',
        variantImage: '../assets/socks-green.jpg'
      },
      {
        variantId: 2235,
        variantColor: 'blue',
        variantImage: '../assets/socks-blue.jpg'
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
    updateProduct: function(variantImage) {
      this.image = variantImage
    }
  }
})

