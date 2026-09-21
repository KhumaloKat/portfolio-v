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
	export const Github: LucideIcon;
	export const PlayCircle: LucideIcon;
	export const ArrowLeft: LucideIcon;
}
