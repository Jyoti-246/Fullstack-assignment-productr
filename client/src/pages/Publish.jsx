import NoProduct from "../components/NoProduct";
import ProductList from "../components/ProductList";
import { useOutletContext } from "react-router-dom";

const Publish = () => {
  const { products, setProducts } = useOutletContext();
  console.log(products);

  const publishedProducts = products.filter((item) => item.published === true);

  return (
    <div>
      {publishedProducts.length === 0 ? (
        <NoProduct status={"published"} />
      ) : (
        <ProductList
          type="published"
          products={publishedProducts}
          setProducts={setProducts}
        />
      )}
    </div>
  );
};

export default Publish;
