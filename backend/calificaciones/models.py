from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator

class Assignment(models.Model):
    """Tarea o evaluación"""
    course = models.ForeignKey(
        'cursos.Course', 
        on_delete=models.CASCADE, 
        related_name='assignments',
        verbose_name="Curso"
    )
    title = models.CharField(max_length=200, verbose_name="Título")
    description = models.TextField(verbose_name="Descripción")
    max_score = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        default=100,
        verbose_name="Puntaje máximo"
    )
    due_date = models.DateTimeField(verbose_name="Fecha de entrega")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    
    class Meta:
        ordering = ['-due_date']
        verbose_name = "Tarea"
        verbose_name_plural = "Tareas"
    
    def __str__(self):
        return f"{self.course.code} - {self.title}"

class Grade(models.Model):
    """Calificación de un estudiante en una tarea"""
    assignment = models.ForeignKey(
        Assignment, 
        on_delete=models.CASCADE, 
        related_name='grades',
        verbose_name="Tarea"
    )
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='grades',
        limit_choices_to={'role': 'student'},
        verbose_name="Estudiante"
    )
    score = models.DecimalField(
        max_digits=5, 
        decimal_places=2,
        validators=[MinValueValidator(0)],
        verbose_name="Calificación"
    )
    feedback = models.TextField(blank=True, verbose_name="Retroalimentación")
    graded_at = models.DateTimeField(auto_now=True, verbose_name="Fecha de calificación")
    
    class Meta:
        unique_together = ['assignment', 'student']
        verbose_name = "Calificación"
        verbose_name_plural = "Calificaciones"
    
    def __str__(self):
        return f"{self.student.username} - {self.assignment.title}: {self.score}"