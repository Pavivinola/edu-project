from rest_framework import viewsets, filters
from .models import Announcement
from .serializers import AnnouncementSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content']
    ordering_fields = ['created_at', 'is_pinned']
    ordering = ['-is_pinned', '-created_at']
    
    def get_queryset(self):
        queryset = Announcement.objects.all()
        course_id = self.request.query_params.get('course')
        if course_id:
            queryset = queryset.filter(course_id=course_id)
        return queryset
    
    def perform_create(self, serializer):
        # Si no hay usuario autenticado, usar el primer admin
        author = self.request.user if self.request.user.is_authenticated else User.objects.filter(is_superuser=True).first()
        serializer.save(author=author)