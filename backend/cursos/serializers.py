from rest_framework import serializers
from .models import Course
from usuarios.serializers import UserListSerializer

class CourseSerializer(serializers.ModelSerializer):
    teacher_detail = UserListSerializer(source='teacher', read_only=True)
    students_detail = UserListSerializer(source='students', many=True, read_only=True)
    student_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = ['id', 'name', 'code', 'description', 'teacher', 'teacher_detail',
                  'students', 'students_detail', 'student_count', 'is_active', 'created_at']
    
    def get_student_count(self, obj):
        return obj.students.count()

class CourseListSerializer(serializers.ModelSerializer):
    """Serializer simplificado para listados"""
    teacher_name = serializers.CharField(source='teacher.get_full_name', read_only=True)
    student_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = ['id', 'code', 'name', 'teacher_name', 'student_count', 'is_active']
    
    def get_student_count(self, obj):
        return obj.students.count()