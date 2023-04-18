import type { InferGetStaticPropsType } from "next";
import getAllProducts from "@shopify/product/get-all-products";

export async function getStaticProps() {
  const products = await getAllProducts();

  return {
    props: {
      products,
    },
    // To revalidate this object every 4 hours
    // and update with new products.
    revalidate: 4 * 60 * 60,
  };
}

// This will infer the static props
export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div>{JSON.stringify(products)}</div>;
}
