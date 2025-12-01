import { useMemo } from "react";
import { FilterOptions } from "../api/types";

export const useParsedFilterOptions = (filterOptions: FilterOptions) => {
  const parsedFilters = useMemo(() => {
    const queryParams = Object.entries(filterOptions)
      .map(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          return `${key}=${value.join(",")}`;
        }
        if (typeof value === "number" || typeof value === "string") {
          return `${key}=${value}`;
        }
        return "";
      })
      .filter(Boolean) // Removes empty strings
      .join("&");

    return queryParams.length > 0 ? `?${queryParams}` : "";
  }, [filterOptions]);

  return parsedFilters;
};
