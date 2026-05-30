import NoProduct from "../components/NoProduct";
import ProductList from "../components/ProductList";
import { useOutletContext } from "react-router-dom";

const Unpublish = () => {
  const { products, setProducts } = useOutletContext();

  const unpublishedProducts = products.filter(
    (item) => item.published === false,
  );

  console.log(unpublishedProducts);

  return (
    <div>
      {unpublishedProducts.length === 0 ? (
        <NoProduct status={"unpublished"} />
      ) : (
        <ProductList
          type="unpublished"
          products={unpublishedProducts}
          setProducts={setProducts}
        />
      )}
    </div>
  );
};

export default Unpublish;
