export interface ShoeProduct {
  id: string;
  name: string;
  category: 'Sneakers' | 'Sports & Running' | 'Formal & Office' | 'Ethnic & Mojari' | 'Casual & Loafers' | 'Boots' | 'Sandals & Slippers';
  gender: 'Men' | 'Women' | 'Unisex';
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  secondaryImages?: string[];
  sizes: number[]; // UK / India sizes (e.g. 6, 7, 8, 9, 10, 11)
  colors: { name: string; hex: string }[];
  description: string;
  features: string[];
  inStock: boolean;
  badge?: 'Best Seller' | 'Trending' | 'Flat 40% Off' | 'New Arrival' | 'Hot Deal';
}

export interface CartItem {
  product: ShoeProduct;
  size: number;
  color: string;
  quantity: number;
}

export type PaymentMethod = 'UPI' | 'CARD' | 'NETBANKING' | 'COD';

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  alternatePhone?: string;
  streetAddress: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'PAID' | 'PENDING';
  transactionId?: string;
  createdAt: string;
}

export interface StoreInfo {
  name: string;
  tagline: string;
  phone: string;
  displayPhone: string;
  whatsappNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  timings: string;
  email: string;
}
