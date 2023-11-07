// export interface User {
//   username: string;
//   id: string;
//   email: string;
//   roles: {
//     name: string;
//     role: string;
//     permissions: string[];
//   }[];
//
// }

// interface FormattedPermission {
//   permission: string;
// }

interface FormattedRole {
  app: string;
  role: string;
  permissions: string[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  isSuper: boolean;
  roles: FormattedRole[];
  iat?: number;
  exp?: number;
}
