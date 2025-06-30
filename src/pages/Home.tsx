import Snow from "../components/animations/Snow";

const Home = () => {
    return (
        <div className={"bg-[#e7342a] w-full h-full relative"}>
            <Snow />
            <div className='min-h-screen w-full flex items-center justify-center'>
                <p className="max-w-2xl mx-auto text-[50px] font-black text-white font-fields uppercase leading-none relative z-30">
                    <span className={"text-[75px]"}>N</span>aughty<br/>
                    <span className={"-top-[25px] relative left-[80px]"}>
                    & <span className={"text-[75px] relative top-[16px]"}>N</span>ice
                    </span>
                </p>
            </div>
      
        </div>
    );
};

export default Home; 