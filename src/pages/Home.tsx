import Snow from "../components/animations/Snow";
import { Button } from "@/components/ui";
import Logo from "../components/Logo";

const Home = () => {
    return (
        <div className={"bg-christmas-600 w-full h-full relative"}>
            <Snow />
            <div className='min-h-screen w-full flex items-center justify-center'>
                <div className='max-w-2xl mx-auto text-center relative z-30'>
                    <Logo />
                    
                    <p className='text-white text-lg mb-12 font-medium leading-relaxed'>
                        {"Organize the perfect Secret Santa gift exchange! Create groups, add members, and let our system randomly assign gift recipients. Make your holiday celebrations magical and stress-free."}
                    </p>
                    
                    <div className='flex gap-6 justify-center'>
                        <Button 
                            size={"lg"}
                            to={"/create"}
                        >
                            {"Create a Group"}
                        </Button>
                        <Button 
                            variant={"outline"}
                            size={"lg"}
                            to={"/join"}
                        >
                            {"Join a Group"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home; 