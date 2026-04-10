type ClassValue = string | number | null | false | undefined | ClassValue[];

export function clsx(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) {
      const inner = clsx(...input);
      if (inner) out.push(inner);
    } else {
      out.push(String(input));
    }
  }
  return out.join(' ');
}
