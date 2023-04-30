import { Product } from "@/framework/common/types/product";

type AvailableChoices = "color" | "size" | string;

export type Choices = {
  /** The generic type of P can be
   *  one of the available choice
   */
  [P in AvailableChoices]: string;
};

export const getVariant = (product: Product, choices: Choices) =>
  product.variants.find((variant) =>
    variant.options.every((variantOption) => {
      const optionName = variantOption.displayName.toLowerCase();
      return (
        optionName in choices &&
        choices[optionName] === variantOption.values[0].label
      );
    })
  );
