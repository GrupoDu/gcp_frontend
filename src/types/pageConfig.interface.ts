import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface PageConfig {
  router: AppRouterInstance;
  canEdit: boolean;
}
