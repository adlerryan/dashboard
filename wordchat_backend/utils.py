# wordchat_backend/utils.py

import requests
from bs4 import BeautifulSoup

def fetch_trending_topics_from_yahoo():
    # Example URL - replace with the actual URL for trending topics on Yahoo
    url = 'https://yahoo.com/trending'
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Placeholder for the actual logic to parse the trending topics
    # This will depend on the structure of the Yahoo page
    topics = []
    for item in soup.find_all('div', class_='trending-topic-class'):  # Adjust this selector
        topics.append({
            'title': item.find('h2').text,  # Adjust these selectors based on actual structure
            'url': item.find('a')['href'],
            'description': item.find('p').text  # This is optional, depending on what data you want
        })
    return topics
