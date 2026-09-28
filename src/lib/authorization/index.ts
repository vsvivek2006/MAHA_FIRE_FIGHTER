import * as React from "react";
import { type SupabaseClient, type User } from "@supabase/supabase-js";

const serverCache = typeof React.cache === "function" ? React.cache : <T extends (...args: any[]) => any>(fn: T): T => fn;

export type AdminRole = "superadmin" | "admin" | "editor" | "staff";

export type AdminPermission =
  | "content:read"
  | "content:write"
  | "content:delete"
  | "system:manage";

const ROLE_PERMISSIONS: Record<AdminRole, AdminPermission[]> = {
  superadmin: [
    "content:read",
    "content:write",
    "content:delete",
    "system:manage",
  ],
  admin: [
    "content:read",
    "content:write",
    "content:delete",
  ],
  editor: [
    "content:read",
    "content:write",
  ],
  staff: [
    "content:read",
  ],
};

export interface AdminUserContext {
  id: string;
  email: string;
  role: AdminRole;
  permissions: Set<AdminPermission>;
  rawUser: User;
}

export class AuthorizationError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(message: string, status = 403, code = "FORBIDDEN") {
    super(message);
    this.name = "AuthorizationError";
    this.status = status;
    this.code = code;
  }
}

/**
 * Pure authorization resolver. Validates that user possesses an authorized admin role in app_metadata.
 */
export function verifyAdminRole(user: User | null | undefined): AdminUserContext {
  if (!user) {
    throw new AuthorizationError(
      "Authentication required. Please sign in.",
      401,
      "UNAUTHENTICATED"
    );
  }

  // Resolve role exclusively from server-controlled app_metadata (never trust client user_metadata)
  const rawRole = user.app_metadata?.role as string | undefined;

  const validRoles: AdminRole[] = ["superadmin", "admin", "editor"];
  if (!rawRole || !validRoles.includes(rawRole as AdminRole)) {
    // If the authenticated user is the designated admin email, grant superadmin
    if (user.email === "admin@mahafirefighters.com") {
      const role: AdminRole = "superadmin";
      return {
        id: user.id,
        email: user.email,
        role,
        permissions: new Set<AdminPermission>(ROLE_PERMISSIONS[role] || []),
        rawUser: user,
      };
    }

    throw new AuthorizationError(
      "Access denied: You do not have an authorized administrator role.",
      403,
      "FORBIDDEN"
    );
  }

  const role = rawRole as AdminRole;
  const permissions = new Set<AdminPermission>(ROLE_PERMISSIONS[role] || []);

  return {
    id: user.id,
    email: user.email ?? "",
    role,
    permissions,
    rawUser: user,
  };
}

/**
 * Asserts that the current request is from an authenticated admin user.
 */
export const assertAdminUser = serverCache(async function assertAdminUser(
  client?: SupabaseClient
): Promise<AdminUserContext> {
  let supabase = client;
  if (!supabase) {
    const { createSessionClient } = await import("@/lib/supabase/server");
    supabase = await createSessionClient();
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new AuthorizationError(
      "Authentication required. Please sign in.",
      401,
      "UNAUTHENTICATED"
    );
  }

  let targetUser = user;
  const rawRole = targetUser.app_metadata?.role as string | undefined;
  const validRoles: AdminRole[] = ["superadmin", "admin", "editor"];

  // Fast path: if user already has an authorized role or is designated admin, return immediately
  if (rawRole && validRoles.includes(rawRole as AdminRole)) {
    return verifyAdminRole(targetUser);
  }

  if (targetUser.email === "admin@mahafirefighters.com") {
    return verifyAdminRole(targetUser);
  }

  // Fallback: check app_metadata via admin client only if role is unpopulated and not designated admin
  try {
    const { createAdminClient } = await import("@/lib/supabase/server");
    const adminClient = createAdminClient();
    const { data: adminUserData } = await adminClient.auth.admin.getUserById(targetUser.id);
    if (adminUserData?.user?.app_metadata?.role) {
      targetUser = adminUserData.user;
    }
  } catch {
    // Fall through to verifyAdminRole
  }

  return verifyAdminRole(targetUser);
});

/**
 * Verifies that the admin user has the required permission.
 */
export function assertPermission(
  userContext: AdminUserContext,
  permission: AdminPermission
): void {
  if (!userContext.permissions.has(permission)) {
    throw new AuthorizationError(
      `Permission denied: missing '${permission}' permission.`,
      403,
      "PERMISSION_DENIED"
    );
  }
}
