import Lottie from "lottie-react";
import { useRef, useEffect } from "react";

interface AnimatedIconProps {
  animationData: any;
  className?: string;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
    animationData,
    className = "size-32"
}) => {
    const lottieRef = useRef<any>(null);

    useEffect(() => {
        if (lottieRef.current) {
            lottieRef.current.play();
        }
    }, []);

    const handleMouseEnter = () => {
        if (lottieRef.current) {
            lottieRef.current.stop();
            lottieRef.current.play();
        }
    };

    return (
        <div 
            className={"size-32 flex items-center justify-center mx-auto mb-4 cursor-pointer"} 
            onMouseEnter={handleMouseEnter}
        >
            <Lottie 
                lottieRef={lottieRef}
                animationData={animationData} 
                className={className} 
                loop={false}
                autoplay={false}
            />
        </div>
    );
}; 