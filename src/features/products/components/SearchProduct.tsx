import { rem, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export function SearchProducts({
  searchFn,
}: {
  searchFn: (searchTerm: string) => void;
}) {
  return (
    <TextInput
      radius="xl"
      size="md"
      placeholder="Search Products"
      rightSectionWidth={42}
      onChange={(e) => searchFn(e.target.value)}
      leftSection={
        <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      }
    />
  );
}
