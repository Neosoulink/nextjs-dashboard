"use client";

import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useRef } from "react";

const formSchema = z.object({
	userAvatar: z.string().url(),
	companyName: z.string(),
	companyWebsite: z.string().url(),
	companyLinkedin: z.string().url(),
	companyIndustry: z.string(),
	companyDescription: z.string(),
	employeeCompt: z.enum(["1-10", "10-100", "100-500", "1000+"]),
	companyGoals: z.string(),
	headquarters: z.string(),
	foundingRound: z.string(),
	faqs: z.string(),
});

const Home = () => {
	// DATA
	const availableSections: string[] = [
		"Your profile",
		"Company Info",
		"Message Seats",
		"Do not contact",
		"Integrations",
	];

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});

	const mainFormField = [
		"companyName",
		"companyWebsite",
		"companyLinkedin",
		"companyIndustry",
		"employeeCompt",
		"companyDescription",
		"companyGoals",
		"headquarters",
		"foundingRound",
		"faqs",
	] as const;

	const employeeComptValues = ["1-10", "10-100", "100-500", "1000+"] as const;

	// METHODS
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<main className="container flex flex-col m-auto py-12">
			<h1 className="text-4xl mb-6 font-semibold">Settings</h1>

			<div className="w-full overflow-x-auto mb-12">
				<nav className="bg-gray-50 p-2 rounded-md w-fit ">
					<ul className="flex space-x-2">
						{availableSections.map((item, id) => (
							<Button
								key={id.toString()}
								asChild
								variant="ghost"
								className="transition-all text-gray-400 hover:bg-white hover:text-black hover:shadow-lg font-medium"
							>
								<Link href={`#${item}`}>{item}</Link>
							</Button>
						))}
					</ul>
				</nav>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<section className="flex flex-col-reverse md:flex-row justify-between mb-16">
						<div className="flex  items-center">
							<div className="rounded-full overflow-hidden mr-10">
								<Image
									src="https://s3-alpha-sig.figma.com/img/c81e/ec13/181464a9c582af953792ffd26bed9e4e?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b0Sf07ushNXR1cWvEE~5YqpD1aAmPnVC4BhhYN4ZjwTuUSn8MdAIWfsFOWY-cLMYHcY7HZzmfedsaDkaIIZqXju9RowigfJQuEok~UVuCiCFROeOBeEftT4CbD7Xvd0Nni8AiWRCb4xCafDYjfO2TvENvzaqdMc-zRxsvM2s1TjQDQiRnbrd2lfbl2F4Ulnx2cC9joQ7T-huZymQextcAv8sLXtk3PEpDv1AHMTKT6hH74C7rTiWsDkPfi3KtgFV3gCxQk~cP4tBEYSEFcO58QeVwC75EpPID0EoPOxMGdVcX-DBzVUBgY96-zGRH3RefDlefzZgq5oF3-O68cq4Tw__"
									width={100}
									height={100}
									alt="user"
								/>
							</div>

							<div>
								<div className="space-x-2">
									<Button
										size="sm"
										className="bg-gradient-to-b bg-red-600 from-red-400 to-red-600 hover:from-red-600 hover:to-red-600"
									>
										Remove
									</Button>
									<Button
										size="sm"
										variant="ghost"
										className="shadow-md border-2 border-gray-100 "
									>
										Change photo
									</Button>
								</div>

								<FormField
									control={form.control}
									name="userAvatar"
									render={() => (
										<FormItem>
											<FormControl>
												<Input
													type="file"
													className="border-none text-gray-400 cursor-pointer"
													title="Or drag and drop (SVG, PNG, JPG)"
													accept={"image/png, image/jpeg, image/*, svg/*"}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className="space-x-2 flex justify-center mb-10 md:mb-0">
							<Button
								size="sm"
								variant="ghost"
								className="shadow-md border-2 border-gray-100 flex-1 md:flex-none"
								type="button"
							>
								Cancel
							</Button>

							<Button
								size="sm"
								className="bg-black bg-gradient-to-b from-gray-700 to-black hover:from-black hover:to-black flex-1 md:flex-none"
								type="submit"
							>
								Save change
							</Button>
						</div>
					</section>

					<section>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
							{mainFormField.slice(0, 4).map((name, id) => (
								<FormField
									key={id.toString()}
									control={form.control}
									name={name}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="capitalize">{name}</FormLabel>
											<FormControl>
												<Input placeholder="Type something..." {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}
						</div>

						<FormField
							control={form.control}
							name="employeeCompt"
							render={() => (
								<FormItem className="mb-4">
									<FormLabel className="capitalize">Employee Compte</FormLabel>
									<div className="flex space-x-2">
										{employeeComptValues.map((item, id) => (
											<Button
												type="button"
												key={id.toString()}
												size="sm"
												variant={id === 0 ? "default" : "ghost"}
												className="px-3 py-5 rounded-3xl"
											>
												{item}
											</Button>
										))}
									</div>
								</FormItem>
							)}
						/>

						<div className="flex flex-col gap-4 mb-4">
							{mainFormField.slice(5, 8).map((name, id) => (
								<FormField
									key={id.toString()}
									control={form.control}
									name={name}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="capitalize">{name}</FormLabel>
											<FormControl>
												<Input placeholder="Type something..." {...field} />
											</FormControl>
											<FormMessage />
											{name === "companyDescription" ? (
												<FormDescription>
													Your detailed company description.
												</FormDescription>
											) : undefined}
										</FormItem>
									)}
								/>
							))}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
							{mainFormField.slice(8, 11).map((name, id) => (
								<FormField
									key={id.toString()}
									control={form.control}
									name={name}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="capitalize">{name}</FormLabel>
											<FormControl>
												<Input placeholder="Type something..." {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}
						</div>
					</section>
				</form>
			</Form>
		</main>
	);
};

export default Home;
