interface BankDetails {
  accountNumber: string;
  ifscCode: string;
  bankName: string;
}


interface VendorData {
  id: string;
  name: string;
  logo: string;
  location: string;
  tagline: string;
  email: string;
  phone: string;
  joinDate: string;
  bankDetails: BankDetails;
}

export const vendor: VendorData = {
    id: '1',
    name: 'Spice Garden Restaurant',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop&crop=center',
    location: 'Connaught Place, New Delhi, India',
    tagline: 'Authentic Indian Flavors in Every Bite',
    email: 'contact@spicegarden.com',
    phone: '+91 9876543210',
    joinDate: '2024-01-15',
    bankDetails: {
      accountNumber: '1234567890123456',
      ifscCode: 'HDFC0001234',
      bankName: 'HDFC Bank',
    }
}