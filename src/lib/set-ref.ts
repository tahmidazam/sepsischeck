import { RefObject } from "react";

export default function setRef<K, V>(
  map: RefObject<Map<K, V>>,
  key: K,
  node: V | null
) {
  if (node) {
    map.current.set(key, node);
  } else {
    map.current.delete(key);
  }
}
