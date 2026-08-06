import { SystemRole, SystemRoleType } from "@/shared/enum/SystemRoleType";

const HOME_ROUTE_BY_ROLE: Record<SystemRoleType, string> = {
  [SystemRole.PARK]: "/veiculos",
  [SystemRole.GUARD]: "/veiculos",
  [SystemRole.RH]: "/gestao-usuarios",
  [SystemRole.ADMIN]: "/gestao-usuarios",
};

const ALLOWED_ROUTE_PREFIXES_BY_ROLE: Record<
  SystemRoleType,
  readonly string[]
> = {
  [SystemRole.PARK]: [
    "/veiculos",
    "/ocorrencias",
    "/notificacoes",
    "/perfil",
    "/solicitacoes",
  ],
  [SystemRole.GUARD]: ["/veiculos", "/ocorrencias", "/notificacoes", "/perfil"],
  [SystemRole.RH]: ["/gestao-usuarios", "/perfil"],
  [SystemRole.ADMIN]: ["/gestao-usuarios"],
};

function isOccurrenceWriteRoute(pathname: string): boolean {
  return (
    pathname === "/ocorrencias/cadastrar" ||
    /^\/ocorrencias\/[^/]+\/editar$/.test(pathname)
  );
}

function isVehicleCreateRoute(pathname: string): boolean {
  return pathname === "/veiculos/adicionar";
}

export function getHomeRoute(role: SystemRoleType): string {
  return HOME_ROUTE_BY_ROLE[role];
}

export function canAccessRoute(
  role: SystemRoleType,
  pathname: string,
): boolean {
  if (
    isOccurrenceWriteRoute(pathname) &&
    role !== SystemRole.GUARD &&
    role !== SystemRole.ADMIN
  ) {
    return false;
  }

  if (
    isVehicleCreateRoute(pathname) &&
    role !== SystemRole.PARK &&
    role !== SystemRole.ADMIN
  ) {
    return false;
  }

  return ALLOWED_ROUTE_PREFIXES_BY_ROLE[role].some(
    (routePrefix) =>
      pathname === routePrefix || pathname.startsWith(routePrefix + "/"),
  );
}
