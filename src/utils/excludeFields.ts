export function excludeFields<Type, Key extends keyof Type>(
  model: Type,
  keys: Key[]
): Omit<Type, Key> {
  for (let key of keys) delete model[key];
  return model;
}