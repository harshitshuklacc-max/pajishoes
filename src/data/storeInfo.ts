import { StoreInfo } from '../types';

export const STORE_INFO: StoreInfo = {
  name: 'Paji Shoes',
  tagline: "Durg's Trusted Footwear Showroom",
  phone: '8839018919',
  displayPhone: '+91 8839018919',
  whatsappNumber: '918839018919',
  address: 'Shop No. 12, Station Road, Opp. Indira Market Complex',
  landmark: 'Near Durg Railway Station',
  city: 'Durg',
  state: 'Chhattisgarh',
  pincode: '491001',
  timings: 'Monday - Sunday: 10:00 AM - 09:30 PM',
  email: 'pajishoesdurg@gmail.com',
};

export function getProductWhatsAppUrl(productName: string, size?: number, color?: string, price?: number): string {
  const text = encodeURIComponent(
    `Namaste Paji Shoes Durg! 🙏\n\nI want to book / check availability for:\n👟 *Product:* ${productName}\n${size ? `📏 *Size:* UK/IND ${size}\n` : ''}${color ? `🎨 *Color:* ${color}\n` : ''}${price ? `💰 *Price:* ₹${price.toLocaleString('en-IN')}\n` : ''}\n📍 *Store Location:* Durg, Chhattisgarh\n\nPlease let me know if this is in stock and how fast you can deliver or hold it for store pickup.`
  );
  return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${text}`;
}

export function getGeneralWhatsAppUrl(): string {
  const text = encodeURIComponent(
    `Namaste Paji Shoes Durg! 🙏\n\nI would like to inquire about latest shoe arrivals and footwear collection at your Durg store. Phone: 8839018919.`
  );
  return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${text}`;
}

export function getOrderWhatsAppUrl(orderId: string, customerName: string, totalAmount: number, itemsSummary: string, paymentMethod: string, address: string): string {
  const text = encodeURIComponent(
    `Namaste Paji Shoes Durg! 🛍️\n\nI have placed an order on your website:\n*Order ID:* #${orderId}\n*Customer:* ${customerName}\n*Total Amount:* ₹${totalAmount.toLocaleString('en-IN')} (${paymentMethod})\n\n*Items Ordered:*\n${itemsSummary}\n\n*Delivery Address:*\n${address}\n\nPlease confirm dispatch and delivery timeframe in Durg / Chhattisgarh. Thank you!`
  );
  return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${text}`;
}
