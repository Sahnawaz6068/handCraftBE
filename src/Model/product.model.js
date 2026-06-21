import mongoose from "mongoose";

const product = new mongoose.Schema({
    productName:{
        type:String,
        required:[true,'Product Name is Requires'],
        trim:true
    },
    slug:{
        type:String,        //productName: "Gold Heart Necklace"
        unique:true,        //slug: "gold-heart-necklace"
        lowercase:true,
        index: true
    },
    productDescription :{
        type:String,
        required:[true, 'Product description is required'],
        trim: true
    },
    price :{
        type: Number,
        required:[true, "Price is required"],
        min: [0, 'Price can not be negative']
    },
    discountPrice :{
        type:Number,
        min:0,
        default:null  //null means no discount
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['rings', 'necklaces', 'earrings', 'bracelets', 'anklets', 'other'],
    },
     weight: {
      type: Number, // in grams
    },

    dimensions: {
      length: Number,
      width: Number,
      size: String, // ring size, chain length in inches
    },

    stockQuantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
     numReviews: {
      type: Number,
      default: 0,
    },

    productImageUrl: {
      type: [String],
      required: [true, 'At least one product image is required'],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'Product must have at least one image',
      },
    },

    tags: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ['draft', 'active', 'out_of_stock', 'archived'],
      default: 'draft',
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    returnPolicy: {
      type: String,
      default: '7 days return policy',
    },

    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.virtual('inStock').get(function () {
  return this.stockQuantity > 0;
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

productSchema.index({ vendorId: 1 });
productSchema.index({ category: 1 });
productSchema.index({ productName: 'text', productDescription: 'text' }); 

const Product = mongoose.model('Product', productSchema);

export default Product;
