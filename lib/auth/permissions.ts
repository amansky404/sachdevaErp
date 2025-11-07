export const PERMISSIONS = {
  DASHBOARD_VIEW: 'core:dashboard:view',
  USERS_MANAGE: 'admin:users:manage',
  ROLES_MANAGE: 'admin:roles:manage',
  ITEMS_VIEW: 'catalog:items:view',
  ITEMS_EDIT: 'catalog:items:edit',
  CATEGORIES_VIEW: 'catalog:categories:view',
  CATEGORIES_EDIT: 'catalog:categories:edit',
  INVENTORY_VIEW: 'inventory:stock:view',
  INVENTORY_ADJUST: 'inventory:stock:adjust',
  SALES_VIEW: 'sales:orders:view',
  SALES_CREATE: 'sales:orders:create',
  POS_ACCESS: 'pos:terminal:access'
} as const

export type PermissionCode = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

export function hasPermission(userPermissions: string[], required: PermissionCode) {
  return userPermissions.includes(required)
}

export function hasAnyPermission(userPermissions: string[], required: PermissionCode[]) {
  return required.some(permission => userPermissions.includes(permission))
}

export const DEFAULT_ROLES = {
  ADMIN: {
    name: 'Administrator',
    permissions: Object.values(PERMISSIONS)
  },
  MANAGER: {
    name: 'Store Manager',
    permissions: [
      PERMISSIONS.DASHBOARD_VIEW,
      PERMISSIONS.ITEMS_VIEW,
      PERMISSIONS.ITEMS_EDIT,
      PERMISSIONS.CATEGORIES_VIEW,
      PERMISSIONS.CATEGORIES_EDIT,
      PERMISSIONS.INVENTORY_VIEW,
      PERMISSIONS.INVENTORY_ADJUST,
      PERMISSIONS.SALES_VIEW,
      PERMISSIONS.SALES_CREATE,
      PERMISSIONS.POS_ACCESS
    ]
  },
  POS_USER: {
    name: 'POS Operator',
    permissions: [
      PERMISSIONS.ITEMS_VIEW,
      PERMISSIONS.CATEGORIES_VIEW,
      PERMISSIONS.INVENTORY_VIEW,
      PERMISSIONS.SALES_CREATE,
      PERMISSIONS.POS_ACCESS
    ]
  }
} as const
