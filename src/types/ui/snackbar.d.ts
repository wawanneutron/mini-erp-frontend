export type SnackbarType = 'success' | 'error' | 'warning' | 'info'
export type SnackbarPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center'

export interface SnackbarOption {
  message: string
  type: SnackbarType
  position?: SnackbarPosition
  duration?: number
}
