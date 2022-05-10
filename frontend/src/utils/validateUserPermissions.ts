interface User {
  roles: string;
}

interface ValidateUserPermissionsParams {
  user: User;
  roles?: string[];
}

export function validateUserPermissions({
  user,
  roles,
}: ValidateUserPermissionsParams) {
  if (roles?.length > 0) {
    const hasAllRoles = roles.includes(user.roles);

    if (!hasAllRoles) {
      return false;
    }
  }

  return true;
}
