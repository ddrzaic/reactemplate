"use client";

import { Accordion, Button, Input, Dropdown } from "@/ui/components";
import React from "react";

const dropdownOptions = [
  { label: "Option 1", value: "option-1" },
  { label: "Option 2", value: "option-2" },
  { label: "Option 3", value: "option-3" },
];

export default function Demo() {
  const [value, setValue] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState(
    dropdownOptions[0]
  );

  return (
    <main>
      <h1>Demo</h1>
      <p>Input demo</p>
      <Input value={value} onChange={setValue} />
      <p>Button demo</p>
      <Button onClick={() => alert(value)}>Alert input value</Button>
      <p>Accordion demo</p>
      <Accordion title="Accordion 1">
        <p>Accordion first p</p>
        <p>Accordion second p</p>
        <p>Accordion third p</p>
      </Accordion>

      <p>Dropdown demo</p>
      <Dropdown
        options={dropdownOptions}
        selectedOption={selectedOption}
        onChange={setSelectedOption}
      />
    </main>
  );
}
