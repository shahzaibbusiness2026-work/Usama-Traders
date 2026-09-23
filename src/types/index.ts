export type ActiveView = 'home' | 'catalog' | 'product' | 'dashboard';

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: string;
  type: string;
  material?: string;
  finish: string;
  dimensions: string;
  price: number;
  priceUnit: string;
  currency: string;
  image: string;
  gallery?: string[];
  badge?: 'New' | 'Bestseller' | 'Premium Collection' | 'FEATURED' | 'BESTSELLER' | 'NEW' | 'PREMIUM' | 'TRENDING' | 'EXCLUSIVE' | string;
  rating?: number;
  reviewsCount?: number;
  inStock: boolean;
  stockCount?: number;
  stockUnit?: string;
  description?: string;
  specs?: Record<string, string>;
  applications?: string[];
  brand?: string;
}

export interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  linkParam?: string;
}

export interface BOQProject {
  id: string;
  number: string;
  projectName: string;
  location: string;
  value: number;
  formattedValue: string;
  stage: 'Negotiation' | 'Quotation Sent' | 'Design Review' | 'Client Review';
  lastUpdate: string;
}

export interface SampleDispatchItem {
  id: string;
  number: string;
  productSampleSet: string;
  requestedBy: string;
  project: string;
  status: 'Ready' | 'Packed' | 'In Transit' | 'Preparing';
  dispatchDate: string;
}

export interface InventoryDepletionItem {
  id: string;
  name: string;
  specs: string;
  remaining: number;
  unit: string;
  status: 'Low Stock';
  image: string;
}

export interface IncomingShipmentItem {
  id: string;
  title: string;
  eta: string;
  status: 'In Transit' | 'Confirmed' | 'Processing';
}

export interface TopProductItem {
  id: string;
  name: string;
  category: string;
  specs: string;
  stock: string;
  image: string;
  status: 'In Stock';
}

export interface FilterState {
  productTypes: string[];
  applications: string[];
  finishes: string[];
  sizes: string[];
  brands: string[];
  stockStatus: string[];
  minPrice: string;
  maxPrice: string;
  sortBy: string;
  searchQuery: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedThickness?: string;
  notes?: string;
}

export interface CommercialOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  companyOrFirm: string;
  projectSite: string;
  itemsSummary: string;
  itemCount: number;
  totalAmount: number;
  formattedAmount: string;
  paymentStatus: 'Paid' | '50% Advance' | 'Net 30 Credit' | 'Pending';
  deliveryStatus: 'Processing' | 'Dispatched' | 'In Transit' | 'Delivered' | 'On Hold';
  orderDate: string;
  expectedDelivery: string;
  carrier: string;
  trackingNumber: string;
}

export interface ArchitectPartner {
  id: string;
  firmName: string;
  contactPerson: string;
  role: string;
  email: string;
  phone: string;
  city: string;
  tier: 'Platinum Partner' | 'Gold Specifier' | 'Silver Member';
  activeProjects: number;
  lifetimeBOQValue: string;
  specialty: string;
  lastMeeting: string;
}

export interface WarehouseInventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  brand: string;
  specs: string;
  warehouse: string;
  binLocation: string;
  availableStock: number;
  reorderLevel: number;
  unit: string;
  costPrice: number;
  tradePrice: number;
  status: 'In Stock' | 'Low Stock' | 'Critical' | 'Incoming';
  image: string;
}

