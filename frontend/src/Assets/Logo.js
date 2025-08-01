import { motion } from "framer-motion";
import svg from "./svg.png";

function Logo() {
    return (
        <motion.img
            src={svg}
            alt="EcoYatra"
            className="w-48 sm:w-60 md:w-72 lg:w-80 h-auto max-w-full"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}

export default Logo;
