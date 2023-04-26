import { Product } from "@/framework/common/types/product";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import s from "./ProductCard.module.css";

interface Props {
  product: Product;
  variant?: "simple" | "slim";
}

const placeholderImage = "/product-image-placeholder.svg";

const ProductCard: FC<Props> = ({ product, variant = "simple" }) => {
  return (
    <Link href={`/products/${product.slug}`} className={s.root}>
      {variant === "slim" ? (
        <>
          <div className="flex items-center justify-center absolute inset-0 z-40">
            <span className="bg-black text-white p-3 font-bold text-xl">
              {product.name}
            </span>
          </div>
          {product.images && (
            <Image
              alt={product.name ?? "Product image"}
              src={product.images[0].url ?? placeholderImage}
              width={320}
              height={320}
              quality={80}
              className={s.productImageSlim}
            />
          )}
        </>
      ) : (
        <>
          <div className={s.productBg}></div>
          <div className={s.productTag}>
            <h3 className={s.productTitle}>
              <span>{product.name}</span>
            </h3>
            <span className={s.productPrice}>
              {product.price.value} {product.price.currencyCode}
            </span>
          </div>
          {product.images && (
            <Image
              alt={product.name ?? "Product image"}
              src={product.images[0].url ?? placeholderImage}
              height={540}
              width={540}
              quality={80}
              className={s.productImage}
            />
          )}
        </>
      )}
    </Link>
  );
};

export default ProductCard;
