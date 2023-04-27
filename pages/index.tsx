import type { InferGetStaticPropsType } from "next";
import { getAllProducts } from "@framework/product";
import { getConfig } from "@framework/api/config";
import { Layout } from "@components/common";
import { ProductCard } from "@/components/product";
import { Grid, Hero } from "@/components/ui";
import Marquee from "react-fast-marquee";

export async function getStaticProps() {
	const config = getConfig();
	const products = await getAllProducts(config);

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
	return (
		<>
			<Grid>
				{products.slice(0, 3).map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</Grid>
			<Hero
				headline="Cookies, Ice cream and muffin"
				description="Marzipan biscuit tiramisu chocolate pudding. Caramels dessert carrot cake pie jelly beans icing pie gingerbread. Liquorice donut wafer jelly beans chocolate cake bear claw shortbread. Danish lollipop fruitcake jelly beans sweet roll sesame snaps bear claw macaroon. Candy canes cake cookie topping bonbon. Jelly ice cream shortbread jelly-o icing croissant danish bear claw pastry. Candy canes chocolate bar soufflé dessert tiramisu topping shortbread bear claw carrot cake. Halvah tootsie roll donut lemon drops cake pie lollipop."
			/>
			<Marquee
				style={{ overflow: "hidden", backgroundColor: "black" }}
				autoFill={true}
				pauseOnHover={true}
				speed={25}
			>
				{products.slice(0, 3).map((product) => (
					<ProductCard key={product.id} product={product} variant="slim" />
				))}
			</Marquee>
			<Grid layout="B">
				{products.slice(0, 3).map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</Grid>
			<Marquee
				style={{ overflow: "hidden" }}
				autoFill={true}
				pauseOnHover={true}
				speed={25}
			>
				{products.slice(0, 3).map((product) => (
					<ProductCard key={product.id} product={product} variant="slim" />
				))}
			</Marquee>
		</>
	);
}

Home.Layout = Layout;
