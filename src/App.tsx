/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Layout, 
  Maximize, 
  Minimize, 
  Component, 
  Layers, 
  MousePointer2, 
  Info,
  ChevronRight,
  BoxSelect,
  Scaling,
  AlignCenter
} from "lucide-react";
import { useState, ReactNode } from "react";

interface ConceptCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  activeLabel?: string;
  hoverLabel?: string;
  shortcut?: string;
}

const ConceptCard = ({ title, description, icon, children, activeLabel, hoverLabel, shortcut }: ConceptCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
            {icon}
          </div>
          <h3 className="font-semibold text-slate-800">{title}</h3>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded">
            {isHovered ? (hoverLabel || "Active") : (activeLabel || "Default")}
          </div>
          {shortcut && (
            <div className="text-[9px] font-mono text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-sm">
              {shortcut}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1 p-8 bg-slate-50 flex items-center justify-center min-h-[240px] relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        {children}
      </div>

      <div className="p-5 bg-white">
        <p className="text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const AlignmentDemo = () => {
  const [position, setPosition] = useState("center-center");

  const positions = [
    "top-left", "top-center", "top-right",
    "center-left", "center-center", "center-right",
    "bottom-left", "bottom-center", "bottom-right"
  ];

  const getPositionStyles = (pos: string) => {
    const [y, x] = pos.split("-");
    let top = "50%";
    let left = "50%";
    let xOffset = "-50%";
    let yOffset = "-50%";

    if (x === "left") { left = "10%"; xOffset = "0%"; }
    if (x === "right") { left = "90%"; xOffset = "-100%"; }
    if (y === "top") { top = "10%"; yOffset = "0%"; }
    if (y === "bottom") { top = "90%"; yOffset = "-100%"; }

    return { top, left, x: xOffset, y: yOffset };
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="w-48 h-32 bg-white border border-slate-200 rounded shadow-inner relative overflow-hidden">
        {/* Alignment Guides */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <div className="w-full h-[1px] bg-slate-400 border-dashed border-t" />
          <div className="h-full w-[1px] bg-slate-400 border-dashed border-l" />
        </div>
        
        <motion.div 
          className="w-8 h-8 bg-purple-600 rounded shadow-lg absolute"
          animate={getPositionStyles(position)}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      </div>

      <div className="grid grid-cols-3 gap-1 p-1 bg-slate-200 rounded-lg">
        {positions.map((pos) => (
          <button
            key={pos}
            onClick={() => setPosition(pos)}
            className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
              position === pos 
                ? "bg-purple-600 text-white shadow-sm" 
                : "bg-white text-slate-400 hover:bg-slate-50"
            }`}
            title={pos.replace("-", " ")}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${position === pos ? "bg-white" : "bg-slate-300"}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-slate-900 selection:bg-purple-100 selection:text-purple-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Figma Concepts <span className="text-purple-600">Visualizer</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-semibold text-slate-600">
              <MousePointer2 size={14} />
              Hover to Learn
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight"
          >
            피그마의 어려운 개념들, <br/><span className="text-purple-600">마우스만 올리세요.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            Auto Layout의 Hug와 Fill와 같은 <br/>
            말로 설명하기 힘든 피그마의 핵심 기능들을 시각적으로 체험해보세요.
          </motion.p>
        </div>

        {/* Grid of Concepts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Concept 1: Auto Layout - Hug Content */}
          <ConceptCard 
            title="Auto Layout: Hug Content"
            description="컨테이너가 내부 요소의 크기에 맞춰 스스로 줄어듭니다. 텍스트가 길어지면 버튼도 함께 커지는 원리입니다."
            icon={<Minimize size={20} />}
            activeLabel="Fixed"
            hoverLabel="Hug"
            shortcut="Shift + A"
          >
            <motion.div 
              className="bg-purple-600 p-4 rounded-lg flex items-center justify-center shadow-lg"
              initial={{ width: 180 }}
              whileHover={{ width: "auto" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.span className="text-white font-bold whitespace-nowrap overflow-hidden">
                <motion.span initial={{ opacity: 0.5 }}>Button</motion.span>
                <motion.span 
                  initial={{ width: 0, opacity: 0 }}
                  whileHover={{ width: "auto", opacity: 1 }}
                  className="inline-block ml-1"
                >
                  Text is Growing!
                </motion.span>
              </motion.span>
            </motion.div>
          </ConceptCard>

          {/* Concept 2: Auto Layout - Fill Container */}
          <ConceptCard 
            title="Auto Layout: Fill Container"
            description="내부 요소가 부모 컨테이너의 남는 공간을 가득 채웁니다. 반응형 레이아웃을 만들 때 가장 중요한 개념입니다."
            icon={<Maximize size={20} />}
            activeLabel="Fixed"
            hoverLabel="Fill"
            shortcut="Shift + A"
          >
            <motion.div 
              className="w-full max-w-[200px] h-32 border-2 border-dashed border-slate-300 rounded-xl p-2 flex flex-col gap-2"
              whileHover={{ scale: 1.1 }}
            >
              <div className="h-8 bg-slate-200 rounded w-full" />
              <motion.div 
                className="bg-blue-500 rounded flex-1 flex items-center justify-center text-white text-xs font-bold"
                initial={{ width: "60%" }}
                whileHover={{ width: "100%" }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                FILL
              </motion.div>
              <div className="h-8 bg-slate-200 rounded w-full" />
            </motion.div>
          </ConceptCard>

          {/* Concept 3: Constraints - Scale */}
          <ConceptCard 
            title="Constraints: Scale"
            description="부모 프레임이 커질 때 내부 요소도 비율에 맞춰 함께 커집니다. 아이콘이나 배경 이미지를 다룰 때 유용합니다."
            icon={<Scaling size={20} />}
            activeLabel="Fixed"
            hoverLabel="Scale"
            shortcut="K (Scale Tool)"
          >
            <motion.div 
              className="w-32 h-32 bg-white border border-slate-200 rounded shadow-sm flex items-center justify-center relative"
              whileHover={{ width: 200, height: 200 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.div 
                className="bg-orange-400 rounded-md shadow-inner"
                initial={{ width: "40%", height: "40%" }}
                whileHover={{ width: "40%", height: "40%" }} // This stays relative in CSS if we used percentages, but let's animate it explicitly
                style={{ width: "40%", height: "40%" }}
              />
              {/* Constraint Visualizers */}
              <div className="absolute inset-0 border-2 border-orange-200 border-dashed rounded opacity-50" />
            </motion.div>
          </ConceptCard>

          {/* Concept 4: Alignment */}
          <ConceptCard 
            title="Alignment: 정렬"
            description="프레임 내에서 요소의 위치를 정렬합니다. 상단, 중앙, 하단 및 왼쪽, 중앙, 오른쪽 조합을 통해 완벽한 배치가 가능합니다."
            icon={<AlignCenter size={20} />}
            activeLabel="Interactive"
            hoverLabel="Interactive"
            shortcut="Alt + H / V"
          >
            <AlignmentDemo />
          </ConceptCard>

        </div>

        {/* Footer Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 p-8 bg-white rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="p-4 bg-purple-50 rounded-2xl text-purple-600">
            <Info size={40} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">왜 이 개념들이 중요한가요?</h3>
            <p className="text-slate-600 leading-relaxed">
              피그마는 단순한 그림 도구가 아니라 코드로 구현될 레이아웃의 논리를 설계하는 도구입니다. 
              Auto Layout과 Constraints를 완벽히 이해하면 개발자와의 협업이 더 쉬워지고, 
              어떤 화면 크기에서도 깨지지 않는 완벽한 디자인을 만들 수 있습니다.
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="border-t border-slate-200 py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-sm">© 2026 Figma Concept Visualizer. Created for Design Educators.</p>
          <div className="flex gap-6 text-slate-400">
            <a href="#" className="hover:text-slate-600 transition-colors">Twitter</a>
            <a href="#" className="hover:text-slate-600 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Dribbble</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
