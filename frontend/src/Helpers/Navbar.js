import { useState } from 'react';
import makeIndia from "../Assets/makeIndia.png";

function Navbar() {

    const [isOpen, setOpen] = useState(false);

    const handleScroll = (sectionId) => {
        const section = document.getElementById(sectionId);

        if (section) {
            window.scrollTo({
                top: section.offsetTop - 50,
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            <header className="bg-neutral-800">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">

                        <div className="flex items-center gap-4">
                            <span className="sr-only">Home</span>
                            <img
                                src={makeIndia}
                                alt="Make In India"
                                className="w-24 sm:w-28 md:w-32 h-auto max-w-full"
                            />
                        </div>

                        <div className="hidden md:block">
                            <nav aria-label="Global">
                                <ul className="flex items-center gap-6 text-sm">
                                    <li>
                                        <button
                                            className="text-white text-sm font-semibold px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-yellow-600 hover:scale-105"
                                            onClick={() => handleScroll("header")}
                                        >
                                            Home
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            className="text-white text-sm font-semibold px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-yellow-600 hover:scale-105"
                                            onClick={() => handleScroll("features")}
                                        >
                                            Features
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            className="text-white text-sm font-semibold px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-yellow-600 hover:scale-105"
                                            onClick={() => handleScroll("mapView")}
                                        >
                                            Map View
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            className="text-white text-sm font-semibold px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-yellow-600 hover:scale-105"
                                            onClick={() => handleScroll("footer")}
                                        >
                                            About
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>


                        <div className="flex items-center gap-4">
                            <div className="block md:hidden">
                                <button
                                    onClick={() => setOpen(!isOpen)}
                                    className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {isOpen && (
                        <div className="md:hidden px-4 py-2 bg-neutral-800 border-t">
                            <nav aria-label="Global">
                                <ul className="flex flex-col gap-4 text-sm">
                                    <li>
                                        <button
                                            className="text-white text-sm font-semibold px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-yellow-600 hover:scale-105"
                                            onClick={() => handleScroll("header")}
                                        >
                                            Home
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            className="text-white text-sm font-semibold px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-yellow-600 hover:scale-105"
                                            onClick={() => handleScroll("features")}
                                        >
                                            Features
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            className="text-white text-sm font-semibold px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-yellow-600 hover:scale-105"
                                            onClick={() => handleScroll("mapView")}
                                        >
                                            Map View
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            className="text-white text-sm font-semibold px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-yellow-600 hover:scale-105"
                                            onClick={() => handleScroll("footer")}
                                        >
                                            About
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )}

                </div>
            </header>
        </>
    )
}

export default Navbar;
