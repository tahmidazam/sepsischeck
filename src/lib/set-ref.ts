import { MutableRefObject } from "react";

export default function setRef<K, V>(
  map: MutableRefObject<Map<K, V>>,
  key: K,
  node: V | null
) {
  if (node) {
    map.current.set(key, node);
  } else {
    map.current.delete(key);
  }
}
