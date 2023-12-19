from django.urls import path, include
from .views import DocumentListCreate, index_view, chatgpt_api

urlpatterns = [
    path('documents/', DocumentListCreate.as_view(), name='document-list-create'),
    path('', index_view, name='index'),
    path('api/chatgpt/', chatgpt_api, name='chatgpt_api'),  # Corrected line
]

from django.conf import settings
from django.conf.urls.static import static

# ... your urlpatterns

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
