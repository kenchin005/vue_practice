var app = new Vue({
    el: '#app',
    data: {
        product: 'socks',
        image: './img/socks_green.png',
        // inventry:0
        inStock:true,
        details:["80% cotton","20% ポリエステル","gender-neutral"],
        variants:[
            {
                variantId: 2234,
                variantColor: "green",
                variantImage:'./img/socks_green.png'
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: './img/socks_blue.png'
            }
        ],
        cart:0
    },
    methods: {
        addToCart: function (){
            this.cart += 1
        },
        updateProduct: function(variantImage){
                this.image = variantImage
        
        }
    }
})