import products from "../../data/products.json";
import ProductDetail from "../../components/productDetail";

export default function ProductPage({ params }) {
  // find product by id
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    return (
      <main className="container mx-auto p-6">
        <h1 className="text-xl font-bold">Product not found</h1>
        <p className="mt-2 text-gray-600">
          Sorry, the product you are looking for doesn’t exist.
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-6">
      <ProductDetail product={product} />
    </main>
  );
}
