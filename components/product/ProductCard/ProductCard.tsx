import { Product } from "@/framework/common/types/product";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import s from "./ProductCard.module.css";

interface Props {
  product: Product;
}

const placeholderImage = "/product-image-placeholder.svg";

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <Link href={`/products/${product.slug}`} className={s.root}>
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
    </Link>
  );
};

export default ProductCard;
