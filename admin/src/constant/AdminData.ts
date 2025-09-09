export interface Admin {
  id: string;
  name: string;
  email: string;
  createdDate: string;
}

export const adminData = {
  admins: [
    {
      id: '1',
      name: 'Super Admin',
      email: 'superadmin@company.com',
      createdDate: '2023-12-01'
    },
    {
      id: '2',
      name: 'Arjun Mishra',
      email: 'arjun.mishra@company.com',
      createdDate: '2024-01-10'
    },
    {
      id: '3',
      name: 'Deepika Raj',
      email: 'deepika.raj@company.com',
      createdDate: '2024-01-20'
    },
    {
      id: '4',
      name: 'Manoj Singh',
      email: 'manoj.singh@company.com',
      createdDate: '2024-02-05'
    },
    {
      id: '5',
      name: 'Neha Agarwal',
      email: 'neha.agarwal@company.com',
      createdDate: '2024-02-15'
    },
    {
      id: '6',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@company.com',
      createdDate: '2024-03-01'
    },
    {
      id: '7',
      name: 'Sanjana Rao',
      email: 'sanjana.rao@company.com',
      createdDate: '2024-03-12'
    }
  ]
};