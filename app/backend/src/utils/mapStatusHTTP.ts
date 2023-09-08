export default function mapStatusHTTP(statusHttp: string) {
    const statusHTTPMap: Record<string, number> = {
      NOTFOUND: 404,
      UNAUTHORIZED: 401,
      SUCCESSFUL: 200,
      CREATED: 201,
    };
    return statusHTTPMap[statusHttp] ?? 500;
  }