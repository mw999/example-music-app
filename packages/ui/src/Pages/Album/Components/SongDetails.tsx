import React, { useState } from "react";

import { Input, Flex, Button } from "../../../Components/index";

type Props = {
  initialName: string;
  onSubmit: (form: { name: string }) => void;
};

const SongDetails = ({ initialName, onSubmit }: Props) => {
  const [name, setName] = useState(initialName);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;

    setName(name);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name) {
      return null;
    }

    onSubmit({ name });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Flex xSpaceSm>
        <Input
          style={{ width: "100%" }}
          value={name}
          onChange={handleNameChange}
        />
        <Button type="submit" disabled={!name}>
          Save
        </Button>
      </Flex>
    </form>
  );
};

export default SongDetails;
