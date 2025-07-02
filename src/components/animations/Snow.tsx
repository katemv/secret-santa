import { useCallback, useEffect } from "react";


const Snow = () => {
    const getRandom = (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    };

    const letItSnow = useCallback(() => {
        const snowflakes = document.querySelectorAll(".snowflake-circle");
        snowflakes.forEach((snowflake) => {
            snowflake.setAttribute("cx", getRandom(1, 100) + "%");
            snowflake.setAttribute("cy", "-" + getRandom(1, 100));
            snowflake.setAttribute("r", getRandom(1, 3).toString());
        });
    }, []);

    useEffect(() => {
        letItSnow();
    }, [letItSnow]);

    return (
        <>
            <style>{`
        @keyframes snowing {
          0% { 
            fill-opacity: 1; 
          }
          100% { 
            fill-opacity: 0;
            transform: translateY(100%);
          }
        }
        .snowflake-circle {
          fill: #fff; 
          animation-name: snowing;
          animation-duration: 3s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-out;
        }
        .snowflake-circle:nth-child(2n) {
          animation-delay: 1.5s;
        }
        .snowflake-circle:nth-child(3n) {
          animation-delay: 2.3s;
          animation-duration: 3.3s;
        }
        .snowflake-circle:nth-child(4n) {
          animation-delay: 0.8s;
          animation-duration: 3.2s;
        }
        .snowflake-circle:nth-child(5n) {
          animation-delay: 2.8s;
        }
      `}</style>
      
            <svg 
                className={"absolute inset-0 w-full h-72 pointer-events-none z-20"} 
                xmlns={"http://www.w3.org/2000/svg"}
            >
                {Array.from({ length: 60 }, (_, index) => (
                    <circle key={index} className={"snowflake-circle"} />
                ))}
            </svg>
        </>
    );
};

export default Snow; 