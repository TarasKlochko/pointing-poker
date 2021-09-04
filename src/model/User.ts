import { MemberCardKind } from "./MemberCardKind";
import { UserRole } from "./UserRole";

export interface User {
  id: string
  image?: string
  name: string
  surname: string
  role: string
  userPosition: string
}