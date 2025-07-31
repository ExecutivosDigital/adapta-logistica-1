import {
  CalendarDate,
  DateValue,
  fromDate,
  getLocalTimeZone,
  today,
  ZonedDateTime,
} from "@internationalized/date";
import moment from "moment";
import { useMemo, useState } from "react";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Dialog,
  DatePicker as DP,
  Group,
  Heading,
  Popover,
} from "react-aria-components";
import CalendarSearchIcon from "../../../public/icons/calendar";

export type DatePickerView = "day" | "month" | "year";

interface DatePickerProps {
  value: DateValue | Date | null;
  label?: string;
  onChange: (value: DateValue | null) => void;
  view?: DatePickerView; // defaults to "day"
  invisible?: boolean;
}

/**
 * A fresh calendar‑picker implementation with three independent modes:
 *  - **day**  → full month view (7×6 grid) – uses `react‑aria` Calendar for a11y.
 *  - **month**→ grid 3×4 with the 12 months of the selected year.
 *  - **year** → grid 3×4 with 12 consecutive years (current−6 … current+5),
 *               arrows move the 12‑year window backward / forward.
 */
export function SimpleDatePicker({
  value,
  onChange,
  label,
  invisible = false,
  view = "day",
}: DatePickerProps) {
  /** Convert JS `Date` to `CalendarDate` once. */
  const normalizedValue: CalendarDate | ZonedDateTime | null = useMemo(() => {
    if (value instanceof Date) {
      return fromDate(value, getLocalTimeZone());
    }
    return value as CalendarDate | ZonedDateTime | null;
  }, [value]);

  const todayDate = today(getLocalTimeZone());
  const initialYear = normalizedValue?.year ?? todayDate.year;

  // ——— State for month view ———
  const [monthYear, setMonthYear] = useState(initialYear);

  // ——— State for year view (start of the 12‑year page) ———
  const [yearPageStart, setYearPageStart] = useState(initialYear - 6);

  // Formatter helpers (memoised)
  const monthFormatter = useMemo(
    () => new Intl.DateTimeFormat("pt-BR", { month: "short" }),
    [],
  );

  // Utility: create CalendarDate safely.
  const makeDate = (y: number, m = 1, d = 1) => new CalendarDate(y, m, d);

  /* ------------------------------------------------------------ */
  /*                    RENDER TRIGGER & POPOVER                  */
  /* ------------------------------------------------------------ */
  return (
    <DP value={normalizedValue} onChange={onChange} className={`inline-block`}>
      {/* ─── Trigger Button ─── */}
      <Group
        className={`top-0 left-0 flex h-full w-full items-center gap-2 ${invisible ? "absolute" : ""}`}
      >
        <Button
          className={`focus:ring-none flex h-full w-full flex-row gap-2 rounded p-2 focus:outline-none`}
        >
          {!invisible && (
            <>
              {label && (
                <span className="text-sm">
                  {view === "day"
                    ? moment(value).format("DD/MM/yy")
                    : view === "month"
                      ? moment(value).format("MMMM")
                      : moment(value).format("YYYY") || label}
                </span>
              )}
              <CalendarSearchIcon className="h-5 w-5 text-gray-600" />
            </>
          )}
        </Button>
      </Group>

      {/* ─── Popover Content ─── */}
      <Popover className="z-20">
        <Dialog className="border-primary mt-2 w-80 rounded-lg border bg-white p-4 shadow-lg">
          {/* ---------------- DAY MODE ---------------- */}
          {view === "day" && (
            <Calendar>
              <header className="mb-2 flex items-center justify-between">
                <Button
                  slot="previous"
                  className="rounded p-1 hover:bg-gray-100"
                >
                  ◀
                </Button>
                <Heading className="text-lg font-semibold text-gray-800" />
                <Button slot="next" className="rounded p-1 hover:bg-gray-100">
                  ▶
                </Button>
              </header>

              <CalendarGrid className="border-separate border-spacing-1 text-center">
                <CalendarGridHeader>
                  {(dayLabel) => (
                    <CalendarHeaderCell className="h-8 w-8 text-xs font-semibold text-gray-500">
                      {dayLabel}
                    </CalendarHeaderCell>
                  )}
                </CalendarGridHeader>

                <CalendarGridBody>
                  {(date) => (
                    <CalendarCell
                      key={date.toString()}
                      date={date}
                      className="data-[selected]:bg-primary flex h-8 w-8 items-center justify-center rounded hover:bg-gray-200 focus:outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[selected]:text-white"
                    />
                  )}
                </CalendarGridBody>
              </CalendarGrid>
            </Calendar>
          )}

          {/* ---------------- MONTH MODE ---------------- */}
          {view === "month" && (
            <div className="flex flex-col gap-2">
              {/* Navigation header */}
              <header className="flex items-center justify-between">
                <Button
                  onPress={() => setMonthYear((y) => y - 1)}
                  className="rounded p-1 hover:bg-gray-100"
                >
                  ◀
                </Button>
                <Heading
                  className="text-lg font-semibold text-gray-800"
                  aria-label="Ano exibido"
                >
                  {monthYear}
                </Heading>
                <Button
                  onPress={() => setMonthYear((y) => y + 1)}
                  className="rounded p-1 hover:bg-gray-100"
                >
                  ▶
                </Button>
              </header>

              {/* 3×4 grid of months */}
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
                  const isSelected =
                    normalizedValue?.year === monthYear &&
                    normalizedValue?.month === month;
                  return (
                    <Button
                      key={month}
                      onPress={() => onChange(makeDate(monthYear, month))}
                      className={`flex h-10 justify-center rounded p-2 text-sm capitalize hover:bg-gray-200 focus:outline-none ${
                        isSelected ? "bg-primary font-semibold text-white" : ""
                      }`}
                    >
                      {monthFormatter.format(
                        makeDate(monthYear, month).toDate(getLocalTimeZone()),
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ---------------- YEAR MODE ---------------- */}
          {view === "year" && (
            <div className="flex flex-col gap-2">
              {/* Navigation header */}
              <header className="flex items-center justify-between">
                <Button
                  onPress={() => setYearPageStart((y) => y - 12)}
                  className="rounded p-1 hover:bg-gray-100"
                >
                  ◀
                </Button>
                <Heading
                  className="text-lg font-semibold text-gray-800"
                  aria-label="Intervalo de anos exibido"
                >
                  {yearPageStart} – {yearPageStart + 11}
                </Heading>
                <Button
                  onPress={() => setYearPageStart((y) => y + 12)}
                  className="rounded p-1 hover:bg-gray-100"
                >
                  ▶
                </Button>
              </header>

              {/* 3×4 grid of years */}
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 12 }, (_, i) => yearPageStart + i).map(
                  (yr) => {
                    const isSelected = normalizedValue?.year === yr;
                    return (
                      <Button
                        key={yr}
                        onPress={() => onChange(makeDate(yr))}
                        className={`flex h-10 items-center justify-center rounded p-2 text-sm hover:bg-gray-200 focus:outline-none ${
                          isSelected
                            ? "bg-primary font-semibold text-white"
                            : ""
                        }`}
                      >
                        {yr}
                      </Button>
                    );
                  },
                )}
              </div>
            </div>
          )}
        </Dialog>
      </Popover>
    </DP>
  );
}
