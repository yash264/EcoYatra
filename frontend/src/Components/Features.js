

function Features() {
    return (
        <>
            <>
                <section>
                    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 min-h-screen flex items-center">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
                            <div>
                                <div className="max-w-lg md:max-w-none">
                                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl leading-tight">
                                        Shortest <strong className="text-indigo-600">Cleanest</strong> Path
                                    </h1>

                                    <p className="mt-6 text-lg text-gray-700">
                                        Discover smarter travel with EcoYatra’s intelligent routing system — designed not just to get you there faster, but healthier.
                                    </p>

                                    <p className="mt-6 text-lg text-gray-700">
                                        Perfect for walkers, cyclists, and eco-conscious commuters, this feature empowers you to breathe better while moving better.
                                    </p>

                                    <p className="mt-6 text-lg text-gray-700">
                                        Start your EcoYatra today — travel cleaner, breathe better, live longer.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div className="max-w-lg md:max-w-none">
                                    <h1 className="text-4xl p-6 font-bold text-gray-900 sm:text-5xl">
                                        Key
                                        <strong className="text-indigo-600"> Features </strong>
                                    </h1>
                                </div>

                                <div className="overflow-hidden rounded border border-gray-300 shadow-sm">
                                    <table className="min-w-full table-auto divide-y divide-gray-200">
                                        <tbody className="divide-y divide-gray-200 text-sm text-gray-800">

                                            <tr>
                                                <td className="px-3 py-2 break-words align-top">
                                                    Real-Time AQI Integration
                                                </td>
                                                <td className="px-3 py-2 break-words align-top">
                                                    Fetches current pollution levels from trusted sources for accurate routing.
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="px-3 py-2 break-words align-top">
                                                    Least Polluted Route Finder
                                                </td>
                                                <td className="px-3 py-2 break-words align-top">
                                                    Uses Dijkstra's algorithm to compute paths with minimal AQI values.
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="px-3 py-2 break-words align-top">
                                                    Interactive Map Interface
                                                </td>
                                                <td className="px-3 py-2 break-words align-top">
                                                    Visualize your journey and air quality hotspots before stepping out.
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </>
        </>
    )
}

export default Features;