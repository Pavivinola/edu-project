from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Course
from .serializers import CourseSerializer, CourseListSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'code', 'description']
    ordering_fields = ['code', 'name', 'created_at']
    ordering = ['code']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return CourseListSerializer
        return CourseSerializer
    
    @action(detail=True, methods=['post'])
    def enroll_student(self, request, pk=None):
        """Inscribir un estudiante en el curso"""
        course = self.get_object()
        student_id = request.data.get('student_id')
        
        try:
            from usuarios.models import User
            student = User.objects.get(id=student_id, role='student')
            course.students.add(student)
            return Response({'status': 'Estudiante inscrito exitosamente'})
        except User.DoesNotExist:
            return Response({'error': 'Estudiante no encontrado'}, status=404)
    
    @action(detail=True, methods=['post'])
    def remove_student(self, request, pk=None):
        """Remover un estudiante del curso"""
        course = self.get_object()
        student_id = request.data.get('student_id')
        
        try:
            from usuarios.models import User
            student = User.objects.get(id=student_id)
            course.students.remove(student)
            return Response({'status': 'Estudiante removido exitosamente'})
        except User.DoesNotExist:
            return Response({'error': 'Estudiante no encontrado'}, status=404)