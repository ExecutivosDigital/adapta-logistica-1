import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  show: boolean;
  onHide: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ show, onHide, children, className }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (show) {
      setIsModalOpen(true);
    } else {
      setTimeout(() => setIsModalOpen(false), 300);
    }
  }, [show]);

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z-[1002] flex w-full items-center justify-center p-4 text-center transition-opacity duration-300 ease-in-out"
          style={{ opacity: show ? 1 : 0 }}
        >
          <button
            onClick={onHide}
            className="absolute z-40 h-full w-full bg-black/20 backdrop-blur"
          />
          <div className="relative z-50 flex max-h-[85vh] w-max flex-col items-center justify-center">
            <div
              className={twMerge(
                "relative z-20 flex w-full max-w-[50vw] flex-col items-center justify-start gap-4 overflow-hidden rounded-md border bg-white px-2 py-4 shadow-md",
                className,
              )}
            >
              {children}
            </div>
            <div className="absolute right-0 bottom-0 z-10 h-full max-w-[50vw] blur-sm" />
          </div>
        </div>
      )}
    </>
  );
}
