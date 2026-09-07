declare module "lucide-react" {
	import type { ComponentType, SVGProps } from "react";

	export type LucideProps = SVGProps<SVGSVGElement> & {
		size?: number | string;
		strokeWidth?: number | string;
	};

	export type LucideIcon = ComponentType<LucideProps>;

	export const Menu: LucideIcon;
	export const X: LucideIcon;
	export const ArrowUpRight: LucideIcon;
	export const Download: LucideIcon;
	export const ExternalLink: LucideIcon;
	export const Star: LucideIcon;
	export const Award: LucideIcon;
	export const ShieldCheck: LucideIcon;
	export const Layers3: LucideIcon;
	export const Github: LucideIcon;
	export const PlayCircle: LucideIcon;
	export const ArrowLeft: LucideIcon;
	export const BrainCircuit: LucideIcon;
	export const Code2: LucideIcon;
	export const Cpu: LucideIcon;
	export const Radar: LucideIcon;
	export const Rocket: LucideIcon;
	export const Satellite: LucideIcon;
	export const Wrench: LucideIcon;
}
