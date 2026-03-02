
export const config: any = Object.freeze({
    apiEndpoint: (window._env && window._env.apiEndpoint) || "https://admin-portal-backend-production-a812.up.railway.app/api/",
    sessionIdletime: (window._env && window._env.sessionIdletime) || 300, // modal show time if user don't interact with application (600 seconds)
    sessionTimeout: (window._env && window._env.sessionTimeout) || 100, //for progress bar or waiting time of idle before session out(100 seconds)
    MAX_SIZE: (window._env && window._env.MAX_SIZE) || 10 * 1024 * 1024, // 10MB
    allowedFileTypes: (window._env && window._env.ALLOWED_TYPES) || ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'],
})

