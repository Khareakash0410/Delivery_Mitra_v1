export interface SellerEarning {
  sellerId: string;
  sellerName: string;
  category: string;
  amount: number;
  commission: number;
}

export interface PaymentRow {
  paymentId: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  paymentDate: string;
  paymentMethod: string;
  sellers: SellerEarning[];
}


export const generatePayments = {
   basePayments : [
    {
      paymentId: "PAY-1001",
      orderId: "ORD-2001",
      customerName: "Rahul Sharma",
      customerEmail: "rahul.sharma@email.com",
      totalAmount: 2500,
      paymentDate: "2024-08-15T10:30:00Z",
      status: "completed" as const,
      paymentMethod: "UPI",
      sellers: [
        { sellerId: "S001", sellerName: "Fashion Hub Store", category: "Clothing", amount: 1500, commission: 150 },
        { sellerId: "S002", sellerName: "Tech World Electronics", category: "Electronics", amount: 1000, commission: 100 },
      ],
    },
    {
      paymentId: "PAY-1002",
      orderId: "ORD-2002",
      customerName: "Anjali Singh",
      customerEmail: "anjali.singh@email.com",
      totalAmount: 1800,
      paymentDate: "2024-08-14T15:45:00Z",
      status: "completed" as const,
      paymentMethod: "Credit Card",
      sellers: [
        { sellerId: "S003", sellerName: "Book Paradise", category: "Books", amount: 1200, commission: 120 },
        { sellerId: "S004", sellerName: "Home Essentials", category: "Home & Garden", amount: 600, commission: 60 },
      ],
    },
    {
      paymentId: "PAY-1003",
      orderId: "ORD-2003",
      customerName: "Vikram Patel",
      customerEmail: "vikram.patel@email.com",
      totalAmount: 3200,
      paymentDate: "2024-08-13T09:15:00Z",
      status: "pending" as const,
      paymentMethod: "Net Banking",
      sellers: [
        { sellerId: "S001", sellerName: "Fashion Hub Store", category: "Clothing", amount: 2000, commission: 200 },
        { sellerId: "S005", sellerName: "Sports Arena", category: "Sports", amount: 1200, commission: 120 },
      ],
    },
    {
      paymentId: "PAY-1004",
      orderId: "ORD-2004",
      customerName: "Priya Gupta",
      customerEmail: "priya.gupta@email.com",
      totalAmount: 4500,
      paymentDate: "2024-08-12T14:20:00Z",
      status: "completed" as const,
      paymentMethod: "UPI",
      sellers: [
        { sellerId: "S006", sellerName: "Beauty Bliss", category: "Beauty", amount: 2500, commission: 250 },
        { sellerId: "S007", sellerName: "Gadget Galaxy", category: "Electronics", amount: 2000, commission: 200 },
      ],
    },
    {
      paymentId: "PAY-1005",
      orderId: "ORD-2005",
      customerName: "Arjun Mehta",
      customerEmail: "arjun.mehta@email.com",
      totalAmount: 1200,
      paymentDate: "2024-08-11T11:10:00Z",
      status: "failed" as const,
      paymentMethod: "Credit Card",
      sellers: [
        { sellerId: "S008", sellerName: "Kitchen King", category: "Kitchen", amount: 1200, commission: 120 },
      ],
    },
    {
      paymentId: "PAY-1006",
      orderId: "ORD-2001",
      customerName: "Rahul Sharma",
      customerEmail: "rahul.sharma@email.com",
      totalAmount: 2500,
      paymentDate: "2024-08-15T10:30:00Z",
      status: "completed" as const,
      paymentMethod: "UPI",
      sellers: [
        { sellerId: "S001", sellerName: "Fashion Hub Store", category: "Clothing", amount: 1500, commission: 150 },
        { sellerId: "S002", sellerName: "Tech World Electronics", category: "Electronics", amount: 1000, commission: 100 },
      ],
    },
    {
      paymentId: "PAY-1007",
      orderId: "ORD-2002",
      customerName: "Anjali Singh",
      customerEmail: "anjali.singh@email.com",
      totalAmount: 1800,
      paymentDate: "2024-08-14T15:45:00Z",
      status: "completed" as const,
      paymentMethod: "Credit Card",
      sellers: [
        { sellerId: "S003", sellerName: "Book Paradise", category: "Books", amount: 1200, commission: 120 },
        { sellerId: "S004", sellerName: "Home Essentials", category: "Home & Garden", amount: 600, commission: 60 },
      ],
    },
    {
      paymentId: "PAY-1008",
      orderId: "ORD-2003",
      customerName: "Vikram Patel",
      customerEmail: "vikram.patel@email.com",
      totalAmount: 3200,
      paymentDate: "2024-08-13T09:15:00Z",
      status: "pending" as const,
      paymentMethod: "Net Banking",
      sellers: [
        { sellerId: "S001", sellerName: "Fashion Hub Store", category: "Clothing", amount: 2000, commission: 200 },
        { sellerId: "S005", sellerName: "Sports Arena", category: "Sports", amount: 1200, commission: 120 },
      ],
    },
    {
      paymentId: "PAY-1009",
      orderId: "ORD-2004",
      customerName: "Priya Gupta",
      customerEmail: "priya.gupta@email.com",
      totalAmount: 4500,
      paymentDate: "2024-08-12T14:20:00Z",
      status: "completed" as const,
      paymentMethod: "UPI",
      sellers: [
        { sellerId: "S006", sellerName: "Beauty Bliss", category: "Beauty", amount: 2500, commission: 250 },
        { sellerId: "S007", sellerName: "Gadget Galaxy", category: "Electronics", amount: 2000, commission: 200 },
      ],
    },
    {
      paymentId: "PAY-1010",
      orderId: "ORD-2005",
      customerName: "Arjun Mehta",
      customerEmail: "arjun.mehta@email.com",
      totalAmount: 1200,
      paymentDate: "2024-08-11T11:10:00Z",
      status: "failed" as const,
      paymentMethod: "Credit Card",
      sellers: [
        { sellerId: "S008", sellerName: "Kitchen King", category: "Kitchen", amount: 1200, commission: 120 },
      ],
    },
  ]
};