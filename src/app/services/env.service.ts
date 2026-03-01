export class EnvService {
  constructor() { }
  apiUrl = 'admin-portal-backend-production-a812.up.railway.app/';
  maxFileSize = 5 * 1024 * 1024; // (mb -> kb -> b);
  acceptibleExts = ['jpg', 'png', 'jpeg'];

}

export const EnvServiceFactory = () => {

  let env: any = new EnvService();

  const browserWindow: any = window || {};
  const browserWindowEnv: any = browserWindow['__env'] || {};

  env = Object.assign(env, browserWindowEnv);

  return env;
};

export const EnvServiceProvider = {
  provide: EnvService,
  useFactory: EnvServiceFactory,
  deps: [],
};
