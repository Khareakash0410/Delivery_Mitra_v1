export interface Vendor {
  id: string;
  name: string;
  location: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'active' | 'inactive';
}


export const vendorData = {
  vendors: [
    {
      id: '1',
      name: 'Ramesh Food Corner',
      location: 'Mumbai, Maharashtra',
      email: 'ramesh@foodcorner.com',
      phone: '9876543210',
      joinDate: '2024-01-15',
      status: 'active' as const
    },
    {
      id: '2',
      name: 'Priya Sweets & Snacks',
      location: 'Delhi, India',
      email: 'priya@sweetssnacks.com',
      phone: '9876543211',
      joinDate: '2024-02-20',
      status: 'active' as const
    },
    {
      id: '3',
      name: 'South Spice Kitchen',
      location: 'Bangalore, Karnataka',
      email: 'info@southspice.com',
      phone: '9876543212',
      joinDate: '2024-03-10',
      status: 'inactive' as const
    },
    {
      id: '4',
      name: 'Punjab Dhaba',
      location: 'Chandigarh, Punjab',
      email: 'contact@punjabdhaba.com',
      phone: '9876543213',
      joinDate: '2024-01-25',
      status: 'active' as const
    },
    {
      id: '5',
      name: 'Coastal Cuisine',
      location: 'Goa, India',
      email: 'hello@coastalcuisine.com',
      phone: '9876543214',
      joinDate: '2024-02-28',
      status: 'active' as const
    },
    {
      id: '11',
      name: 'Ramesh Food Corner',
      location: 'Mumbai, Maharashtra',
      email: 'ramesh@foodcorner.com',
      phone: '9876543210',
      joinDate: '2024-01-15',
      status: 'active' as const
    },
    {
      id: '21',
      name: 'Priya Sweets & Snacks',
      location: 'Delhi, India',
      email: 'priya@sweetssnacks.com',
      phone: '9876543211',
      joinDate: '2024-02-20',
      status: 'active' as const
    },
    {
      id: '31',
      name: 'South Spice Kitchen',
      location: 'Bangalore, Karnataka',
      email: 'info@southspice.com',
      phone: '+9876543212',
      joinDate: '2024-03-10',
      status: 'inactive' as const
    },
    {
      id: '41',
      name: 'Punjab Dhaba',
      location: 'Chandigarh, Punjab',
      email: 'contact@punjabdhaba.com',
      phone: '9876543213',
      joinDate: '2024-01-25',
      status: 'active' as const
    },
    {
      id: '51',
      name: 'Coastal Cuisine',
      location: 'Goa, India',
      email: 'hello@coastalcuisine.com',
      phone: '9876543214',
      joinDate: '2024-02-28',
      status: 'active' as const
    }
  ]
};