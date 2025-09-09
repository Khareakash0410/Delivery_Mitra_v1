interface MonthlyData {
  month: string;
  shortMonth: string;
  earnings: number;
  orders: number;
}

export const mockData: MonthlyData[] = [
  { month: 'January 2024', shortMonth: 'Jan', earnings: 15000, orders: 45 },
  { month: 'February 2024', shortMonth: 'Feb', earnings: 18500, orders: 52 },
  { month: 'March 2024', shortMonth: 'Mar', earnings: 22000, orders: 68 },
  { month: 'April 2024', shortMonth: 'Apr', earnings: 19200, orders: 58 },
  { month: 'May 2024', shortMonth: 'May', earnings: 25000, orders: 72 },
  { month: 'June 2024', shortMonth: 'Jun', earnings: 21800, orders: 65 },
  { month: 'July 2024', shortMonth: 'Jul', earnings: 28000, orders: 85 },
  { month: 'August 2024', shortMonth: 'Aug', earnings: 31000, orders: 92 },
  { month: 'September 2024', shortMonth: 'Sep', earnings: 26500, orders: 78 },
  { month: 'October 2024', shortMonth: 'Oct', earnings: 29000, orders: 88 },
  { month: 'November 2024', shortMonth: 'Nov', earnings: 33000, orders: 95 },
  { month: 'December 2024', shortMonth: 'Dec', earnings: 35000, orders: 102 }
];