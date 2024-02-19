from django.db import models

class TrendingTopic(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()
    description = models.TextField(blank=True)
    fetched_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = 'wordchat_backend'

    def __str__(self):
        return self.title
