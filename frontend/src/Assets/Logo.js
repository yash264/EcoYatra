import { motion } from "framer-motion";
import svg from "./svg.png";

function Logo() {
    return (
        <motion.img
            src={svg}
            alt="EcoYatra"
            className="mx-auto hidden max-w-sm md:block"
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
