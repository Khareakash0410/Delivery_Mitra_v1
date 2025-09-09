export interface Order {
  id: string;
  customerName: string;
  orderPrice: number;
  status: 'pending' | 'accepted' | 'rejected';
  orderDate: string;
  items?: OrderItem[];
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface OrderData {
  orders: Order[];
  total: number;
}

export const orderData: OrderData = {
  orders: [
    {
      id: "ORD001",
      customerName: "John Doe",
      orderPrice: 2500,
      status: "pending",
      orderDate: "2024-08-15T10:30:00Z",
      items: [
        {
          productId: "PRD001",
          productName: "Product A",
          quantity: 2,
          price: 1250
        }
      ]
    },
    {
      id: "ORD002",
      customerName: "Jane Smith",
      orderPrice: 3200,
      status: "accepted",
      orderDate: "2024-08-15T09:15:00Z",
      items: [
        {
          productId: "PRD002",
          productName: "Product B",
          quantity: 1,
          price: 3200
        }
      ]
    },
    {
      id: "ORD003",
      customerName: "Mike Johnson",
      orderPrice: 1800,
      status: "rejected",
      orderDate: "2024-08-15T08:45:00Z",
      items: [
        {
          productId: "PRD003",
          productName: "Product C",
          quantity: 3,
          price: 600
        }
      ]
    },
    {
      id: "ORD004",
      customerName: "Sarah Wilson",
      orderPrice: 4500,
      status: "pending",
      orderDate: "2024-08-14T16:20:00Z",
      items: [
        {
          productId: "PRD004",
          productName: "Product D",
          quantity: 1,
          price: 4500
        }
      ]
    },
    {
      id: "ORD005",
      customerName: "David Brown",
      orderPrice: 2100,
      status: "accepted",
      orderDate: "2024-08-14T14:30:00Z",
      items: [
        {
          productId: "PRD005",
          productName: "Product E",
          quantity: 2,
          price: 1050
        }
      ]
    },
    {
      id: "ORD006",
      customerName: "Emily Davis",
      orderPrice: 3800,
      status: "pending",
      orderDate: "2024-08-14T13:15:00Z",
      items: [
        {
          productId: "PRD006",
          productName: "Product F",
          quantity: 1,
          price: 3800
        }
      ]
    },
    {
      id: "ORD007",
      customerName: "Robert Miller",
      orderPrice: 1500,
      status: "rejected",
      orderDate: "2024-08-14T11:00:00Z",
      items: [
        {
          productId: "PRD007",
          productName: "Product G",
          quantity: 2,
          price: 750
        }
      ]
    },
    {
      id: "ORD008",
      customerName: "Lisa Anderson",
      orderPrice: 5200,
      status: "accepted",
      orderDate: "2024-08-13T17:45:00Z",
      items: [
        {
          productId: "PRD008",
          productName: "Product H",
          quantity: 1,
          price: 5200
        }
      ]
    },
    {
      id: "ORD009",
      customerName: "Thomas Taylor",
      orderPrice: 2900,
      status: "pending",
      orderDate: "2024-08-13T15:30:00Z",
      items: [
        {
          productId: "PRD009",
          productName: "Product I",
          quantity: 3,
          price: 967
        }
      ]
    },
    {
      id: "ORD010",
      customerName: "Jennifer White",
      orderPrice: 3600,
      status: "accepted",
      orderDate: "2024-08-13T12:15:00Z",
      items: [
        {
          productId: "PRD010",
          productName: "Product J",
          quantity: 2,
          price: 1800
        }
      ]
    },
    {
      id: "ORD011",
      customerName: "Christopher Lee",
      orderPrice: 2200,
      status: "pending",
      orderDate: "2024-08-12T16:00:00Z",
      items: [
        {
          productId: "PRD011",
          productName: "Product K",
          quantity: 1,
          price: 2200
        }
      ]
    },
    {
      id: "ORD012",
      customerName: "Amanda Garcia",
      orderPrice: 1750,
      status: "rejected",
      orderDate: "2024-08-12T14:20:00Z",
      items: [
        {
          productId: "PRD012",
          productName: "Product L",
          quantity: 2,
          price: 875
        }
      ]
    },
    {
      id: "ORD013",
      customerName: "Kevin Martinez",
      orderPrice: 4100,
      status: "accepted",
      orderDate: "2024-08-12T11:30:00Z",
      items: [
        {
          productId: "PRD013",
          productName: "Product M",
          quantity: 1,
          price: 4100
        }
      ]
    },
    {
      id: "ORD014",
      customerName: "Michelle Rodriguez",
      orderPrice: 3300,
      status: "pending",
      orderDate: "2024-08-11T18:45:00Z",
      items: [
        {
          productId: "PRD014",
          productName: "Product N",
          quantity: 3,
          price: 1100
        }
      ]
    },
    {
      id: "ORD015",
      customerName: "Daniel Thompson",
      orderPrice: 2800,
      status: "accepted",
      orderDate: "2024-08-11T16:10:00Z",
      items: [
        {
          productId: "PRD015",
          productName: "Product O",
          quantity: 2,
          price: 1400
        }
      ]
    },
    {
      id: "ORD016",
      customerName: "Ashley Wilson",
      orderPrice: 1950,
      status: "pending",
      orderDate: "2024-08-11T13:25:00Z",
      items: [
        {
          productId: "PRD016",
          productName: "Product P",
          quantity: 1,
          price: 1950
        }
      ]
    }
  ],
  total: 16
}