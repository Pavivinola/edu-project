from rest_framework import serializers
from .models import Assignment, Grade
from usuarios.serializers import UserListSerializer
from cursos.serializers import CourseListSerializer

class AssignmentSerializer(serializers.ModelSerializer):
    course_detail = CourseListSerializer(source='course', read_only=True)
    grades_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Assignment
        fields = ['id', 'course', 'course_detail', 'title', 'description', 
                  'max_score', 'due_date', 'created_at', 'grades_count']
    
    def get_grades_count(self, obj):
        return obj.grades.count()

class GradeSerializer(serializers.ModelSerializer):
    student_detail = UserListSerializer(source='student', read_only=True)
    assignment_detail = serializers.StringRelatedField(source='assignment', read_only=True)
    percentage = serializers.SerializerMethodField()
    
    class Meta:
        model = Grade
        fields = ['id', 'assignment', 'assignment_detail', 'student', 'student_detail',
                  'score', 'percentage', 'feedback', 'graded_at']
    
    def get_percentage(self, obj):
        if obj.assignment.max_score > 0:
            return round((obj.score / obj.assignment.max_score) * 100, 2)
        return 0

class GradeCreateSerializer(serializers.ModelSerializer):
    """Serializer simplificado para crear calificaciones"""
    class Meta:
        model = Grade
        fields = ['assignment', 'student', 'score', 'feedback']