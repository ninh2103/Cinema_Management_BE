// export const TokenType = {
//   ForgotPasswordToken: 'ForgotPasswordToken',
//   AccessToken: 'AccessToken',
//   RefreshToken: 'RefreshToken',
//   TableToken: 'TableToken',
// } as const;

import { z } from 'zod';

export const UserStatus = {
  ACTIVE: 'ACTIVE',
  UNACTIVE: 'UNACTIVE',
};

export const Role = {
  Owner: 'Owner',
  Employee: 'Employee',
  Customer: 'Customer',
} as const;

export const RoleValues = [Role.Owner, Role.Employee, Role.Customer] as const;

export const BlockCinemaRoom = {
  Inactive: 0, // Không hoạt động
  Active: 1, // Đang hoạt động
  Hidden: 2, // Ẩn
} as const;

export const CinemaBlockRoomValue = [
  BlockCinemaRoom.Inactive,
  BlockCinemaRoom.Active,
  BlockCinemaRoom.Hidden,
] as const;

export const TypeCinemaRoom = {
  Standard: 0, // Không hoạt động
  VIP: 1, // Đang hoạt động
  IMAX: 2, // Ẩn
} as const;

export const CinemaTypeRoomValue = [
  TypeCinemaRoom.Standard,
  TypeCinemaRoom.VIP,
  TypeCinemaRoom.IMAX,
] as const;

export const TypeClosedRoom = {
  Open: 0, // Không hoạt động
  Closed: 1, // Đang hoạt động
} as const;

export const ClosedTypeRoomValue = [
  TypeClosedRoom.Open,
  TypeClosedRoom.Closed,
] as const;

export const TypeSnack = {
  Open: 0, // Không hoạt động
  Closed: 1, // Đang hoạt động
} as const;

export const TypeSnackValue = [
  TypeClosedRoom.Open,
  TypeClosedRoom.Closed,
] as const;

export const Payment = {
  Paid: 0,
  Unpaid: 1,
} as const;

export const PaymentValue = [Payment.Paid, Payment.Unpaid] as const;

export const TypeAvailable = {
  even: 0,
  Sold_Out: 1,
  Sold: 2,
} as const;

export const AvailableValue = [
  TypeAvailable.even,
  TypeAvailable.Sold_Out,
  TypeAvailable.Sold,
] as const;

export interface FilterType {
  items_per_page?: number;
  page?: number;
  search?: string;
}
export const TypeChecking = {
  Cheked: 0, // Đã kiểm tra
  Unchecked: 1, // Chưa kiểm tra
} as const;

export const TypeCheckingValue = [
  TypeChecking.Cheked,
  TypeChecking.Unchecked,
] as const;

export type RoleType = (typeof Role)[keyof typeof Role];

export interface TokenPayload {
  userId: string;
  role: RoleType;
  exp: number;
  iat: number;
}

export const ChangePasswordBody = z
  .object({
    oldPassword: z.string().min(6).max(100),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu mới không khớp',
        path: ['confirmPassword'],
      });
    }
  });

export type ChangePasswordBodyType = z.TypeOf<typeof ChangePasswordBody>;
