export interface Payments {
  id: string;
  customerName: string;
  amount: number;
  date: string;
  paymentType: string;
}

interface PaymentData {
  payments: Payments[];
}

export  const paymentData: PaymentData = {
    payments: [
      { id: '1', customerName: 'iPhone 14 Pro', amount: 999, date: "2024-08-16", paymentType: 'cash' },
      { id: '2', customerName: 'Samsung Galaxy S23', amount: 799, date: "2024-08-17", paymentType: 'card' },
      { id: '3', customerName: 'Nike Air Max', amount: 129, date: "2024-08-18", paymentType: 'upi' },
      { id: '4', customerName: 'Adidas Ultraboost', amount: 179, date: "2024-08-19", paymentType: 'cash' },
      { id: '5', customerName: 'MacBook Pro M2', amount: 1299, date: "2024-08-20", paymentType: 'card' },
      { id: '6', customerName: 'Dell XPS 13', amount: 899, date: "2024-08-21", paymentType: 'cash' },
      { id: '7', customerName: 'Puma Running Shoes', amount: 89, date: "2024-08-22", paymentType: 'card' },
      { id: '8', customerName: 'Canon EOS R5', amount: 3899, date: "2024-08-23", paymentType: 'cash' },
      { id: '11', customerName: 'iPhone 14 Pro', amount: 999, date: "2024-08-24", paymentType: 'upi' },
      { id: '21', customerName: 'Samsung Galaxy S23', amount: 799, date: "2024-08-25", paymentType: 'upi' },
      { id: '31', customerName: 'Nike Air Max', amount: 129, date: "2024-08-26", paymentType: 'upi' },
      { id: '41', customerName: 'Adidas Ultraboost', amount: 179, date: "2024-08-27", paymentType: 'cash' },
      { id: '51', customerName: 'MacBook Pro M2', amount: 1299, date: "2024-08-28", paymentType: 'upi' },
      { id: '61', customerName: 'Dell XPS 13', amount: 899, date: "2024-08-29", paymentType: 'upi' },
      { id: '71', customerName: 'Puma Running Shoes', amount: 89, date: "2024-08-30", paymentType: 'cash' },
      { id: '81', customerName: 'Canon EOS R5', amount: 3899, date: "2024-08-31", paymentType: 'upi' },
    ]
}