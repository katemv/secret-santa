import { cn } from "@/utils/tailwind.ts";

interface LogoProps {
    fontSize?: number
}

const Logo = ({ fontSize = 50 }: LogoProps) => {
    return (
        <p className={cn("font-black text-white font-fields uppercase leading-none")}
            style={{ fontSize: `${fontSize}px` }}>
            <span style={{ fontSize: `${fontSize * 1.5}px` }}>N</span>aughty<br/>
            <span
                className={"relative"}
                style={{
                    top: `${-fontSize / 3}px`,
                    left: `${fontSize * 0.7}px`
                }}>
            & <span
                    className={"relative"}
                    style={{
                        fontSize: `${fontSize * 1.5}px`,
                        top: `${fontSize * 0.33}px`
                    }}>
                N
                </span>ice
            </span>
        </p>
    );
};

export default Logo; 