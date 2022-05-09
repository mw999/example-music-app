import React, { useState } from "react";

import { Input, Flex, Button } from "../../../Components/index";

const SongDetails = ({ initialName = "", onSubmit }) => {
  const [name, setName] = useState(initialName);

  const handleNameChange = (event) => {
    const name = event.target.value;

    setName(name);
  };

  const handleSubmit = (event) => {
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
