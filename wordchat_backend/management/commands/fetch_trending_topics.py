# In wordchat_backend/management/commands/fetch_trending_topics.py

from django.core.management.base import BaseCommand
from ...models import TrendingTopic
import requests
from bs4 import BeautifulSoup

class Command(BaseCommand):
    help = 'Fetches trending topics from Yahoo.com'

    def handle(self, *args, **kwargs):
        # Example fetching logic (adjust based on Yahoo's actual structure)
        response = requests.get('https://yahoo.com/trending')
        soup = BeautifulSoup(response.content, 'html.parser')

        topics = soup.find_all('div', class_='trending-topic-class')  # Placeholder
        for topic in topics:
            TrendingTopic.objects.create(
                title=topic.find('h2').text,
                url=topic.find('a')['href'],
                description=topic.find('p').text
            )
        self.stdout.write(self.style.SUCCESS('Successfully fetched trending topics'))
