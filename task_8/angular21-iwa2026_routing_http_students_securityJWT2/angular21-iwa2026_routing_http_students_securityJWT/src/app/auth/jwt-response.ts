export class JwtResponse {
  accessToken?: string;
  tokenType?: string;
  username?: string;
  authorities?: Array<{ authority: string }>;
}
