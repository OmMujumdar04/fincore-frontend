
// import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
// import { useState } from "react";
// import {
//   Menu,
//   X,
//   BarChart3,
//   TrendingUp,
//   Users,
//   Bot,
// } from "lucide-react";

// import MLInsights from "./pages/MLInsights";
// import GrowthLeverSimulator from "./pages/GrowthLeverSimulator";

// function App() {
//   const [collapsed, setCollapsed] = useState(false);

//   const menuItems = [
//     {
//       title: "ML Insights",
//       icon: <BarChart3 size={22} />,
//       path: "/",
//     },
//     {
//       title: "Growth Lever Simulator",
//       icon: <TrendingUp size={22} />,
//       path: "/growth",
//     },
//     {
//       title: "Workforce Intelligence",
//       icon: <Users size={22} />,
//       path: "/workforce",
//     },
//     {
//       title: "AI Analyst",
//       icon: <Bot size={22} />,
//       path: "/ai",
//     },
//   ];

//   return (
//     <BrowserRouter>

//       <div className="flex h-screen bg-slate-100">

//         {/* Sidebar */}

//         <aside
//           className={`${
//             collapsed ? "w-20" : "w-72"
//           } bg-white shadow-lg transition-all duration-300 flex flex-col`}
//         >

//           <div className="flex items-center justify-between p-5 border-b">

//             {!collapsed && (
//               <div>
//                 <h1 className="text-3xl font-bold text-teal-600">
//                   FINCORE
//                 </h1>

//                 <p className="text-sm text-gray-500">
//                   Analytics Platform
//                 </p>
//               </div>
//             )}

//             <button
//               onClick={() => setCollapsed(!collapsed)}
//               className="p-2 rounded-lg hover:bg-gray-100"
//             >
//               {collapsed ? <Menu /> : <X />}
//             </button>

//           </div>

//           <nav className="flex-1 p-3">

//             {menuItems.map((item) => (
//               <NavLink
//                 key={item.title}
//                 to={item.path}
//                 end={item.path === "/"}
//                 className={({ isActive }) =>
//                   `flex items-center gap-4 p-4 rounded-xl mb-2 transition ${
//                     isActive
//                       ? "bg-teal-50 text-teal-700 font-semibold"
//                       : "hover:bg-gray-100"
//                   }`
//                 }
//               >
//                 {item.icon}
//                 {!collapsed && <span>{item.title}</span>}
//               </NavLink>
//             ))}

//           </nav>

//         </aside>

//         {/* Main */}

//         <main className="flex-1 flex flex-col">

//           <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">

//             <div>

//               <h1 className="text-3xl font-bold">
//                 FINCORE Analytics Platform
//               </h1>

//               <p className="text-gray-500">
//                 AI Powered Business Intelligence
//               </p>

//             </div>

//             <select className="border rounded-lg px-3 py-2">

//               <option>FY 2025-26</option>
//               <option>FY 2024-25</option>
//               <option>FY 2023-24</option>

//             </select>

//           </header>

//           <div className="flex-1 p-8 overflow-auto">

//             <Routes>

//               <Route
//                 path="/"
//                 element={<MLInsights />}
//               />

//               <Route
//                 path="/growth"
//                 element={<GrowthLeverSimulator />}
//               />

//               <Route
//                 path="/workforce"
//                 element={
//                   <h1 className="text-3xl font-bold">
//                     Workforce Intelligence
//                   </h1>
//                 }
//               />

//               <Route
//                 path="/ai"
//                 element={
//                   <h1 className="text-3xl font-bold">
//                     AI Analyst
//                   </h1>
//                 }
//               />

//             </Routes>

//           </div>

//         </main>

//       </div>

//     </BrowserRouter>
//   );
// }

// export default App;





import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";

import {
  Menu,
  X,
  BarChart3,
  TrendingUp,
  Users,
  Bot,
} from "lucide-react";

import MLInsights from "./pages/MLInsights";
import GrowthLeverSimulator from "./pages/GrowthLeverSimulator";
import AIAnalyst from "./pages/AIAnalyst";
import WorkforceIntelligence from "./pages/WorkforceIntelligence";

function App() {

  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      title: "ML Insights",
      icon: <BarChart3 size={20} />,
      path: "/",
    },
    {
      title: "Growth Lever Simulator",
      icon: <TrendingUp size={20} />,
      path: "/growth",
    },
    {
      title: "Workforce Intelligence",
      icon: <Users size={20} />,
      path: "/workforce",
    },
    {
      title: "AI Analyst",
      icon: <Bot size={20} />,
      path: "/ai",
    },
  ];

  return (

    <BrowserRouter>

      <div className="flex h-screen bg-slate-100">

        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <aside
          className={`${
            collapsed ? "w-20" : "w-72"
          } bg-white shadow-lg transition-all duration-300 flex flex-col`}
        >

          {/* Sidebar Header */}

          <div className="flex items-center justify-between p-5 border-b">

            {!collapsed && (

              <div>

                <h1 className="text-3xl font-bold text-teal-600">
                  FINCORE
                </h1>

                <p className="text-sm text-gray-500">
                  Analytics Platform
                </p>

              </div>

            )}

            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label={
                collapsed
                  ? "Expand sidebar"
                  : "Collapse sidebar"
              }
            >

              {collapsed ? (
                <Menu size={22} />
              ) : (
                <X size={22} />
              )}

            </button>

          </div>


          {/* Navigation */}

          <nav className="flex-1 p-3">

            {menuItems.map((item) => (

              <NavLink
                key={item.title}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-4 rounded-xl mb-2 transition ${
                    isActive
                      ? "bg-teal-50 text-teal-700 font-semibold"
                      : "hover:bg-gray-100"
                  }`
                }
              >

                {item.icon}

                {!collapsed && (
                  <span>{item.title}</span>
                )}

              </NavLink>

            ))}

          </nav>

        </aside>


        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <main className="flex-1 flex flex-col min-w-0">

          {/* Header */}

          <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">

            <div>

              <h1 className="text-3xl font-bold">
                FINCORE Analytics Platform
              </h1>

              <p className="text-gray-500">
                AI Powered Business Intelligence
              </p>

            </div>


            {/* Financial Year */}

            <select
              id="header-financial-year"
              name="headerFinancialYear"
              className="border rounded-lg px-3 py-2"
            >

              <option>FY 2025-26</option>

              <option>FY 2024-25</option>

              <option>FY 2023-24</option>

            </select>

          </header>


          {/* Page Content */}

          <div className="flex-1 p-8 overflow-auto">

            <Routes>

              {/* =================================================
                  ML INSIGHTS
              ================================================= */}

              <Route
                path="/"
                element={<MLInsights />}
              />


              {/* =================================================
                  GROWTH LEVER SIMULATOR
              ================================================= */}

              <Route
                path="/growth"
                element={<GrowthLeverSimulator />}
              />


              {/* =================================================
                  WORKFORCE INTELLIGENCE
              ================================================= */}

              <Route
  path="/workforce"
  element={<WorkforceIntelligence />}
/>


              {/* =================================================
                  AI ANALYST
              ================================================= */}

              <Route
                path="/ai"
                element={<AIAnalyst />}
              />

            </Routes>

          </div>

        </main>

      </div>

    </BrowserRouter>

  );
}

export default App;