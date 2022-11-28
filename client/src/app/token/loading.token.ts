import { HttpContext, HttpContextToken } from "@angular/common/http";

export const IS_NOT_LOADING = new HttpContextToken<boolean>(() => false);

export function isNotLoading() {
  return new HttpContext().set(IS_NOT_LOADING, true);
}

