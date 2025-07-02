import { Button } from "@/components/ui";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo.tsx";

export const Header = () => {
    return (
        <header className={"bg-christmas-600 text-white flex items-center justify-between px-4 h-20"}>
            <Link to={"/"} className={"flex items-center justify-center"}>
                <Logo fontSize={20} />
            </Link>
            <Button size={"sm"}>Log in</Button>
        </header>
    );
};