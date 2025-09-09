import BestSellingProducts from "../../components/BestSellingProduct/BestSellingProduct"
import CategoryProduct from "../../components/CategoryProduct/CategoryProduct"
import ContactChatbot from "../../components/ContactUsChatbot/ContactUs"
import Hero from "../../components/Hero/Hero"
import Offers from "../../components/Offers/Offers"
import OurSpeciality from "../../components/OurSpeciality/OurSpeciality"
import ProductsList from "../../components/ProductList/ProductList"
import { products } from "../../constants/Products"
import styles from './Homepage.module.css';

const Homepage = () => {
  return (
    <div className="relative">

      <Hero />

      <CategoryProduct />

      <Offers />

      <div className={styles.container}>
        <h2 className={styles.title}>All Fresh Products</h2>
        <ProductsList products={products} />
      </div>

      <OurSpeciality />

      <BestSellingProducts />

      <ContactChatbot />

    </div>
  )
}

export default Homepage