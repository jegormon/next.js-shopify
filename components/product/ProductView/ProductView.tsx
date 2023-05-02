import cn from "classnames";
import { FC, useState } from "react";
import s from "./ProductView.module.css";
import { Button, Container } from "@components/ui";
import Image from "next/image";
import { Product } from "@common/types/product";
import { ProductSlider, Swatch } from "@components/product";
import { Choices, getVariant } from "../helpers";
import { useUI } from "@/components/ui/context";
import useAddItem from "@framework/cart/use-add-item";

interface Props {
  product: Product;
}

const ProductView: FC<Props> = ({ product }) => {
  const [choices, setChoices] = useState<Choices>({});

  const { openSidebar } = useUI();
  const addItem = useAddItem();

  const variant = getVariant(product, choices);

  const addToCart = async () => {
    try {
      const item = {
        productId: String(product.id),
        variant: variant?.id,
      };

      const ouTpuT = await addItem(item);
      alert(JSON.stringify(ouTpuT));

      openSidebar();
    } catch {}
  };

  return (
    <Container>
      <div className={cn(s.root, "fit mb-5")}>
        <div className={cn(s.productDisplay, "fit")}>
          <div className={s.nameBox}>
            <h1 className={s.name}>{product.name}</h1>
            <div className={s.price}>
              {product.price.value}
              {` `}
              {product.price.currencyCode}
            </div>
          </div>
          <ProductSlider>
            {product.images.map((image) => (
              <div className={s.imageContainer} key={image.url}>
                <Image
                  className={s.img}
                  src={image.url}
                  alt={image.alt ?? ""}
                  width={1050}
                  height={1050}
                  quality="85"
                />
              </div>
            ))}
          </ProductSlider>
        </div>
        <div className={s.sidebar}>
          <section>
            {product.options.map((option) => (
              <div className="pb-4" key={option.id}>
                <h2 className="uppercase font-medium">{option.displayName}</h2>
                <div className="flex flex-row py-4">
                  {option.values.map((opt) => {
                    const activeChoice =
                      choices[option.displayName.toLowerCase()];
                    return (
                      <Swatch
                        key={`${option.id}-${opt.label}`}
                        label={opt.label}
                        color={opt.hexColor}
                        variant={option.displayName}
                        active={opt.label.toLowerCase() === activeChoice}
                        onClick={() => {
                          setChoices({
                            ...choices,
                            [option.displayName.toLowerCase()]:
                              opt.label.toLowerCase(),
                          });
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="pb-14 break-words w-full max-w-xl text-lg">
              {product.description}
            </div>
          </section>
          <div>
            <Button className={s.button} onClick={addToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductView;
