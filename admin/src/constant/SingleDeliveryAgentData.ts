type DeliveryAgentDetails = {
  id: number;
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  joinDate: string;
  vehicleType: string;
  vehicleNumber: string;
  bankDetails: {
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
  };
};

export const deliveryAgentData: DeliveryAgentDetails = {
  id: 1,
  name: "Rajesh Kumar",
  email: "rajesh.kumar@delivery.com",
  phone: "+91 98765 43210",
  profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  joinDate: "2023-08-15T00:00:00Z",
  vehicleType: "Motorcycle",
  vehicleNumber: "UP 32 AB 1234",
  bankDetails: {
    bankName: "State Bank of India",
    accountNumber: "12345678901234",
    ifscCode: "SBIN0001234",
    accountHolderName: "Rajesh Kumar"
  }
};