import { DateValue, fromDate, getLocalTimeZone } from "@internationalized/date";
import { ChevronDown } from "lucide-react";
import { useMemo } from "react";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DateSegment,
  Dialog,
  DatePicker as DP,
  Group,
  Heading,
  Label,
  Popover,
} from "react-aria-components";

/**
 * Componente DatePicker estilizado com Tailwind.
 * Aceita tanto objetos do `@internationalized/date` quanto `Date` nativa.
 */
interface DatePickerProps {
  /** Texto exibido no rótulo */
  label: string;
  /** Pode ser `CalendarDate`, `CalendarDateTime`, `ZonedDateTime`, `Date` ou `null` */
  value: DateValue | Date | null;
  /** Callback disparado sempre que o valor muda (retorna `DateValue | null`) */
  onChange: (value: DateValue | null) => void;
}

export function DatePicker({ label, value, onChange }: DatePickerProps) {
  // Converte Date nativa em ZonedDateTime para o React Aria aceitar.
  const normalizedValue = useMemo(() => {
    if (value instanceof Date) {
      return fromDate(value, getLocalTimeZone());
    }
    return value;
  }, [value]);

  return (
    <DP
      value={normalizedValue ?? null}
      onChange={onChange}
      granularity="day"
      className="inline-block"
    >
      <Label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </Label>

      <Group className="flex items-center gap-2">
        <DateInput className="rounded border border-gray-300 px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none">
          {(segment) => (
            <DateSegment segment={segment} className="px-1 text-sm" />
          )}
        </DateInput>
        <Button className="rounded p-2 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <ChevronDown className="h-5 w-5 text-gray-600" />
        </Button>
      </Group>

      <Popover className="z-20">
        <Dialog className="mt-2 w-72 rounded-lg bg-white p-4 shadow-lg sm:w-80">
          <Calendar>
            <header className="mb-2 flex items-center justify-between">
              <Button
                slot="previous"
                className="rounded p-1 hover:bg-gray-100 focus:outline-none"
              >
                ◀
              </Button>
              <Heading className="text-lg font-semibold text-gray-800" />
              <Button
                slot="next"
                className="rounded p-1 hover:bg-gray-100 focus:outline-none"
              >
                ▶
              </Button>
            </header>

            <CalendarGrid className="border-separate border-spacing-1 text-center">
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="h-8 w-8 text-xs font-semibold text-gray-500">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => (
                  <CalendarCell
                    date={date}
                    className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-200 focus:outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[selected]:bg-blue-500 data-[selected]:text-white"
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </DP>
  );
}
