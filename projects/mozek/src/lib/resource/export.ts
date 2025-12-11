export type MozColorName =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warn'
    | 'danger';

export function isHexColor(value: unknown): value is string {
    if (typeof value !== 'string') return false;
    return /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(value.trim());
}