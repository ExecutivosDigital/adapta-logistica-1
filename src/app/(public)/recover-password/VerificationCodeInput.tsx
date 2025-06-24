import { ChangeEvent, FC, KeyboardEvent, useCallback, useRef } from "react";

type VerificationCodeInputProps = {
  /** Número de dígitos do código */
  length?: number;
  /** Callback disparado quando o código estiver completo */
  onComplete?: (code: string) => void;
};

const VerificationCodeInput: FC<VerificationCodeInputProps> = ({
  length = 6,
  onComplete,
}) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>(
    Array(length).fill(null),
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = val;
    if (val && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
    checkComplete();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    const { key } = e;
    const current = e.currentTarget;

    if (
      (key === "Backspace" || key === "Delete") &&
      !current.value &&
      idx > 0
    ) {
      inputsRef.current[idx - 1]?.focus();
    }

    if ((key === " " || key === "Tab") && current.value && idx < length - 1) {
      e.preventDefault();
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const checkComplete = () => {
    const code = inputsRef.current.map((input) => input?.value || "").join("");
    if (code.length === length && onComplete) {
      onComplete(code);
    }
  };
  const handleRef = useCallback((el: HTMLInputElement | null, idx: number) => {
    inputsRef.current[idx] = el;
  }, []);
  return (
    <div className="grid grid-cols-6 gap-2">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={(el) => handleRef(el, idx)}
          className="h-12 w-12 appearance-none rounded-lg border border-zinc-200 text-center text-base focus:outline-none"
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
        />
      ))}
    </div>
  );
};

export default VerificationCodeInput;
