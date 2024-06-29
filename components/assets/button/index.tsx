const Button = ({
  className,
  content,
  onClick,
  type,
  children
}: {
  className?: string;
  content?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  children?: React.ReactNode;
}) => {
  return (
    <button
      className={`btn btn-primary flex items-center justify-center  font-bold border-2 border-emerald-600 hover:border-gray-800 transition-all duration-500 text-base bg-[#0E9F6E] rounded-[10px] ${className} `}
      onClick={onClick && onClick}
      type={type}
    >
      {content && content}
      {children && children}
    </button>
  );
};

export default Button;