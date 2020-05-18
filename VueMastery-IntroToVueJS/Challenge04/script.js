var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    image: '../assets/socks-green.jpg',
    inStock: true,
    details: ['80% cotton', '20% polyester', 'Unisex'],
    variants: [
      {
        variantId: 2234,
        variantColor: 'green'
      },
      {
        variantId: 2235,
        variantColor: 'blue'
      }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  }
})

