from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from usuarios.views import UserViewSet
from cursos.views import CourseViewSet
from calificaciones.views import AssignmentViewSet, GradeViewSet
from avisos.views import AnnouncementViewSet
from materiales.views import MaterialViewSet

# Router de DRF
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'assignments', AssignmentViewSet)
router.register(r'grades', GradeViewSet)
router.register(r'announcements', AnnouncementViewSet)
router.register(r'materials', MaterialViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
]

# Servir archivos media en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)