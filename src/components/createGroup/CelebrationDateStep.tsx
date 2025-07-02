import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FC, useState } from "react";

import bellAnimation from "../../assets/lottie/bell.json";
import { AnimatedIcon } from "../AnimatedIcon.tsx";
import { SelectionButton } from "../SelectionButton.tsx";
import { Calendar } from "../ui/calendar.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.tsx";

interface CelebrationDateStepProps {
  selectedDate: string
  setSelectedDate: (date: string) => void
}

export const CelebrationDateStep: FC<CelebrationDateStepProps> = ({ selectedDate, setSelectedDate }) => {
    const [isOtherSelected, setIsOtherSelected] = useState(false);
    const currentYear = new Date().getFullYear();
    
    const dates = [
        { day: 24, date: new Date(currentYear, 11, 24) },
        { day: 25, date: new Date(currentYear, 11, 25) },
        { day: 26, date: new Date(currentYear, 11, 26) }
    ];
    
    const formatDateString = (day: number) => {
        return `${currentYear}-12-${day.toString().padStart(2, "0")}`;
    };

    const handleQuickPickSelect = (day: number) => {
        setSelectedDate(formatDateString(day));
        setIsOtherSelected(false);
    };

    // store date in Date format
    const handleCalendarSelect = (date: Date | undefined) => {
        if (date) {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            const formattedDate = `${year}-${month}-${day}`;
            setSelectedDate(formattedDate);
        }
    };

    const parsedSelectedDate = selectedDate ? (() => {
        const [year, month, day] = selectedDate.split("-").map(Number);
        return new Date(year, month - 1, day);
    })() : undefined;

    return (
        <div className={"p-8"}>
            <div className={"text-center mb-8"}>
                <AnimatedIcon animationData={bellAnimation} />
                <h2 className={"text-2xl font-bold text-christmas-600 font-fields mb-2"}>
                    {"When are you going to celebrate?"}
                </h2>
                <p className={"text-gray-600 mb-2"}>
                    {"Choose the perfect date for your Secret Santa gift exchange!"}
                </p>
            </div>

            <div className={"max-w-md mx-auto"}>
                {/* Quick Pick Buttons */}
                <div className={"flex flex-col gap-3 mb-3"}>
                    {dates.map(({ day, date }) => (
                        <SelectionButton
                            key={day}
                            title={format(date, "EEEE")}
                            subtitle={format(date, "MMMM d, yyyy")}
                            selected={selectedDate === formatDateString(day) && !isOtherSelected}
                            onClick={() => handleQuickPickSelect(day)}
                        />
                    ))}
                    
                    {/* Other Button */}
                    <SelectionButton
                        title={"Other"}
                        subtitle={"Pick any date"}
                        selected={isOtherSelected}
                        onClick={() => setIsOtherSelected(true)}
                    />
                </div>

                {isOtherSelected && (
                    <div className={"mb-4"}>
                        <p className={"text-md font-fields text-gray-700 mb-3"}>
                            {"Date of the celebration:"}
                        </p>
                        <Popover>
                            <PopoverTrigger asChild>
                                <SelectionButton
                                    title={parsedSelectedDate && isOtherSelected ? 
                                        format(parsedSelectedDate, "MMMM d, yyyy") : 
                                        "Pick a date"}
                                    subtitle={"Custom date selection"}
                                    selected={false}
                                    onClick={() => {}}
                                    icon={<CalendarIcon className={"h-5 w-5 text-gray-600"} />}
                                    className={"border-gray-300 hover:border-gray-400"}
                                />
                            </PopoverTrigger>
                            <PopoverContent className={"w-auto p-0"}>
                                <Calendar
                                    mode={"single"}
                                    selected={parsedSelectedDate}
                                    onSelect={handleCalendarSelect}
                                    disabled={(date) => date < new Date()}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                )}

                <div className={"mt-4 text-center"}>
                    <p className={"text-xs text-gray-500"}>
                        {"You can always change this date later in your group settings"}
                    </p>
                </div>
            </div>
        </div>
    );
}; 