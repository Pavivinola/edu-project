from django.db import models
from django.conf import settings

class Announcement(models.Model):
    """Avisos o anuncios del curso"""
    course = models.ForeignKey(
        'cursos.Course', 
        on_delete=models.CASCADE, 
        related_name='announcements',
        verbose_name="Curso"
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        verbose_name="Autor"
    )
    title = models.CharField(max_length=200, verbose_name="Título")
    content = models.TextField(verbose_name="Contenido")
    is_pinned = models.BooleanField(default=False, verbose_name="Fijado")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última actualización")
    
    class Meta:
        ordering = ['-is_pinned', '-created_at']
        verbose_name = "Aviso"
        verbose_name_plural = "Avisos"
    
    def __str__(self):
        return f"{self.course.code} - {self.title}"
