interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  onClick: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-300 text-purple-500",
};

const sizeStyles = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-md",
  lg: "px-6 py-3 text-lg",
};

const defaultStyles = "m-2 rounded-md flex";

export const Button = (props: ButtonProps) => {
  return (
    <button className={`${variantStyles[props.variant]} ${sizeStyles[props.size]} ${defaultStyles}`} onClick={props.onClick}>
      <div className="flex items-center">
        {props.startIcon}
        <div className="px-2">{props.text}</div>
        {props.endIcon}
      </div>
    </button>
  );
};

<Button variant="primary" size="md" text="Click Me" onClick={() => console.log("Button clicked")} />;
