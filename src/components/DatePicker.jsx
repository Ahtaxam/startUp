
import { Datepicker } from "flowbite-react";

export function Component() {
  return <Datepicker minDate={new Date()} maxDate={new Date(2023, 3, 30)} />;
}
