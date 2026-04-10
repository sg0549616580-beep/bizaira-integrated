export const Label = ({ children }: { children: React.ReactNode }) => <label>{children}</label>;
export const Switch = ({ ...props }) => <input type="checkbox" {...props} />;
export const Slider = ({ ...props }) => <input type="range" {...props} />;
export const Separator = () => <hr />;
export const Tooltip = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const TooltipContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const TooltipTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
