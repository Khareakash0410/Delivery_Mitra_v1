export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface ProductData {
  products: Product[];
}

export  const productData: ProductData = {
    products: [
      { id: '1', name: 'iPhone 14 Pro', price: 999, category: 'Electronics' },
      { id: '2', name: 'Samsung Galaxy S23', price: 799, category: 'Electronics' },
      { id: '3', name: 'Nike Air Max', price: 129, category: 'Footwear' },
      { id: '4', name: 'Adidas Ultraboost', price: 179, category: 'Footwear' },
      { id: '5', name: 'MacBook Pro M2', price: 1299, category: 'Electronics' },
      { id: '6', name: 'Dell XPS 13', price: 899, category: 'Electronics' },
      { id: '7', name: 'Puma Running Shoes', price: 89, category: 'Footwear' },
      { id: '8', name: 'Canon EOS R5', price: 3899, category: 'Photography' },
      { id: '11', name: 'iPhone 14 Pro', price: 999, category: 'Electronics' },
      { id: '21', name: 'Samsung Galaxy S23', price: 799, category: 'Electronics' },
      { id: '31', name: 'Nike Air Max', price: 129, category: 'Footwear' },
      { id: '41', name: 'Adidas Ultraboost', price: 179, category: 'Footwear' },
      { id: '51', name: 'MacBook Pro M2', price: 1299, category: 'Electronics' },
      { id: '61', name: 'Dell XPS 13', price: 899, category: 'Electronics' },
      { id: '71', name: 'Puma Running Shoes', price: 89, category: 'Footwear' },
      { id: '81', name: 'Canon EOS R5', price: 3899, category: 'Photography' },
    ]
}