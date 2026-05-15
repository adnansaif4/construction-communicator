self.addEventListener('push', (event) => {
  const data = event.data?.json?.() ?? { title: 'NATIONAL ENGINEERS', body: 'New site update' };
  event.waitUntil(self.registration.showNotification(data.title, { body: data.body, icon: '/icons/icon-192.svg', badge: '/icons/icon-192.svg', tag: data.tag ?? 'site-update', renotify: data.priority === 'critical', requireInteraction: data.priority === 'critical', data }));
});
self.addEventListener('notificationclick', (event) => { event.notification.close(); event.waitUntil(clients.openWindow(event.notification.data?.url ?? '/')); });
