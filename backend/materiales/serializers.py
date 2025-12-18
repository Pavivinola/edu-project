from rest_framework import serializers
from .models import Material
from usuarios.serializers import UserListSerializer
from cursos.serializers import CourseListSerializer

class MaterialSerializer(serializers.ModelSerializer):
    uploaded_by_detail = UserListSerializer(source='uploaded_by', read_only=True)
    course_detail = CourseListSerializer(source='course', read_only=True)
    file_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Material
        fields = ['id', 'course', 'course_detail', 'title', 'description',
                  'material_type', 'file', 'file_url', 'url', 'uploaded_by',
                  'uploaded_by_detail', 'uploaded_at']
        read_only_fields = ['uploaded_by', 'uploaded_at']
    
    def get_file_url(self, obj):
        if obj.file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.file.url)
        return None