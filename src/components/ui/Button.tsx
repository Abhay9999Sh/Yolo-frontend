interface ButtonProps {
  text?: string;
  onClick?: () => void;
  type?: "submit" | "button";
  variant?: "outline" | "solid";
  disabled?: boolean;
  children?: React.ReactNode;
}

export const Button = ({
  text,
  onClick,
  type = "button",
  variant = "solid",
  disabled = false,
  children,
}: ButtonProps) => {
  const baseClasses = "p-2 font-semibold rounded-md cursor-pointer";
  const variantClasses =
    variant === "outline"
      ? "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
      : "bg-blue-600 text-white hover:bg-blue-800";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
      disabled={disabled}
    >
      {text || children}
    </button>
  );
};
