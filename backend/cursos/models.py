from django.db import models
from django.conf import settings

class Course(models.Model):
    name = models.CharField(max_length=200, verbose_name="Nombre del curso")
    code = models.CharField(max_length=20, unique=True, verbose_name="Código")
    description = models.TextField(verbose_name="Descripción")
    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='taught_courses',
        limit_choices_to={'role': 'teacher'},
        verbose_name="Profesor"
    )
    students = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='enrolled_courses',
        limit_choices_to={'role': 'student'},
        blank=True,
        verbose_name="Estudiantes"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    is_active = models.BooleanField(default=True, verbose_name="Activo")
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Curso"
        verbose_name_plural = "Cursos"
    
    def __str__(self):
        return f"{self.code} - {self.name}"