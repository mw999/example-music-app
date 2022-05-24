import React from "react";

type Select = {
  id: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default Select;