"use client";

import { inputStyle } from "@/lib/input-styles";
import clsx from "clsx";
import { ChevronDown, type LucideIcon } from "lucide-react";
import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

type InputSelectOption = {
  value: string;
  label: string;
  icon?: LucideIcon;
};

type SelectProps = Omit<
  ComponentProps<"button">,
  "value" | "defaultValue" | "onChange" | "children"
> & {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options?: InputSelectOption[];
  children?: ReactNode;
  className?: string;
  labelText?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
};

export function InputSelect({
  name,
  value,
  defaultValue,
  onChange,
  options,
  children,
  className,
  labelText,
  error,
  placeholder = "Selecione uma opção",
  disabled,
  required,
  ...inputProps
}: SelectProps) {
  const id = useId();
  const listboxId = `${id}-options`;
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const [listboxPosition, setListboxPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const selectedValue = isControlled ? value : internalValue;

  const childOptions: InputSelectOption[] = Children.toArray(children).flatMap(
    (child) => {
      if (!isValidElement<{ value?: string; children?: ReactNode }>(child))
        return [];
      return [
        {
          value: child.props.value ?? "",
          label: String(child.props.children ?? ""),
        },
      ];
    },
  );
  const selectOptions = options ?? childOptions;
  const selectedOption = selectOptions.find(
    (option) => option.value === selectedValue,
  );

  useEffect(() => {
    if (!isOpen) return;

    function handleOutsideClick(event: MouseEvent) {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target) &&
        !listboxRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("pointerdown", handleOutsideClick);
    return () => document.removeEventListener("pointerdown", handleOutsideClick);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function updateListboxPosition() {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const bounds = trigger.getBoundingClientRect();
      setListboxPosition({
        top: bounds.bottom + 8,
        left: bounds.left,
        width: bounds.width,
      });
    }

    updateListboxPosition();
    window.addEventListener("resize", updateListboxPosition);
    window.addEventListener("scroll", updateListboxPosition, true);
    return () => {
      window.removeEventListener("resize", updateListboxPosition);
      window.removeEventListener("scroll", updateListboxPosition, true);
    };
  }, [isOpen]);

  function chooseOption(optionValue: string) {
    if (!isControlled) setInternalValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      setIsOpen(false);
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      const currentIndex = selectOptions.findIndex(
        (option) => option.value === selectedValue,
      );
      const offset = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex =
        (currentIndex + offset + selectOptions.length) % selectOptions.length;
      if (selectOptions.length) chooseOption(selectOptions[nextIndex].value);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((open) => !open);
    }
  }

  return (
    <div ref={rootRef} className="relative flex flex-col gap-2">
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <input type="hidden" name={name} value={selectedValue ?? ""} />
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-invalid={!!error}
        aria-required={required}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen((open) => !open)}
        className={clsx(
          inputStyle,
          className,
          "flex items-center justify-between bg-slate-700! pl-3! text-left",
          {
            "ring-blue-600": isOpen,
            "cursor-not-allowed": disabled,
          },
        )}
        {...inputProps}
      >
        {selectedOption?.icon && (
          <selectedOption.icon
            aria-hidden="true"
            className="mr-2 h-4 w-4 shrink-0"
          />
        )}
        <span className={clsx("truncate", !selectedOption && "text-slate-400")}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={clsx(
            "ml-3 h-4 w-4 shrink-0 transition-transform duration-200",
            {
              "rotate-180": isOpen,
            },
          )}
        />
      </button>
      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <ul
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            aria-label={labelText ?? "Opções"}
            style={{
              top: listboxPosition.top,
              left: listboxPosition.left,
              width: listboxPosition.width,
            }}
            className="fixed z-50 rounded border border-slate-400 bg-white py-1 shadow-lg dark:border-slate-600 dark:bg-slate-700"
          >
            {selectOptions.map((option) => {
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === selectedValue}
                >
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => chooseOption(option.value)}
                    className={clsx(
                      "flex",
                      "items-center",
                      "w-full",
                      "px-3",
                      "py-2",
                      "text-left",
                      "text-sm",
                      "text-slate-900",
                      "hover:bg-slate-100",
                      "focus:bg-slate-100",
                      "focus:outline-none",
                      "dark:text-slate-100",
                      "dark:hover:bg-slate-600",
                      "dark:focus:bg-slate-600",
                      {
                        "bg-slate-100 dark:bg-slate-600":
                          option.value === selectedValue,
                      },
                    )}
                  >
                    {option.icon && (
                      <option.icon
                        aria-hidden="true"
                        className="mr-2 h-4 w-4 shrink-0"
                      />
                    )}
                    <span>{option.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>,
          document.body,
        )}
      {error && <span className="mt-2 text-xs text-red-700">{error}</span>}
    </div>
  );
}
