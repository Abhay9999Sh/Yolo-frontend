interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  required,
}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2 border focus:ring-2 "
    />
  );
};
