// Define an interface for the product dimensions
export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

// Define an interface for the product reviews
export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

// Define an interface for the product metadata
export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

// Define an interface for individual product data
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

// Define an interface for the product response
export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
