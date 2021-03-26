import { ArrowDownIcon, ArrowUpIcon, UpDownIcon } from "@chakra-ui/icons";

export const orderBy = (countries, value, direction) => {
  if (direction === "asc" && value !== "name") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc" && value !== "name") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  if (direction === "asc" && value === "name") {
    return [...countries].sort((a, b) =>
      a[value].localeCompare > b[value].localeCompare ? 1 : -1
    );
  }

  if (direction === "desc" && value === "name") {
    return [...countries].sort((a, b) =>
      a[value].localeCompare > b[value].localeCompare ? -1 : 1
    );
  }

  return countries;
};
export const SortArrow = ({ direction }) => {
  console.log("init");
  if (direction == null) {
    return <UpDownIcon />;
  }

  if (direction === "desc") {
    return <ArrowDownIcon />;
  } else {
    return <ArrowUpIcon />;
  }
};
