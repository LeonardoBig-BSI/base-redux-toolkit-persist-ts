import type { Address } from "./Address";

export interface User {
  name: string;
  email: string;
  address: Address | null;
}