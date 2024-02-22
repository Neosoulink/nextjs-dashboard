import Image from "next/image";

// COMPONENTS
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
	// DATA
	const availableSections: string[] = [
		"Your profile",
		"Company Info",
		"Message Seats",
		"Do not contact",
		"Integrations",
	];

	return (
		<main className="container flex flex-col m-auto py-12">
			<h1 className="text-4xl mb-6 font-semibold">Settings</h1>

			<nav className="bg-gray-50 p-2 rounded-md w-fit mb-12">
				<ul className="flex space-x-2">
					{availableSections.map((item, id) => (
						<Button
							key={id.toString()}
							asChild
							className="transition-all bg-white text-gray-400 hover:bg-white hover:text-black hover:shadow-lg font-medium"
						>
							<Link href={`#${item}`}>{item}</Link>
						</Button>
					))}
				</ul>
			</nav>

			<section className="flex justify-between">
				<div>1</div>
				<div>2</div>
			</section>
		</main>
	);
};

export default Home;
