import { useState } from "react";

export function useSmartMemory<T>(initialValue: T) {
  const [memory, setMemory] = useState<T>(initialValue);

  const updateMemory = (value: T | ((prev: T) => T)) => {
    setMemory((prev) => (typeof value === "function" ? (value as (prev: T) => T)(prev) : value));
  };

  return { memory, updateMemory };
}
