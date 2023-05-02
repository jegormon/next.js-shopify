import { ApiConfig } from "@common/types/api";
import { Product } from "@common/types/product";
import { getAllProductsPathsQuery } from "../utils";
import { ProductConnection } from "../schema";

type ReturnType = {
  products: Pick<Product, "slug">[];
};

const getAllProductsPaths = async (config: ApiConfig): Promise<ReturnType> => {
  const { data } = await config.fetch<{ products: ProductConnection }>({
    query: getAllProductsPathsQuery,
  });

  const products = data.products.edges.map(({ node: { handle } }) => {
    return {
      slug: handle,
    };
  });

  return { products };
};

export default getAllProductsPaths;
