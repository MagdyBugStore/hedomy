
import SingleProduct from "../ecommerce/SingleProduct";

const FeaturedTab = ({ products , gender }) => {
    const showItem= 10
    return (
        <>
            {products.slice(0, showItem).map((product, i) => (
                <div className="col-lg-1-5 col-md-4 col-12 col-sm-6" key={i}>
                    <SingleProduct product={product} gender = {gender} />
                </div>
            ))}
        </>
    );
};

export default FeaturedTab;
