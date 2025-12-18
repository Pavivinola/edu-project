from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Assignment, Grade
from .serializers import AssignmentSerializer, GradeSerializer, GradeCreateSerializer

class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['due_date', 'created_at', 'title']
    ordering = ['-due_date']
    
    def get_queryset(self):
        queryset = Assignment.objects.all()
        course_id = self.request.query_params.get('course')
        if course_id:
            queryset = queryset.filter(course_id=course_id)
        return queryset

class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['graded_at', 'score']
    ordering = ['-graded_at']
    
    def get_serializer_class(self):
        if self.action == 'create':
            return GradeCreateSerializer
        return GradeSerializer
    
    def get_queryset(self):
        queryset = Grade.objects.all()
        student_id = self.request.query_params.get('student')
        assignment_id = self.request.query_params.get('assignment')
        
        if student_id:
            queryset = queryset.filter(student_id=student_id)
        if assignment_id:
            queryset = queryset.filter(assignment_id=assignment_id)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def my_grades(self, request):
        """Obtener calificaciones del usuario autenticado"""
        grades = Grade.objects.filter(student=request.user)
        serializer = self.get_serializer(grades, many=True)
        return Response(serializer.data)