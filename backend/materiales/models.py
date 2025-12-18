from django.db import models
from django.conf import settings

def material_upload_path(instance, filename):
    """Generar ruta de subida para materiales"""
    return f'materials/{instance.course.code}/{filename}'

class Material(models.Model):
    """Materiales del curso (PDFs, videos, enlaces, etc.)"""
    MATERIAL_TYPE_CHOICES = [
        ('pdf', 'PDF'),
        ('video', 'Video'),
        ('link', 'Enlace'),
        ('document', 'Documento'),
        ('presentation', 'Presentación'),
        ('other', 'Otro'),
    ]
    
    course = models.ForeignKey(
        'cursos.Course', 
        on_delete=models.CASCADE, 
        related_name='materials',
        verbose_name="Curso"
    )
    title = models.CharField(max_length=200, verbose_name="Título")
    description = models.TextField(blank=True, verbose_name="Descripción")
    material_type = models.CharField(
        max_length=20, 
        choices=MATERIAL_TYPE_CHOICES,
        verbose_name="Tipo de material"
    )
    file = models.FileField(
        upload_to=material_upload_path, 
        blank=True, 
        null=True,
        verbose_name="Archivo"
    )
    url = models.URLField(blank=True, null=True, verbose_name="URL")
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        verbose_name="Subido por"
    )
    uploaded_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de subida")
    
    class Meta:
        ordering = ['-uploaded_at']
        verbose_name = "Material"
        verbose_name_plural = "Materiales"
    
    def __str__(self):
        return f"{self.course.code} - {self.title}"
