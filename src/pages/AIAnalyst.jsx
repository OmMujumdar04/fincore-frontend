import { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  TrendingUp,
  Users,
  Building2,
  X,
} from "lucide-react";

export default function AIAnalyst() {

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "Hello! I'm the FINCORE AI Analyst. I can help you understand franchise performance, growth opportunities, workforce trends, and the impact of the growth levers.",
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const suggestedQuestions = [
    {
      icon: <TrendingUp size={18} />,
      text: "What are the biggest growth opportunities?",
    },
    {
      icon: <Building2 size={18} />,
      text: "How many dormant franchises do we have?",
    },
    {
      icon: <TrendingUp size={18} />,
      text: "Explain the Growth Lever Simulator",
    },
    {
      icon: <Users size={18} />,
      text: "Summarize workforce performance",
    },
  ];

  function getResponse(question) {

    const q = question.toLowerCase();

    // ==========================================
    // DORMANT FRANCHISES
    // ==========================================

    if (
      q.includes("dormant") ||
      q.includes("inactive") ||
      q.includes("no bill") ||
      q.includes("no billing")
    ) {
      return (
        "FINCORE currently identifies 55 active franchises with no billing activity. " +
        "These franchises represent a potential activation opportunity. " +
        "The Growth Lever Simulator allows management to model how activating a selected number of dormant franchises could contribute additional annual revenue."
      );
    }

    // ==========================================
    // GROWTH LEVERS
    // ==========================================

    if (
      q.includes("growth lever") ||
      q.includes("growth simulator") ||
      q.includes("lever simulator")
    ) {
      return (
        "The Growth Lever Simulator currently models two active growth levers: " +
        "Franchise Attrition Reduction and Dormant Franchise Activation. " +
        "The owner can change both levers freely. The simulator then calculates the estimated additional annual revenue and adds it to the current company revenue to produce projected revenue. " +
        "A third lever, Strike Ratio Improvement, is currently marked as coming soon."
      );
    }

    // ==========================================
    // ATTRITION
    // ==========================================

    if (
      q.includes("attrition") ||
      q.includes("franchise leaving") ||
      q.includes("franchises leaving")
    ) {
      return (
        "The Franchise Attrition Reduction lever estimates revenue retained by reducing franchise attrition. " +
        "Its calculation uses the active franchise base and the observed average annual revenue of franchises that actually departed. " +
        "Increasing the lever increases the estimated annual revenue impact."
      );
    }

    // ==========================================
    // REVENUE
    // ==========================================

    if (
      q.includes("revenue") &&
      (q.includes("growth") ||
        q.includes("increase") ||
        q.includes("impact") ||
        q.includes("projection"))
    ) {
      return (
        "The Growth Lever Simulator starts with the current annual company revenue and adds the estimated revenue contribution from the selected growth levers. " +
        "Projected Revenue = Current Revenue + Attrition Impact + Dormant Activation Impact. " +
        "The result is compared against the owner's selected revenue target."
      );
    }

    // ==========================================
    // FRANCHISE CLUSTERING
    // ==========================================

    if (
      q.includes("cluster") ||
      q.includes("franchise performance") ||
      q.includes("franchise segmentation")
    ) {
      return (
        "Franchise clustering segments franchises into performance groups such as Core / Established, Established – High Value, High-Frequency Burst, New / Insufficient History, and Top Performer. " +
        "The segmentation helps management distinguish established franchises, high-value performers, newer franchises with limited history, and stronger growth opportunities."
      );
    }

    // ==========================================
    // TOP PERFORMERS
    // ==========================================

    if (
      q.includes("top performer") ||
      q.includes("best franchise") ||
      q.includes("best performing")
    ) {
      return (
        "The current franchise clustering identifies 13 franchises in the Top Performer segment. " +
        "This group has 0 recorded departures in the current clustering output, making it the strongest-performing segment in the available classification."
      );
    }

    // ==========================================
    // WORKFORCE
    // ==========================================

    if (
      q.includes("workforce") ||
      q.includes("employee") ||
      q.includes("team leader") ||
      q.includes("business developer") ||
      q.includes("bd")
    ) {
      return (
        "Workforce Intelligence focuses on Business Developers and Team Leaders and evaluates their historical growth performance against the growth rate required to achieve the selected business goal. " +
        "The Nx-Fit analysis separates members into categories such as On Pace, Below Pace – Would Need Acceleration, and Off Pace, while insufficient-history records are treated separately."
      );
    }

    // ==========================================
    // NX-FIT
    // ==========================================

    if (
      q.includes("nx-fit") ||
      q.includes("nx fit") ||
      q.includes("historical cagr") ||
      q.includes("required cagr")
    ) {
      return (
        "Nx-Fit compares an employee's historical CAGR with the CAGR required to achieve the selected growth target. " +
        "Members with sufficient historical data can be classified as On Pace, Below Pace – Would Need Acceleration, or Off Pace. " +
        "Records with insufficient history are separated because their growth rate cannot be considered reliable."
      );
    }

    // ==========================================
    // MANAGEMENT RECOMMENDATION
    // ==========================================

    if (
      q.includes("recommend") ||
      q.includes("management") ||
      q.includes("focus") ||
      q.includes("priority") ||
      q.includes("what should")
    ) {
      return (
        "Based on the current FINCORE analysis, management should focus on three areas: " +
        "1) reducing franchise attrition, " +
        "2) converting dormant active franchises into productive franchises, and " +
        "3) identifying workforce members who are below the growth pace required for the selected target. " +
        "These areas connect directly to the operational and revenue-growth decisions represented in the platform."
      );
    }

    // ==========================================
    // SUMMARY
    // ==========================================

    if (
      q.includes("summary") ||
      q.includes("overall") ||
      q.includes("overview") ||
      q.includes("health of the business")
    ) {
      return (
        "FINCORE provides three complementary views of the business. " +
        "ML Insights evaluates franchise performance and clustering. " +
        "The Growth Lever Simulator estimates the annual revenue impact of reducing attrition and activating dormant franchises. " +
        "Workforce Intelligence evaluates whether Business Developers and Team Leaders are growing fast enough to support the selected business target."
      );
    }

    // ==========================================
    // HELP
    // ==========================================

    if (
      q.includes("help") ||
      q.includes("what can you do") ||
      q.includes("questions")
    ) {
      return (
        "You can ask me about franchise clustering, dormant franchises, attrition, growth levers, revenue projections, workforce performance, Nx-Fit analysis, or management priorities."
      );
    }

    // ==========================================
    // DEFAULT
    // ==========================================

    return (
      "I can help analyze FINCORE's franchise performance, growth levers, workforce intelligence, and revenue targets. " +
      "Try asking about dormant franchises, attrition reduction, the Growth Lever Simulator, franchise clustering, or Nx-Fit."
    );
  }

  function sendMessage(text = input) {

    const question = text.trim();

    if (!question || typing) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: question,
      },
    ]);

    setInput("");
    setTyping(true);

    setTimeout(() => {

      const response = getResponse(question);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: response,
        },
      ]);

      setTyping(false);

    }, 700);
  }

  function handleSubmit(e) {

    e.preventDefault();

    sendMessage();

  }

  return (

    <div className="h-full flex flex-col">

      {/* PAGE HEADER */}

      <div className="mb-6">

        <div className="flex items-center gap-3">

          <div className="bg-teal-100 text-teal-700 p-3 rounded-xl">

            <Bot size={28} />

          </div>

          <div>

            <h1 className="text-4xl font-bold text-gray-800">

              AI Analyst

            </h1>

            <p className="text-gray-500 mt-1">

              Ask questions about FINCORE business intelligence.

            </p>

          </div>

        </div>

      </div>


      {/* CHAT CONTAINER */}

      <div className="bg-white rounded-2xl shadow-md flex-1 min-h-162.5 flex flex-col overflow-hidden">

        {/* CHAT HEADER */}

        <div className="border-b px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="relative">

              <div className="bg-teal-600 text-white p-2.5 rounded-full">

                <Bot size={22} />

              </div>

              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />

            </div>

            <div>

              <h2 className="font-bold text-gray-800">

                FINCORE Intelligence Assistant

              </h2>

              <p className="text-xs text-green-600">

                Online • Business Intelligence

              </p>

            </div>

          </div>

          <Sparkles className="text-teal-500" size={20} />

        </div>


        {/* MESSAGES */}

        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {messages.map((message, index) => (

            <div
              key={index}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[75%] rounded-2xl px-5 py-4 ${
                  message.role === "user"
                    ? "bg-teal-600 text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-700 rounded-bl-sm"
                }`}
              >

                {message.role === "assistant" && (

                  <div className="flex items-center gap-2 mb-2">

                    <Bot size={15} />

                    <span className="text-xs font-semibold">

                      FINCORE AI

                    </span>

                  </div>

                )}

                <p className="leading-relaxed text-sm">

                  {message.text}

                </p>

              </div>

            </div>

          ))}


          {/* TYPING INDICATOR */}

          {typing && (

            <div className="flex justify-start">

              <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-5 py-4">

                <div className="flex gap-1">

                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />

                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />

                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />

                </div>

              </div>

            </div>

          )}

        </div>


        {/* SUGGESTED QUESTIONS */}

        <div className="px-6 pb-4">

          <p className="text-xs text-gray-400 mb-3">

            Suggested questions

          </p>

          <div className="flex flex-wrap gap-2">

            {suggestedQuestions.map((question) => (

              <button
                key={question.text}
                type="button"
                onClick={() => sendMessage(question.text)}
                disabled={typing}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-teal-400 hover:bg-teal-50 hover:text-teal-700 transition disabled:opacity-50"
              >

                {question.icon}

                {question.text}

              </button>

            ))}

          </div>

        </div>


        {/* INPUT */}

        <form
          onSubmit={handleSubmit}
          className="border-t p-5"
        >

          <div className="flex gap-3">

            <input
              type="text"
              id="ai-analyst-input"
              name="aiAnalystInput"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask FINCORE anything about your business..."
              className="flex-1 border border-gray-300 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />

            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="bg-teal-600 text-white px-5 rounded-xl hover:bg-teal-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >

              <Send size={20} />

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}