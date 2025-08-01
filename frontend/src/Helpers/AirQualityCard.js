
const AirQualityCard = ({ componentsList }) => {
    const components = componentsList?.components || {};
    const aqi = componentsList?.main?.aqi;

    function getAQICategory(aqi) {
        switch (aqi) {
            case 1:
                return "Good";
            case 2:
                return "Fair";
            case 3:
                return "Moderate";
            case 4:
                return "Poor";
            case 5:
                return "Very Poor";
            default:
                return "Unknown";
        }
    }

    function getAQIColorClass(aqi) {
        switch (aqi) {
            case 1:
                return "text-green-600";
            case 2:
                return "text-yellow-500";
            case 3:
                return "text-orange-500";
            case 4:
                return "text-red-500";
            case 5:
                return "text-purple-700";
            default:
                return "text-gray-500";
        }
    }

    return (
        <div className="bg-white shadow-md rounded p-4 mt-6 w-full max-w-md mx-auto">
            {aqi && (
                <div className="text-center my-4">
                    <h2 className="text-xl font-semibold text-indigo-700 mb-1">
                        Air Quality Index : 
                        <span className={`font-semibold ml-2 ${getAQIColorClass(aqi)}`}>
                            {getAQICategory(aqi)}
                        </span>
                    </h2>
                </div>
            )}


            <ul className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                {Object.entries(components).map(([key, value]) => (
                    <li key={key} className="flex justify-between border-b pb-1">
                        <span className="capitalize">{key.replace('_', '.')}</span>
                        <span className="font-medium">{value.toFixed(2)} µg/m³</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AirQualityCard;
