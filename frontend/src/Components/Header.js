import Logo from "../Assets/Logo";


function Header() {

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
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 min-h-screen flex items-center">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center text-center md:text-left justify-items-center">
                        <div>
                            <div className="max-w-lg md:max-w-none">
                                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                                    <strong className="text-indigo-600"> Welcome to EcoYatra </strong>
                                </h1>

                                <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                                    EcoYatra is an intelligent navigation platform designed to
                                    help you choose routes with the lowest air pollution levels.
                                </p>

                                <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                                    By combining advanced routing algorithms with real-time Air Quality Index,
                                    EcoYatra ensures your journeys are not just shorter—but healthier.
                                </p>

                                <div className="mt-4 flex justify-center gap-4 sm:mt-6">
                                    <button
                                        className="inline-block rounded border border-rose-600 bg-rose-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-rose-700"
                                        onClick={() => handleScroll("mapView")}
                                    >
                                        Get Started
                                    </button>
                                </div>

                            </div>
                        </div>

                        <div>
                            <Logo />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Header;