Vue.component('product',{
    props:{
        premium:{
            type:Boolean,
            required:true
        }
    },
    template: `
    <div class="product">

            <div class="product_image">
                <img v-bind:src="image">
            </div>

            <div class="product_info">
                <h1>{{ title }}</h1>
                <p v-if="inStock">in Stock</p>
                <!-- <p v-else-if="inventry <= 10 && inventry > 0">Almost sold out!</p> -->
                <p v-else class="{outOfStock: !inStock}">out of Stock</p>
                <p>shipping:{{ shipping }}</p>

                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>

                <div class="color_box" v-for="(variant, index) in variants" 
                    :key="variant.variantId"
                    :style="{backgroundColor: variant.variantColor }" 
                    @mouseover="updateProduct(index)" >
                    
                </div>

                <button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disableButton: !inStock }"
                >カートに入れる</button>




            </div>

            <div>
                <h2>レビュー</h2>
                <p v-if="!reviews.length">まだレビューはありません</p>
                <ul>
                    <li v-for="review in reviews">
                    
                        <p>{{ review.name }}</p>
                        <p>Rating{{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                        
                    </li>
                </ul>
            </div>

            <product_review @review_submitted="addReview"></product_review>


        </div>
    `,
    data() {
        return {
            brand: 'vue mastery',
            product: 'socks',
            //image: './img/socks_green.png',
            selectedVariant:0,
            // inventry:0
            //inStock:true,
            details:["80% cotton","20% ポリエステル","gender-neutral"],
            variants:[
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage:'./img/socks_green.png',
                    variantQuantity:10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: './img/socks_blue.png',
                    variantQuantity:0
                }
            ],
            reviews:[]
            
        }
    } ,
    methods: {
        addToCart: function (){
            // this.cart += 1
            this.$emit('add_to_cart',this.variants[this.selectedVariant].variantId)
        },
        updateProduct: function(index){
                this.selectedVariant = index
                console.log(index)
        
        },
        addReview(productReviw){
            this.reviews.push(productReviw)
        }
    },
    computed:{
        title(){
            return this.brand + '' + this.product
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping(){
            if(this.premium){
                return "Free"
            }
            return "1000"
        }
    }
})


Vue.component('product_review',{
    template:`
    <form class="review_form" @submit.prevent="onSubmit">
    
    <p v-if="errors.length">
        <b>エラーです:(s)</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
    </p>
    
    
    <p>
        <label for="name">name:</label>
        <input v-model="name" id="name" placeholder="name">
    </p>
    <p>
        <label for="review">review:</label>
        <textarea id="review" v-model="review" placeholder="review" required></textarea>

    </p>
    <p>
        <label for="rating">rating:</label>
        <select  id="rating" v-model.number="rating">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
    </select>
    </p>
    <p>
        <input type="submit" value="Submit">
    </p>
</form>
    `,
    data(){
        return {
            name:null,
            review:null,
            rating:null,
            errors:[]
        }
    },
    methods:{
        onSubmit(){
            if(this.name && this.review && this.rating){
                let productReviw = {
                    name:this.name,
                    review:this.review,
                    rating:this.rating
                }
                this.$emit('review_submitted',productReviw)
                this.name = null,
                this.review = null,
                this.rating = null
            }
            else{
                if(!this.name)this.erros.push("name required")
                if(!this.review)this.erros.push("review required")
                if(!this.rating)this.erros.push("rating required")
            }
        }
    }
})


var app = new Vue({
    el: '#app',
    data:{
        premium:false,
        cart:[]
    },
    methods:{
        updateCart(id){
            this.cart.push(id)
        }
    }
})