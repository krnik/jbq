export function Validator (pattern: any, data: any) {
  for (const fn of pattern.check)
    fn(data);
}
