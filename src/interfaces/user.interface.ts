interface User {
  id: string;
  username: string;
  email: string;
  roles: UserRole[];
}

interface UserRole {
  name: string;
  role: string;
  permissions: string[];
}
