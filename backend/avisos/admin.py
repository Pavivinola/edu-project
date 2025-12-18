from django.contrib import admin
from .models import Announcement

@admin.register(Announcement) #Esto sirve para registrar el modelo en el admin
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ['title', 'course', 'author', 'is_pinned', 'created_at']
    list_filter = ['is_pinned', 'course', 'created_at']
    search_fields = ['title', 'content', 'course__code']