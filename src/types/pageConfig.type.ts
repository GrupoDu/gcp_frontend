import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type PageConfig = {
  router: AppRouterInstance;
  canEdit: boolean;
};
