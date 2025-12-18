from rest_framework import serializers
from .models import Announcement
from usuarios.serializers import UserListSerializer
from cursos.serializers import CourseListSerializer

class AnnouncementSerializer(serializers.ModelSerializer):
    author_detail = UserListSerializer(source='author', read_only=True)
    course_detail = CourseListSerializer(source='course', read_only=True)
    
    class Meta:
        model = Announcement
        fields = ['id', 'course', 'course_detail', 'author', 'author_detail',
                  'title', 'content', 'is_pinned', 'created_at', 'updated_at']
        read_only_fields = ['author', 'created_at', 'updated_at']