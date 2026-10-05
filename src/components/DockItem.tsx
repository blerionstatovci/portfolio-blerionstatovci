import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export function DockItem({
  icon: Icon,
  label,
  active = false,
  magnify,
  onClick,
  dataDockApp,
  launcher = false,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  magnify: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  dataDockApp?: string;
  launcher?: boolean;
}) {
  const mouseX = useMotionValue(-1000);
  const itemRef = useRef<HTMLButtonElement>(null);
  const scale = useTransform(mouseX, (value) => {
    if (!magnify) return 1;
    const rect = itemRef.current?.getBoundingClientRect();
    const center = rect ? rect.left + rect.width / 2 : 0;
    const distance = Math.abs(value - center);
    return 1 + Math.max(0, 1 - distance / 220) * 0.18;
  });

  return (
    <motion.button
      className={`${launcher ? "dock-launcher" : "dock-app"}${active ? " active" : ""}`}
      data-dock-app={dataDockApp}
      title={label}
      aria-label={label}
      onClick={onClick}
      ref={itemRef}
      style={{ scale }}
      onMouseMove={(event) => mouseX.set(event.clientX)}
      onMouseLeave={() => mouseX.set(-1000)}
    >
      <Icon size={launcher ? 19 : 18} />
    </motion.button>
  );
}
