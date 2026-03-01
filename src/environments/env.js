(function (window) {
  window.__env = {
    ...(window.__env || {}),
    apiUrl: 'admin-portal-backend-production-a812.up.railway.app/',
    maxFileSize: 5 * 1024 * 1024,// (mb -> kb -> b);
    acceptibleExts: ['jpg', 'png', 'jpeg'],
  }
}(this));