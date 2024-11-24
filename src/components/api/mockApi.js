const roles = [
    { id: 1, roleName: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, roleName: 'User', permissions: ['Read'] },
  ];
  
  export const fetchRoles = async () => roles;
  
  export const updateRolePermissions = async (roleId, updatedPermissions) => {
    const roleIndex = roles.findIndex((role) => role.id === roleId);
    if (roleIndex > -1) {
      roles[roleIndex].permissions = updatedPermissions;
    }
    return roles[roleIndex];
  };
  