interface OrderItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  platformFees: number;
  options: Record<string, string>;
}

interface Order {
  id: string;
  orderDate: string;
  items: OrderItem[];
}


export const orderData: Order = {
    id: 'ORD-2024-001',
    orderDate: '2024-08-16T10:30:00',
    items: [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        category: 'Electronics',
        quantity: 2,
        price: 79.99,
        platformFees: 5.00,
        options: { color: 'Black', size: 'Medium' }
      },
      {
        id: 2,
        name: 'Smartphone Case',
        category: 'Electronics',
        quantity: 1,
        price: 24.99,
        platformFees: 4.00,
        options: { color: 'Blue', material: 'Silicone' }
      },
      {
        id: 3,
        name: 'USB-C Cable',
        category: 'Electronics',
        quantity: 3,
        price: 12.99,
        platformFees: 2.00,
        options: { length: '6ft' }
      }
    ],
}