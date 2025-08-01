import { AiFillLinkedin, AiFillInstagram } from "react-icons/ai";
import { ImLocation, ImEnvelop } from "react-icons/im";

function Footer() {
    return (
        <>
            <footer className="bg-neutral-800">
                <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-8 sm:px-6 lg:px-8 lg:pt-24">
                    <div className="text-center">

                        <h2 className="text-3xl m-2 font-extrabold text-sky-400 sm:text-5xl">
                            Stay Connected
                        </h2>

                        <div class="col-4 mx-auto m-4 max-w-sm text-center text-white">
                            <p className="flex items-center gap-4">
                                <ImEnvelop />&nbsp; yash.20222068@mnnit.ac.in
                            </p>
                            <p className="flex items-center gap-4">
                                <ImLocation />&nbsp; National Institute of Technology Prayagraj
                            </p>
                        </div>

                        <a
                            href="#"
                            className="mt-8 inline-block rounded-full border border-white bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-3 focus:outline-hidden"
                        >
                            Get Started
                        </a>
                    </div>

                    <div
                        className="mt-16 border-t border-gray-100 pt-8 sm:flex sm:items-center sm:justify-between lg:mt-24"
                    >
                        <ul className="flex flex-wrap justify-center gap-4 text-xs lg:justify-end">
                            <p className="text-white text-sm transition hover:opacity-75">
                                &copy; Designed, Developed & Hosted by National Informatics Center.
                            </p>
                        </ul>

                        <ul className="mt-8 flex justify-center gap-6 sm:mt-0 lg:justify-end">
                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-white text-2xl transition hover:opacity-75"
                                >
                                    <span className="sr-only">Instagram</span>
                                    <AiFillInstagram />

                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-white text-2xl transition hover:opacity-75"
                                >
                                    <span className="sr-only">LinkedIn</span>
                                    <AiFillLinkedin />

                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;