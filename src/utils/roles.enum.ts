export enum Roles {
  ADMIN = "admin",
  MANAGER = "manager",
  VIEWER = "viewer",
}
export enum RolesGroup {
  ADMINISTRATION = [Roles.ADMIN],
  MANAGEMENT = [Roles.ADMIN, Roles.MANAGER],
  VIEWER = [Roles.ADMIN, Roles.MANAGER, Roles.VIEWER],
}
