from django.contrib import admin
from .models import Assignment, Grade

@admin.register(Assignment) # Establece la configuración del administrador para el modelo Assignment
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ['title', 'course', 'max_score', 'due_date', 'created_at']
    list_filter = ['course', 'due_date']
    search_fields = ['title', 'course__code']

@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = ['student', 'assignment', 'score', 'graded_at']
    list_filter = ['assignment__course', 'graded_at']
    search_fields = ['student__username', 'assignment__title']
