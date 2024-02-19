from django.contrib import admin
from .models import TrendingTopic

@admin.register(TrendingTopic)
class TrendingTopicAdmin(admin.ModelAdmin):
    list_display = ('title', 'url', 'fetched_at')
    list_filter = ('fetched_at',)
    search_fields = ('title',)
