from rest_framework import viewsets, filters
from .models import Material
from .serializers import MaterialSerializer

class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['uploaded_at', 'title']
    ordering = ['-uploaded_at']
    
    def get_queryset(self):
        queryset = Material.objects.all()
        course_id = self.request.query_params.get('course')
        material_type = self.request.query_params.get('type')
        
        if course_id:
            queryset = queryset.filter(course_id=course_id)
        if material_type:
            queryset = queryset.filter(material_type=material_type)
        
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)