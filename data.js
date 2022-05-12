import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'admin',
      email: 'admin@admin.ro',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'user 1',
      email: 'user@user.ro',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'produsul 1',
      slug: 'produsul-1',
      category: 'categoria-1',
      image: '/images/p1.jpg',
      price: 120,
      countInStock: 10,
      brand: 'brand-1',
      rating: '4.5',
      numReviews: 10,
      description: 'descrierea produsului 1',
    },
    {
      // _id: '2',
      name: 'produsul 2',
      slug: 'produsul-2',
      category: 'categoria-2',
      image: '/images/p2.jpg',
      price: 220,
      countInStock: 33,
      brand: 'brand-2',
      rating: '1.5',
      numReviews: 12,
      description: 'descrierea produsului 2',
    },
    {
      // _id: '3',
      name: 'produsul 3',
      slug: 'produsul-3',
      category: 'categoria-3',
      image: '/images/p3.jpg',
      price: 150,
      countInStock: 13,
      brand: 'brand-3',
      rating: '3',
      numReviews: 40,
      description: 'descrierea produsului 3',
    },
    {
      // _id: '4',
      name: 'produsul 4',
      slug: 'produsul-4',
      category: 'categoria-4',
      image: '/images/p4.jpg',
      price: 520,
      countInStock: 0,
      brand: 'brand-4',
      rating: '5',
      numReviews: 24,
      description: 'descrierea produsului 4',
    },
  ],
};

export default data;
