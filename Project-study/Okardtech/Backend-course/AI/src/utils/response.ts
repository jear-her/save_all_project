// ─── Types ───────────────────────────────────────────────────────────────────

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface SuccessOnePayload<T> {
  success: true;
  data: T;
}

interface SuccessManyPayload<T> {
  success: true;
  data: T[];
  pagination: PaginationMeta;
}

interface ErrorPayload {
  success: false;
  message: string;
  errors?: unknown;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const responseOne = <T>(data: T): SuccessOnePayload<T> => ({
  success: true,
  data,
});

export const responseMany = <T>(
  data: T[],
  meta: { total: number; page: number; limit: number },
): SuccessManyPayload<T> => ({
  success: true,
  data,
  pagination: {
    total:      meta.total,
    page:       meta.page,
    limit:      meta.limit,
    totalPages: Math.ceil(meta.total / meta.limit),
  },
});

export const responseError = (message: string, errors?: unknown): ErrorPayload => ({
  success: false,
  message,
  ...(errors !== undefined && { errors }),
});
