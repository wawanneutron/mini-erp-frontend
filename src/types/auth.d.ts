export interface Role {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface Tenant {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface User {
  id: number
  tenant_id: number
  role_id: number
  name: string
  email: string
  email_verified_at: boolean
  created_at: string
  updated_at: string
  role: Role
  tenant: Tenant
}

export interface AuthLogin extends User {
  token: string
}
