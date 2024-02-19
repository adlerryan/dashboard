from celery import shared_task
from .models import TrendingTopic
# Assuming you have a function to fetch trending topics
from .utils import fetch_trending_topics

@shared_task
def fetch_and_store_trending_topics():
    topics = fetch_trending_topics()
    for topic in topics:
        TrendingTopic.objects.create(**topic)
