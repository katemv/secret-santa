import { Wand2, Sparkles, Brain, Zap } from "lucide-react";

const WishlistAssistant = () => {
    return (
        <div className={"max-w-4xl mx-auto"}>
            {/* Hero Section */}
            <div className={"text-center mb-12"}>
                <div className={"text-6xl mb-6"}>🔮</div>
                <h1 className={"text-4xl md:text-5xl font-bold text-white mb-4"}>
                    {"AI Gift Assistant"}
                </h1>
                <p className={"text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto"}>
                    {"Get personalized gift suggestions powered by artificial intelligence. Coming soon to make your Secret Santa shopping effortless!"}
                </p>
                <div className={"inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg"}>
                    <Sparkles size={20} />
                    <span className={"font-medium"}>{"Coming Soon!"}</span>
                </div>
            </div>

            {/* Features Preview */}
            <div className={"grid md:grid-cols-3 gap-8 mb-12"}>
                <div className={"cozy-card bg-white/95 border-christmas-200 text-center"}>
                    <div className={"text-4xl mb-4"}>🎯</div>
                    <h3 className={"text-xl font-bold text-christmas-800 mb-3"}>{"Smart Suggestions"}</h3>
                    <p className={"text-christmas-600"}>
                        {"AI analyzes gift preferences to suggest perfect presents tailored to each recipient's interests and personality."}
                    </p>
                </div>

                <div className={"cozy-card bg-white/95 border-christmas-200 text-center"}>
                    <div className={"text-4xl mb-4"}>💰</div>
                    <h3 className={"text-xl font-bold text-christmas-800 mb-3"}>{"Budget Optimization"}</h3>
                    <p className={"text-christmas-600"}>
                        {"Find amazing gifts within your Secret Santa budget. Our AI considers price ranges and value for money."}
                    </p>
                </div>

                <div className={"cozy-card bg-white/95 border-christmas-200 text-center"}>
                    <div className={"text-4xl mb-4"}>🛒</div>
                    <h3 className={"text-xl font-bold text-christmas-800 mb-3"}>{"Shopping Links"}</h3>
                    <p className={"text-christmas-600"}>
                        {"Get direct links to purchase suggested gifts from trusted retailers, making shopping quick and easy."}
                    </p>
                </div>
            </div>

            {/* How It Will Work */}
            <div className={"cozy-card bg-white/95 border-christmas-200 mb-8"}>
                <h2 className={"text-2xl font-bold text-christmas-800 mb-6 flex items-center gap-2"}>
                    <Brain size={24} />
                    {"How AI Gift Assistant Will Work"}
                </h2>
                <div className={"space-y-6"}>
                    <div className={"flex items-start gap-4"}>
                        <div className={"bg-christmas-100 rounded-full p-2 mt-1"}>
                            <span className={"text-christmas-600 font-bold"}>{"1"}</span>
                        </div>
                        <div>
                            <h3 className={"font-semibold text-christmas-800 mb-1"}>{"Upload Preferences"}</h3>
                            <p className={"text-christmas-600"}>
                                {"Simply paste your recipient's gift preferences or describe what you know about them."}
                            </p>
                        </div>
                    </div>

                    <div className={"flex items-start gap-4"}>
                        <div className={"bg-christmas-100 rounded-full p-2 mt-1"}>
                            <span className={"text-christmas-600 font-bold"}>{"2"}</span>
                        </div>
                        <div>
                            <h3 className={"font-semibold text-christmas-800 mb-1"}>{"AI Analysis"}</h3>
                            <p className={"text-christmas-600"}>
                                {"Our AI processes their interests, hobbies, style preferences, and budget constraints."}
                            </p>
                        </div>
                    </div>

                    <div className={"flex items-start gap-4"}>
                        <div className={"bg-christmas-100 rounded-full p-2 mt-1"}>
                            <span className={"text-christmas-600 font-bold"}>{"3"}</span>
                        </div>
                        <div>
                            <h3 className={"font-semibold text-christmas-800 mb-1"}>{"Personalized Suggestions"}</h3>
                            <p className={"text-christmas-600"}>
                                {"Receive 5-10 carefully curated gift ideas with explanations and shopping links."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mockup Interface */}
            <div className={"cozy-card bg-white/95 border-2 border-dashed border-christmas-300 mb-8"}>
                <div className={"text-center mb-6"}>
                    <h3 className={"text-xl font-bold text-christmas-600 mb-2"}>{"Preview: AI Assistant Interface"}</h3>
                    <p className={"text-christmas-500"}>{"This is how the gift assistant will look when it's ready!"}</p>
                </div>

                <div className={"space-y-4 opacity-60"}>
                    <div>
                        <label className={"block text-christmas-700 font-medium mb-2"}>
                            {"Your Recipient's Preferences"}
                        </label>
                        <textarea
                            disabled
                            placeholder={"Paste their gift preferences here..."}
                            className={"w-full px-4 py-3 border border-christmas-300 rounded-lg bg-white/50 text-christmas-500"}
                            rows={3}
                        />
                    </div>

                    <div className={"grid md:grid-cols-2 gap-4"}>
                        <div>
                            <label className={"block text-christmas-700 font-medium mb-2"}>{"Budget"}</label>
                            <input
                                disabled
                                placeholder={"$25"}
                                className={"w-full px-4 py-3 border border-christmas-300 rounded-lg bg-white/50 text-christmas-500"}
                            />
                        </div>
                        <div>
                            <label className={"block text-christmas-700 font-medium mb-2"}>{"Relationship"}</label>
                            <select disabled className={"w-full px-4 py-3 border border-christmas-300 rounded-lg bg-white/50 text-christmas-500"}>
                                <option>{"Friend"}</option>
                                <option>{"Family"}</option>
                                <option>{"Coworker"}</option>
                            </select>
                        </div>
                    </div>

                    <button
                        disabled
                        className={"w-full py-3 bg-christmas-400 text-white rounded-lg cursor-not-allowed flex items-center justify-center gap-2"}
                    >
                        <Wand2 size={18} />
                        {"Generate Gift Ideas"}
                    </button>
                </div>
            </div>

            {/* Newsletter Signup */}
            <div className={"cozy-card bg-white/95 border-christmas-200 text-center"}>
                <div className={"flex items-center justify-center gap-2 mb-4"}>
                    <Zap size={24} className={"text-christmas-600"} />
                    <h3 className={"text-xl font-bold text-christmas-800"}>{"Be the First to Know!"}</h3>
                </div>
                <p className={"text-christmas-600 mb-6"}>
                    {"Want to be notified when the AI Gift Assistant launches? We'll let you know as soon as it's ready!"}
                </p>
                <div className={"flex gap-3 max-w-md mx-auto"}>
                    <input
                        type={"email"}
                        placeholder={"your@email.com"}
                        className={"flex-1 px-4 py-3 border border-christmas-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-500"}
                    />
                    <button className={"cozy-button"}>
                        {"Notify Me"}
                    </button>
                </div>
                <p className={"text-xs text-christmas-500 mt-3"}>
                    {"We'll only email you about major updates. No spam, promise! 🎄"}
                </p>
            </div>
        </div>
    );
};

export default WishlistAssistant; 