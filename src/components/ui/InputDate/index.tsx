"use client";

import {
  inputError,
  inputLeftIcon,
  inputStyle,
  inputWrapper,
} from "@/lib/input-styles";
import clsx from "clsx";
import { CalendarDays } from "lucide-react";
import { useIMask } from "react-imask";
import { useId, useRef, useState } from "react";

type InputDateProps = {
  labelText?: string;
  className?: string;
  error?: string;
  defaultValue?: string;
  onAccept?: (value: string) => void;
} & Omit<
  React.ComponentProps<"input">,
  "type" | "min" | "max" | "value" | "defaultValue" | "onChange"
>;

function brDateToISO(value: string): string {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);

  if (!match) return "";

  const [, dayText, monthText, yearText] = match;
  const day = Number(dayText);
  const month = Number(monthText);
  const year = Number(yearText);

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return "";
  }

  return `${yearText}-${monthText}-${dayText}`;
}

function isoDateToBR(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) return "";

  const [, year, month, day] = match;
  return `${day}/${month}/${year}`;
}

export function InputDate({
  labelText,
  className,
  error,
  defaultValue,
  onAccept,
  placeholder,
  disabled,
  readOnly,
  ...props
}: InputDateProps) {
  const id = useId();
  const datePickerRef = useRef<HTMLInputElement>(null);

  const [calendarValue, setCalendarValue] = useState(() =>
    brDateToISO(defaultValue ?? ""),
  );

  const { ref, setValue } = useIMask<HTMLInputElement>(
    { mask: "00/00/0000" },
    {
      defaultValue,
      onAccept: (value) => {
        onAccept?.(value);
        setCalendarValue(brDateToISO(value));
      },
    },
  );

  function handleOpenCalendar() {
    const input = datePickerRef.current;

    if (!input || disabled || readOnly) return;

    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
        return;
      } catch {}
    }

    input.focus();
    input.click();
  }

  function handleCalendarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const isoDate = event.currentTarget.value;

    setCalendarValue(isoDate);
    setValue(isoDateToBR(isoDate));
  }

  return (
    <div className="flex flex-col gap-2">
      {labelText && <label htmlFor={id}>{labelText}</label>}

      <div className={clsx(inputWrapper, "relative", className)}>
        <input
          {...props}
          ref={ref}
          id={id}
          type="text"
          inputMode="numeric"
          className={inputStyle}
          placeholder={placeholder ?? "DD/MM/AAAA"}
          disabled={disabled}
          readOnly={readOnly}
        />

        <button
          type="button"
          aria-label="Abrir calendário"
          title="Abrir calendário"
          onClick={handleOpenCalendar}
          disabled={disabled || readOnly}
          className={clsx(inputLeftIcon, "cursor-pointer")}
        >
          <CalendarDays size={18} />
        </button>

        <input
          ref={datePickerRef}
          type="date"
          value={calendarValue}
          onChange={handleCalendarChange}
          disabled={disabled || readOnly}
          tabIndex={-1}
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-px w-px opacity-0"
        />
      </div>

      {error && <span className={inputError}>{error}</span>}
    </div>
  );
}
